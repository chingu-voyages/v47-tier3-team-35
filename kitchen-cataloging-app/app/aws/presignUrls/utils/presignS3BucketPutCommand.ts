import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { replaceSpacesWithDash } from "./replaceSpacesWithDashed";
export type FileToBeUploadedProps = { name: string; type: string };
const region = process.env["AMAZON_BUCKET_REGION"];
const clientId = process.env["AWS_CLIENT_ID"];
const clientSecret = process.env["AWS_CLIENT_SECRET_KEY"];
const constructFileUploadPaths = async ({
  client,
  file,
  userId,
}: {
  client: S3Client;
  file: FileToBeUploadedProps;
  userId: string;
}) => {
  const fileNameArr = file.name.split(".");
  const extension = fileNameArr[fileNameArr.length - 1];
  const key = `${replaceSpacesWithDash(userId)}/${uuidv4()}.${extension}`;
  const payload = {
    Bucket: process.env.AMAZON_RECORD_BUCKET_NAME,
    Key: key,
    ContentType: file.type,
  };
  const command = new PutObjectCommand(payload);
  const signedUrl = await getSignedUrl(client, command);
  return {
    key: key,
    name: file.name,
    contentType: file.type,
    bucket: payload.Bucket,
    signedUrl,
  };
};
export const presignS3BucketPutCommand = async ({
  userId,
  files,
}: {
  files: FileToBeUploadedProps[];
  userId: string;
}) => {
  if (!region || !clientId || !clientSecret)
    throw "Could not configure AWS S3 Client";
  if (files.length <= 0) return [];
  const client = new S3Client({
    region,
    credentials: {
      accessKeyId: clientId,
      secretAccessKey: clientSecret,
    },
  });
  const fileUploadPromises = files.map(
    async (file) => await constructFileUploadPaths({ client, file, userId })
  );
  const response = await Promise.all(fileUploadPromises);
  return response;
};
