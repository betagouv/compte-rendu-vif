import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { ENV } from "../envVars";
import { makeDebug } from "../features/debug";
import { AppError } from "../features/errors";
import { S3 } from "@aws-sdk/client-s3";
import { applyLinesToPicture } from "../features/image";
import { db } from "../db/db";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import path from "path";

const debug = makeDebug("upload");

const attachmentClient = new S3({
  credentials: {
    accessKeyId: ENV.MINIO_ACCESS_KEY_ID,
    secretAccessKey: ENV.MINIO_SECRET_KEY,
  },
  endpoint: ENV.MINIO_URL,
  bucketEndpoint: true,
});
const client = new S3Client({
  endpoint: ENV.MINIO_URL,
  credentials: { accessKeyId: ENV.MINIO_ACCESS_KEY_ID, secretAccessKey: ENV.MINIO_SECRET_KEY },
  bucketEndpoint: true,
  forcePathStyle: true,
});

export const upload = async () => {};
const bucketUrl = `${ENV.MINIO_URL}/${ENV.MINIO_BUCKET}`;

const addAttachmentPrefix = (filePath: string) => "attachment/" + filePath;

export class UploadService {
  async uploadAttachment({ buffer, filePath }: { buffer: Buffer; filePath: string }) {
    debug("Uploading attachment to S3", filePath);
    const command = new PutObjectCommand({
      Bucket: bucketUrl,
      Body: buffer,
      Key: addAttachmentPrefix(filePath),
    });
    await client.send(command);
  }

  async getAttachment({ filePath }: { filePath: string }) {
    const name = addAttachmentPrefix(filePath);
    const command = new GetObjectCommand({ Bucket: bucketUrl, Key: name });
    const response = await client.send(command);

    const buffer = await response.Body?.transformToByteArray();
    if (!buffer) throw new AppError(404, "Attachment not found");
    return Buffer.from(buffer);
  }

  async addPDFToReport({ reportId, buffer, name }: { reportId: string; buffer: Buffer; name: string }) {
    debug("Uploading PDF to S3", name);
    const command = new PutObjectCommand({
      Bucket: bucketUrl,
      Body: buffer,
      Key: name,
    });
    await client.send(command);

    const url = `https://${bucketUrl}/${name}`;
    debug(url);
    return url;
  }

  async getReportPDF({ reportId }: { reportId: string }) {
    const name = getPDFName(reportId);

    const command = new GetObjectCommand({ Bucket: bucketUrl, Key: name });
    const response = await client.send(command);

    const buffer = await response.Body?.transformToByteArray();
    if (!buffer) throw new AppError(404, "PDF not found");

    return Buffer.from(buffer);
  }

  async handleNotifyPictureLines({
    pictureId,
    // lines,
  }: {
    pictureId: string;
    // lines: Array<{ points: { x: number; y: number }[]; color: string }>;
  }) {
    debug("Handling picture lines", pictureId);
    const pictureQuery = await db.selectFrom("report_attachment").where("id", "=", pictureId).selectAll().execute();
    const picture = pictureQuery?.[0];

    const linesQuery = await db.selectFrom("picture_lines").where("pictureId", "=", pictureId).selectAll().execute();
    const lines = JSON.parse(linesQuery?.[0]?.lines || "[]");

    if (!picture) throw new AppError(404, "Picture not found");
    const pictureUrl = await generatePresignedUrl(bucketUrl, addAttachmentPrefix(pictureId));

    const buffer = await applyLinesToPicture({ pictureUrl: pictureUrl, lines });

    const name = getPictureName(pictureId, Math.round(Date.now() / 1000));

    debug("Uploading picture to S3", pictureId);
    await this.uploadAttachment({ buffer, filePath: name });
    debug("Picture uploaded", pictureId);

    const url = path.join(`https://${bucketUrl}`, name);

    await db.transaction().execute(async (tx) => {
      await tx.updateTable("report_attachment").set({ is_deprecated: true }).where("id", "=", pictureId).execute();
      await tx
        .insertInto("report_attachment")
        .values({
          id: name,
          attachment_id: name,
          is_deprecated: false,
          report_id: picture.report_id,
          created_at: new Date().toISOString(),
          service_id: picture.service_id,
        })
        .execute();
      await tx
        .deleteFrom("picture_lines")
        .where(
          "id",
          "in",
          linesQuery.map((line) => line.id),
        )
        .execute();
    });

    debug(url);
    return url;
  }
}
async function generatePresignedUrl(bucket: string, key: string) {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  const presignedUrl = await getSignedUrl(client, command, {
    expiresIn: 3600,
  });

  const url = new URL(presignedUrl);
  const pathParts = url.pathname.split("/");

  // Encode each part except the bucket name (first part after /)
  const encodedPath = pathParts
    .map((part, index) => {
      if (index === 0 || index === 1) return part; // Keep empty string and bucket name
      return encodeURIComponent(part);
    })
    .join("/");

  url.pathname = encodedPath;

  return url.toString();
}

export const getPDFName = (reportId: string) => `${reportId}/compte_rendu.pdf`;
export const getPictureName = (pictureId: string, snapshot?: number) =>
  `${pictureId.split(".").slice(0, -1).join(".")}${snapshot ? `_${snapshot}` : ""}.jpg`;
