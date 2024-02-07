import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import { replaceImgKeyWithSignedUrls } from "@/aws/presignUrls/utils/replaceImgKeyWithSignedUrl";
import prisma from "@/prisma/client";
import { Image } from "@prisma/client";
export type PaginationProps = {
  cursor?: string | null;
  take: number;
  spaceId?: string | null;
};
const extractSignedUrls = async <T>(
  nextItems?: (T & { image: Image | null })[]
) => {
  if (!nextItems) return nextItems;
  const nextItemsWithUrls = await replaceImgKeyWithSignedUrls({
    items: nextItems,
  });
  //we do this in case presigning url fails. This way we can still read content data,
  //though we can't load the url
  return (
    nextItemsWithUrls ||
    nextItems.map((item) => ({
      ...item,
      image: {
        s3ObjKey: null,
        url: "",
      },
    }))
  );
};
export const paginateFoods = async ({
  cursor,
  take,
  spaceId,
  userId,
}: PaginationProps & { userId?: string | null }) => {
  const user = await getUserInfoServer({ userId });
  if (!user?.id) return null;
  //query
  const optionalParams = {
    roomId: spaceId ? spaceId : undefined,
  };
  const nextItems = await prisma.food.findMany({
    take: take,
    skip: cursor ? 1 : 0, // Skip the cursor
    cursor: cursor
      ? {
          id: cursor,
        }
      : undefined,
    where: {
      userId: user.id,
      ...optionalParams,
    },
    orderBy: {
      id: "desc",
    },
  });
  //return array if rooms exist, else return null
  if (!nextItems) return null;
  if (nextItems.length <= 0) return null;
  return await extractSignedUrls(nextItems);
};
