"use server";
import { auth } from "@clerk/nextjs";
import { presignCloudfrontObjectUrls } from "./utils/presignCloudfrontObjectUrls";
import {
  FileToBeUploadedProps,
  presignS3BucketPutCommand,
} from "./utils/presignS3BucketPutCommand";
export const getCloudfrontSignedUrls = async ({
  s3ObjectKeys,
}: {
  s3ObjectKeys: string[];
}) => {
  const { userId } = auth();
  if (!userId) return null;
  return await presignCloudfrontObjectUrls({
    userId,
    s3ObjectKeys: s3ObjectKeys,
  });
};
export const getS3BucketPutSignedUrl = async ({
  files,
}: {
  files: FileToBeUploadedProps[];
}) => {
  const { userId } = auth();
  if (!userId) return null;
  return presignS3BucketPutCommand({
    userId,
    files,
  });
};
