import prisma from "@/prisma/client";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";

export type PaginationProps = {
  cursor?: string | null;
  take: number;
};
export const paginateSpaces = async ({
  cursor,
  take,
  userId,
}: PaginationProps & {
  userId?: string | null;
}) => {
  // ensure user only grabs rooms belonging to them
  const user = await getUserInfoServer({ userId });
  if (!user?.id) return null;
  //query
  const nextRooms = await prisma.room.findMany({
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
  //return array if rooms exist, else return null
  if (nextRooms.length > 0) return nextRooms;
  else return null;
};
