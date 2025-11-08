import { FastifyPluginAsyncTypebox, Type } from "@fastify/type-provider-typebox";
import multipart, { MultipartFile } from "@fastify/multipart";
import { AppError } from "../features/errors";
import util from "node:util";
import { pipeline } from "node:stream";
import { getPictureName } from "../services/uploadService";
import { db } from "../db/db";
import { makeDebug } from "../features/debug";
import { authenticate } from "./authMiddleware";
import fs from "fs/promises";
import path from "node:path";
import { NoSuchKey } from "@aws-sdk/client-s3";

const debug = makeDebug("upload");
const pump = util.promisify(pipeline);

export const uploadPlugin: FastifyPluginAsyncTypebox = async (fastify, _) => {
  fastify.register(multipart, {
    limits: {
      fileSize: 15 * 1024 * 1024, // 15 mo,
    },
  });
  fastify.addHook("preHandler", authenticate);

  fastify.post("/attachment", async (request, reply) => {
    const file = await request.file();
    if (!file) throw new AppError(400, "No file provided");

    request.services.upload.uploadAttachment({
      filePath: file.filename,
      buffer: await file.toBuffer(),
    });

    debug(`File ${file} saved to attachments folder`);
    reply.send({ message: "File uploaded successfully" });
  });

  fastify.get("/attachment", async (request, reply) => {
    const { filename } = request.query as any;
    if (!filename) throw new AppError(400, "No filename provided");
    try {
      const fileBuffer = await request.services.upload.getAttachment({ filePath: filename });

      reply.send(fileBuffer);
    } catch (error) {
      if (error instanceof NoSuchKey) {
        throw new AppError(404, "Attachment not found");
      }
    }
  });

  fastify.post("/image", async (request, reply) => {
    const file = await request.file();
    const { reportId, id } = request.query || ({} as any);

    if (!file) throw new AppError(400, "No file provided");
    if (!reportId || !id) throw new AppError(400, "No reportId or id provided");

    const url = await request.services.upload.addPictureToReport({
      reportId: (request.query as any).reportId as string,
      buffer: await file.toBuffer(),
      name: getPictureName(reportId, id),
    });

    await db
      .insertInto("pictures")
      .values({
        id,
        url,
        reportId,
        createdAt: new Date().toISOString(),
        finalUrl: url,
      })
      .execute();

    debug("adding url to pic", id, "for report", reportId);

    reply.send(url);

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

  fastify.post(
    "/picture/:pictureId/lines",
    {
      schema: {
        params: Type.Object({ pictureId: Type.String() }),
        body: Type.Object({
          lines: Type.Array(
            Type.Object({
              points: Type.Array(Type.Object({ x: Type.Number(), y: Type.Number() })),
              color: Type.String(),
            }),
          ),
        }),
        response: { 200: Type.String() },
      },
    },
    async (request) => {
      const { pictureId } = request.params;

      return request.services.upload.handleNotifyPictureLines({ pictureId });
    },
  );
};

const getFileName = (file: MultipartFile) => {
  const ext = file.mimetype.split("/")[1];
  const name = `report-${Date.now()}`;

  return `${name}.${ext}`;
};
