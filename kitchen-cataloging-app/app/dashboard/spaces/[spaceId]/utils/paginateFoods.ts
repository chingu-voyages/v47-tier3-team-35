import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import prisma from "@/prisma/client";
export type PaginationProps = {
  cursor?: string | null;
  take: number;
  spaceId?: string | null;
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
  if (nextItems.length > 0) return nextItems;
  else return null;
};