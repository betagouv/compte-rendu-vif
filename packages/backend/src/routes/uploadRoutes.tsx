import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import multipart, { MultipartFile } from "@fastify/multipart";
import { AppError } from "../features/errors";

export const uploadPlugin: FastifyPluginAsyncTypebox = async (fastify, _) => {
  fastify.register(multipart, {
    limits: {
      fileSize: 15 * 1024 * 1024, // 15 mo,
    },
  });

  fastify.post("/upload-image", async (request) => {
    const files = request.files();

    for await (const file of files) {
      const isImage = ["image/png", "image/jpeg", "image/jpg"].includes(file.mimetype);

      if (!isImage) {
        throw new AppError(400, "File is not an image");
      }

      await request.services.upload.addImageToReport({
        reportId: "",
        buffer: await file.toBuffer(),
        name: getFileName(file),
      });
    }

    return "ok";
  });
};

const getFileName = (file: MultipartFile) => {
  const ext = file.mimetype.split("/")[1];
  const name = `report-${Date.now()}`;

  return `${name}.${ext}`;
};
