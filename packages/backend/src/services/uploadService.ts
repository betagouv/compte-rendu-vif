import { S3Client, ListBucketsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { ENV } from "../envVars";

const client = new S3Client({ region: "eu-north-1" });
const command = new ListBucketsCommand("");

export const upload = async () => {};

export class UploadService {
  async addImageToReport({ reportId, buffer, name }: { reportId: string; buffer: Buffer; name: string }) {
    const command = new PutObjectCommand({ Bucket: ENV.AWS_BUCKET_NAME, Body: buffer, Key: name });
    const result = await client.send(command);

    return result;
  }
}
