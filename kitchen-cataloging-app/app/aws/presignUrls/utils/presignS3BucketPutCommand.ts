import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { replaceSpacesWithDash } from "./replaceSpacesWithDashed";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
export type FileToBeUploadedProps = { name: string; type: string };
const region = process.env.AWS_S3_BUCKET_REGION;
const clientId = process.env.AWS_S3_BUCKET_CLIENT_ID;
const clientSecret = process.env.AWS_S3_BUCKET_CLIENT_SECRET_KEY;
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
  const s3ObjKey = `${uuidv4()}.${extension}`;
  //secure by default since we only allow a user to upload
  //to a key with their own userId
  const fullS3ObjKey = `${replaceSpacesWithDash(userId)}/${s3ObjKey}`;
  const payload = {
    Bucket: process.env.AWS_S3_DYNAMIC_MEDIA_BUCKET_NAME,
    Key: fullS3ObjKey,
    ContentType: file.type,
  };
  const command = new PutObjectCommand(payload);
  const signedUrl = await getSignedUrl(client, command);
  return {
    s3ObjKey: s3ObjKey,
    fullS3ObjKey: fullS3ObjKey,
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
  const user = await getUserInfoServer({ userId });
  if (!user) return null;
  if (files.length <= 0) return [];
  const client = new S3Client({
    region,
    credentials: {
      accessKeyId: clientId,
      secretAccessKey: clientSecret,
    },
  });
  const fileUploadPromises = files.map(
    async (file) =>
      await constructFileUploadPaths({ client, file, userId: user.id })
  );
  const response = await Promise.all(fileUploadPromises);
  return response;
};
