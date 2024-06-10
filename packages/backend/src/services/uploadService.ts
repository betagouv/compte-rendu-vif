import { S3Client, ListBucketsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { ENV } from "../envVars";

const client = new S3Client({ region: ENV.AWS_REGION });
const command = new ListBucketsCommand("");

export const upload = async () => {};

export class UploadService {
  async addPDFToReport({ reportId, buffer, name }: { reportId: string; buffer: Buffer; name: string }) {
    const command = new PutObjectCommand({ Bucket: ENV.AWS_BUCKET_NAME, Body: buffer, Key: name });
    await client.send(command);

    const url = `https://${ENV.AWS_BUCKET_NAME}.s3.${ENV.AWS_REGION}.amazonaws.com/${name}`;

    return url;
  }
}
