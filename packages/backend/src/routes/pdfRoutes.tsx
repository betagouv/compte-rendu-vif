import { Type, type FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { renderToBuffer } from "@react-pdf/renderer";
import { ReportPDFDocument } from "@cr-vif/pdf";
import { Udap } from "@cr-vif/electric-client/frontend";
import { authenticate } from "./authMiddleware";
import { db } from "../db/db";
import { sendReportMail } from "../features/mail";
import { getPDFName } from "../services/uploadService";

export const pdfPlugin: FastifyPluginAsyncTypebox = async (fastify, _) => {
  fastify.addHook("preHandler", authenticate);

  fastify.post("/report", { schema: reportPdfTSchema }, async (request) => {
    const { reportId, htmlString } = request.body;
    const { udap } = request.user.user;

    const pdf = await generatePdf({ htmlString, udap });

    const name = getPDFName(reportId);

    const url = await request.services.upload.addPDFToReport({
      reportId,
      buffer: pdf,
      name,
    });

    await db.report.update({ where: { id: reportId }, data: { pdf: url } });

    const userMail = request.user.email;
    const recipients = request.body.recipients.split(",").map((r) => r.trim());
    if (!recipients.includes(userMail)) recipients.push(userMail);

    const report = await db.report.findUnique({ where: { id: reportId } });

    await sendReportMail({ recipients: recipients.join(","), pdfBuffer: pdf, reportTitle: report?.title ?? undefined });

    return url;
  });

  fastify.get(
    "/report",
    {
      schema: {
        querystring: Type.Object({ reportId: Type.String() }),
        response: { 200: Type.Any() },
      },
    },
    async (request) => {
      const { reportId } = request.query;
      const buffer = await request.services.upload.getReportPDF({ reportId });

      return buffer.toString("base64");
    },
  );
};

const generatePdf = async ({ htmlString, udap }: { htmlString: string; udap: Udap }) => {
  return renderToBuffer(
    <ReportPDFDocument
      udap={udap as Udap}
      htmlString={htmlString}
      images={{ marianne: "./public/marianne.png", marianneFooter: "./public/marianne_footer.png" }}
    />,
  );
};

export const reportPdfTSchema = {
  body: Type.Object({
    htmlString: Type.String(),
    reportId: Type.String(),
    recipients: Type.String(),
  }),
  response: { 200: Type.String() },
};
