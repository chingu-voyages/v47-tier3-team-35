import { auth } from "@clerk/nextjs";
import { presignCloudfrontObjectUrl } from "./utils/presignCloudfrontObjectUrl";
import {
  FileToBeUploadedProps,
  presignS3BucketPutCommand,
} from "./utils/presignS3BucketPutCommand";
export const getCloudfrontSignedUrl = async ({ key }: { key: string }) => {
  const { userId } = auth();
  if (!userId) return null;
  return presignCloudfrontObjectUrl({
    userId,
    s3ObjectKey: key,
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
