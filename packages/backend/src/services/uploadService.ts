import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { ENV } from "../envVars";
import { makeDebug } from "../features/debug";
import { AppError } from "../features/errors";

const client = new S3Client({ endpoint: ENV.AWS_ENDPOINT, region: ENV.AWS_REGION });
const debug = makeDebug("upload");
export const upload = async () => {};

export class UploadService {
  async addPDFToReport({ reportId, buffer, name }: { reportId: string; buffer: Buffer; name: string }) {
    debug("Uploading PDF to S3", reportId);
    const command = new PutObjectCommand({ Bucket: ENV.AWS_BUCKET_NAME, Body: buffer, Key: name });
    await client.send(command);

    const url = `https://${ENV.AWS_BUCKET_NAME}.s3.${ENV.AWS_REGION}.scw.cloud/${name}`;

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
}

export const getPDFName = (reportId: string) => `${reportId}/compte_rendu.pdf`;
