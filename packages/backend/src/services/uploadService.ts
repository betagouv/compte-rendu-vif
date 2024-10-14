import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { ENV } from "../envVars";
import { makeDebug } from "../features/debug";
import { AppError } from "../features/errors";
import { S3 } from "@aws-sdk/client-s3";

const client = new S3Client({ endpoint: ENV.AWS_ENDPOINT, region: ENV.AWS_REGION });
const debug = makeDebug("upload");

const imageClient = new S3({
  credentials: {
    accessKeyId: ENV.MINIO_ACCESS_KEY_ID,
    secretAccessKey: ENV.MINIO_SECRET_KEY,
  },
  endpoint: ENV.MINIO_URL,
  bucketEndpoint: true,
});

export const upload = async () => {};

export class UploadService {
  async addPDFToReport({
    reportId,
    buffer,
    name,
    publicRead,
  }: {
    reportId: string;
    buffer: Buffer;
    name: string;
    publicRead?: boolean;
  }) {
    debug("Uploading PDF to S3", reportId);
    const command = new PutObjectCommand({
      Bucket: ENV.AWS_BUCKET_NAME,
      Body: buffer,
      Key: name,
      ACL: publicRead ? "public-read" : undefined,
    });
    await client.send(command);

    const url = `https://${ENV.AWS_BUCKET_NAME}.s3.${ENV.AWS_REGION}.scw.cloud/${name}`;

    debug(url);
    return url;
  }

  async addPictureToReport({ reportId, buffer, name }: { reportId: string; buffer: Buffer; name: string }) {
    debug("Uploading picture to S3", reportId);

    const bucketUrl = `${ENV.MINIO_URL}/${ENV.MINIO_BUCKET}`;

    await imageClient.putObject({
      Bucket: bucketUrl,
      Key: name,
      Body: buffer,
      ACL: "public-read",
      ContentType: "image/png",
    });

    const url = `${bucketUrl}/${name}`;

    debug(url);
    return url;
  }

  async getReportPDF({ reportId }: { reportId: string }) {
    const name = getPDFName(reportId);

    const command = new GetObjectCommand({ Bucket: ENV.AWS_BUCKET_NAME, Key: name });
    const response = await client.send(command);

    const buffer = await response.Body?.transformToByteArray();
    if (!buffer) throw new AppError(404, "PDF not found");

    return Buffer.from(buffer);
  }

  async getReportPicture({ reportId, pictureId }: { reportId: string; pictureId: string }) {
    const name = getPictureName(reportId, pictureId);

    const command = new GetObjectCommand({ Bucket: ENV.AWS_BUCKET_NAME, Key: name });
    const response = await client.send(command);

    const buffer = await response.Body?.transformToByteArray();
    if (!buffer) throw new AppError(404, "Picture not found");

    return Buffer.from(buffer);
  }
}

export const getPDFName = (reportId: string) => `${reportId}/compte_rendu.pdf`;
export const getPictureName = (reportId: string, pictureId: string) => `${reportId}/pictures/${pictureId}.png`;
