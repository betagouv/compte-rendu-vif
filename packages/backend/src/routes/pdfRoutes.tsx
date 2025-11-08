import { Type, type FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Font, renderToBuffer } from "@react-pdf/renderer";
import { initFonts, ReportPDFDocument } from "@cr-vif/pdf";
import { authenticate } from "./authMiddleware";
import { Database, db } from "../db/db";
import { sendReportMail } from "../features/mail";
import { generatePresignedUrl, getPDFName } from "../services/uploadService";
import { Service } from "../../../frontend/src/db/AppSchema";
import path from "path";
import { makeDebug } from "../features/debug";
import { v4 } from "uuid";
import React from "react";
import { Selectable } from "kysely";
import { getServices } from "../services/services";

const debug = makeDebug("pdf-plugin");

// prevent the auto organize imports from removing React import
const _noop = () => React;

export const pdfPlugin: FastifyPluginAsyncTypebox = async (fastify, _) => {
  fastify.addHook("preHandler", authenticate);

  fastify.post("/report", { schema: reportPdfTSchema }, async (request) => {
    const { reportId, htmlString } = request.body;
    const { service_id } = request.user!;

    const pictures = await db
      .selectFrom("report_attachment")
      .where("report_id", "=", reportId)
      .where("is_deprecated", "=", false)
      .orderBy("created_at", "asc")
      .selectAll()
      .execute();

    const servicesQuery = await db.selectFrom("service").where("id", "=", service_id).selectAll().execute();
    const service = servicesQuery[0]! as Service;

    const pdf = await generateReportPdf({ htmlString, service, pictures: pictures });

    const name = reportId + "/compte_rendu_" + Math.round(Date.now() / 1000) + ".pdf";

    await request.services.upload.uploadAttachment({ buffer: pdf, filePath: name });

    await db.transaction().execute(async (tx) => {
      await tx
        .insertInto("report_attachment")
        .values({
          id: name,
          attachment_id: name,
          is_deprecated: false,
          report_id: reportId,
          created_at: new Date().toISOString(),
          service_id,
        })
        .execute();
      await tx.updateTable("report").set({ attachment_id: name }).where("id", "=", reportId).execute();
    });

    const userMail = request.user!.email;
    const recipients = request.body.recipients
      .replaceAll(";", ",")
      .split(",")
      .map((r) => r.trim());
    if (!recipients.includes(userMail)) recipients.push(userMail);

    const reportsQuery = await db.selectFrom("report").where("id", "=", reportId).selectAll().execute();
    const report = reportsQuery[0] as Selectable<Database["report"]>;
    await sendReportMail({ recipients: recipients.join(","), pdfBuffer: pdf, report: report! });

    for (const recipient of recipients) {
      const id = v4();

      await db
        .insertInto("sent_email")
        .values({ id, report_id: reportId, sent_to: recipient, sent_at: new Date().toISOString(), service_id })
        .execute();

      await db
        .insertInto("suggested_email")
        .values({ id, email: recipient, service_id })
        .execute()
        .catch(() => {});
    }

    return await generatePresignedUrl(name);
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

const generateReportPdf = async ({
  htmlString,
  service,
  pictures,
}: {
  htmlString: string;
  service: Service;
  pictures: Selectable<Database["report_attachment"]>[];
}) => {
  const fontsPath = path.resolve(process.cwd(), "./public");

  Font.register({
    family: "Marianne",
    fonts: [
      {
        src: path.join(fontsPath, `fonts/Marianne-Regular.ttf`),
        fontStyle: "normal",
        fontWeight: "normal",
      },
      { src: path.join(fontsPath, `/fonts/Marianne-Bold.ttf`), fontStyle: "normal", fontWeight: "bold" },
      {
        src: path.join(fontsPath, `/fonts/Marianne-RegularItalic.ttf`),
        fontStyle: "italic",
        fontWeight: "normal",
      },
      {
        src: path.join(fontsPath, `/fonts/Marianne-BoldItalic.ttf`),
        fontStyle: "italic",
        fontWeight: "bold",
      },
    ],
  });

  const pdfImages = await Promise.all(
    pictures.map(async (p) => ({
      url: await generatePresignedUrl("attachment/" + p.attachment_id),
    })),
  );

  console.log(pdfImages);

  return renderToBuffer(
    <ReportPDFDocument
      service={service as Omit<Selectable<Database["service"]>, "visible"> & { visible: any }} // postgres boolean vs sqlite integer
      htmlString={htmlString}
      images={{ marianne: "./public/marianne.png", marianneFooter: "./public/marianne_footer.png" }}
      pictures={pdfImages}
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
