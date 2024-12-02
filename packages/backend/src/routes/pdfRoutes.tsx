import { Type, type FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { renderToBuffer } from "@react-pdf/renderer";
import { ReportPDFDocument } from "@cr-vif/pdf";
import { authenticate } from "./authMiddleware";
import { db } from "../db/db";
import { sendReportMail } from "../features/mail";
import { getPDFName } from "../services/uploadService";
import React from "react";
import { Udap } from "../../../frontend/src/db/AppSchema";
import { Pictures } from "../db-types";

export const pdfPlugin: FastifyPluginAsyncTypebox = async (fastify, _) => {
  fastify.addHook("preHandler", authenticate);

  fastify.post("/report", { schema: reportPdfTSchema }, async (request) => {
    const { reportId, htmlString } = request.body;
    const { udap_id } = request.user.user!;

    const pictures = await db
      .selectFrom("pictures")
      .where("reportId", "=", reportId)
      .orderBy("createdAt asc")
      .selectAll()
      .execute();

    const udapsQuery = await db.selectFrom("udap").where("id", "=", udap_id).selectAll().execute();
    const udap = udapsQuery[0]!;

    const pdf = await generatePdf({ htmlString, udap, pictures });

    const name = getPDFName(reportId);

    const url = await request.services.upload.addPDFToReport({
      reportId,
      buffer: pdf,
      name,
    });

    await db.updateTable("report").set({ pdf: url }).where("id", "=", reportId).execute();

    const userMail = request.user.email;
    const recipients = request.body.recipients.split(",").map((r) => r.trim());
    if (!recipients.includes(userMail)) recipients.push(userMail);

    const reportsQuery = await db.selectFrom("report").where("id", "=", reportId).selectAll().execute();
    const report = reportsQuery[0];

    await sendReportMail({ recipients: recipients.join(","), pdfBuffer: pdf, report: report! });

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

const generatePdf = async ({
  htmlString,
  udap,
  pictures,
}: {
  htmlString: string;
  udap: Udap;
  pictures: Pictures[];
}) => {
  return renderToBuffer(
    <ReportPDFDocument
      udap={udap as Udap}
      htmlString={htmlString}
      images={{ marianne: "./public/marianne.png", marianneFooter: "./public/marianne_footer.png" }}
      pictures={pictures}
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
