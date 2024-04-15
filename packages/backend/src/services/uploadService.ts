import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const client = new S3Client({ region: "eu-north-1" });
const command = new ListBucketsCommand("");

export const upload = async () => {
  const command = new ListBucketsCommand({});

  const { Buckets } = await client.send(command);

  console.log("Buckets: ");
  console.log(Buckets?.map((bucket) => bucket.Name).join("\n"));

  return Buckets;
};

export class UploadService {
  async addImageToReport() {}
}
