import { Type, type FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Font, renderToBuffer } from "@react-pdf/renderer";
import { initFonts, ReportPDFDocument } from "@cr-vif/pdf";
import { authenticate } from "./authMiddleware";
import { db } from "../db/db";
import { sendReportMail } from "../features/mail";
import { getPDFName } from "../services/uploadService";
import { Udap } from "../../../frontend/src/db/AppSchema";
import { Pictures, Report } from "../db-types";
import path from "path";
import { makeDebug } from "../features/debug";
import { v4 } from "uuid";
import React from "react";

const debug = makeDebug("pdf-plugin");

// prevent the auto organize imports from removing React import
React;

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
    const udap = udapsQuery[0]! as Udap;

    const pdf = await generatePdf({ htmlString, udap, pictures: pictures as Pictures[] });

    const name = getPDFName(reportId);

    const url = await request.services.upload.addPDFToReport({
      reportId,
      buffer: pdf,
      name,
    });

    await db.updateTable("report").set({ pdf: url }).where("id", "=", reportId).execute();

    const userMail = request.user.email;
    const recipients = request.body.recipients
      .replaceAll(";", ",")
      .split(",")
      .map((r) => r.trim());
    if (!recipients.includes(userMail)) recipients.push(userMail);

    const reportsQuery = await db.selectFrom("report").where("id", "=", reportId).selectAll().execute();
    const report = reportsQuery[0] as Omit<Report, "createdAt" | "meetDate"> & { createdAt: any; meetDate: any };

    await sendReportMail({ recipients: recipients.join(","), pdfBuffer: pdf, report: report! });

    for (const recipient of recipients) {
      const id = v4();

      await db
        .insertInto("sent_email")
        .values({ id, report_id: reportId, sent_to: recipient, sent_at: new Date(), udap_id })
        .execute();

      await db
        .insertInto("suggested_email")
        .values({ id, email: recipient, udap_id })
        .execute()
        .catch(() => {});
    }

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

  return renderToBuffer(
    <ReportPDFDocument
      udap={udap as Udap}
      htmlString={htmlString}
      images={{ marianne: "./public/marianne.png", marianneFooter: "./public/marianne_footer.png" }}
      pictures={pictures as (Omit<Pictures, "createdAt"> & { createdAt: any })[]}
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
