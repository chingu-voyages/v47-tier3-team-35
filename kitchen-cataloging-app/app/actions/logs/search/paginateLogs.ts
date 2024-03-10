import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import prisma from "@/prisma/client";
export type PaginationProps = {
  cursor?: string | null;
  take: number;
};

//  Gets ALL logs from all food items for a single user
export const paginateLogs = async ({
  cursor,
  take,
  userId,
}: PaginationProps & { userId?: string | null }) => {
  const user = await getUserInfoServer({ userId });
  if (!user?.id) return null;
  //query
  const nextItems = await prisma.log.findMany({
    take: take,
    skip: cursor ? 1 : 0, // Skip the cursor
    cursor: cursor
      ? {
          id: cursor,
        }
      : undefined,
    where: {
      userId: user.id,
    },
    orderBy: {
      id: "desc",
    },
  });
  //return array if logs exist, else return null
  if (!nextItems) return null;
    if (nextItems.length <= 0) return null;
    return nextItems
};
