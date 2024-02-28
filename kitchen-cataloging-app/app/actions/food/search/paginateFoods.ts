import extractSignedUrls from "@/actions/utils/extractSignedUrls";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import { PaginationProps } from "@/components/pagination/types";
import prisma from "@/prisma/client";
export const paginateFoods = async ({
  cursor,
  take,
  spaceId,
  userId,
}: PaginationProps & { spaceId?: string; userId?: string | null }) => {
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
