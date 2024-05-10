import { Type, type FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { AppError } from "../features/errors";
import { FastifyRequest } from "fastify";
import { SerializedUser } from "../services/userService";
import { renderToBuffer } from "@react-pdf/renderer";
import { ReportPDFDocument } from "@cr-vif/pdf";
import { Udap } from "@cr-vif/electric-client/frontend";
import { db } from "../db/db";

export const pdfPlugin: FastifyPluginAsyncTypebox = async (fastify, _) => {
  fastify.addHook("preHandler", async (request: FastifyRequest) => {
    const auth = request.headers.authorization;
    if (!auth) throw new AppError(403, "Unauthorized");

    const [_, token] = auth.split(" ");
    const user = await request.services.user.verifyJWT(token ?? "");

    if (!user) throw new AppError(403, "Unauthorized");
    request.user = user;
  });

  fastify.post("/report", { schema: createUserTSchema }, async (request) => {
    const { reportId, htmlString } = request.body;
    const { udap } = request.user;

    const pdf = await generatePdf({ htmlString, udap });

    const name = `${reportId}/compte_rendu.pdf`;

    const url = await request.services.upload.addPDFToReport({
      reportId,
      buffer: pdf,
      name,
    });

    return url;
  });
};

const generatePdf = async ({ htmlString, udap }: { htmlString: string; udap: SerializedUser["udap"] }) => {
  return renderToBuffer(
    <ReportPDFDocument udap={udap as Udap} htmlString={htmlString} images={{ header: "./public/pdf_header.png" }} />,
  );
};

export const createUserTSchema = {
  body: Type.Object({
    htmlString: Type.String(),
    reportId: Type.String(),
  }),
  response: { 200: Type.Any() },
};
