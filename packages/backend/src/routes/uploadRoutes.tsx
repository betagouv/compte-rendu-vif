import { FastifyPluginAsyncTypebox, Type } from "@fastify/type-provider-typebox";
import multipart, { MultipartFile } from "@fastify/multipart";
import { AppError } from "../features/errors";
import util from "node:util";
import { pipeline } from "node:stream";
import { getPictureName } from "../services/uploadService";
import { db } from "../db/db";

const pump = util.promisify(pipeline);

export const uploadPlugin: FastifyPluginAsyncTypebox = async (fastify, _) => {
  fastify.register(multipart, {
    limits: {
      fileSize: 15 * 1024 * 1024, // 15 mo,
    },
  });

  fastify.post("/image", async (request, reply) => {
    const file = await request.file();
    const { reportId, id } = request.query || ({} as any);

    if (!file) throw new AppError(400, "No file provided");
    if (!reportId || !id) throw new AppError(400, "No reportId or id provided");

    const url = await request.services.upload.addPDFToReport({
      reportId: (request.query as any).reportId as string,
      buffer: await file.toBuffer(),
      name: getPictureName(reportId, id),
      publicRead: true,
    });

    // await db.pictures.create({ data: { id, url, reportId, createdAt: new Date() } });
    await db.pictures.update({ where: { id }, data: { url } });

    reply.send();

    // for await (const file of files) {
    //   const isImage = ["image/png", "image/jpeg", "image/jpg"].includes(file.mimetype);

    //   if (!isImage) {
    //     throw new AppError(400, "File is not an image");
    //   }

    //   //   await request.services.upload.addImageToReport({
    //   //     reportId: "",
    //   //     buffer: await file.toBuffer(),
    //   //     name: getFileName(file),
    //   //   });
    // }

    console.log("done");

    return "ok";
  });

  fastify.get(
    "/picture",
    {
      schema: {
        querystring: Type.Object({ reportId: Type.String(), pictureId: Type.String() }),
        response: { 200: Type.Any() },
      },
    },
    async (request) => {
      const { reportId, pictureId } = request.query;
      const buffer = await request.services.upload.getReportPicture({ reportId, pictureId });

      return buffer.toString("base64");
    },
  );
};

const getFileName = (file: MultipartFile) => {
  const ext = file.mimetype.split("/")[1];
  const name = `report-${Date.now()}`;

  return `${name}.${ext}`;
};
