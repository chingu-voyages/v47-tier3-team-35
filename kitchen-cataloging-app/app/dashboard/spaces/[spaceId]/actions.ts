"use server";
import getUserInfo from "@/auth/providers/auth/ServerAuthProvider";
import { Food } from "@prisma/client";
import prisma from "@/prisma/client";
type PaginationProps = {
  cursor?: string | null;
  take: number;
  spaceId?: string | null;
};
export const paginateFoodItems = async ({
  cursor,
  take,
  spaceId,
}: PaginationProps): Promise<Food[] | null> => {
  try {
    //ensure user only grabs rooms belonging to them
    const userInfo = await getUserInfo();
    if (!userInfo?.id) return null;
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
        userId: userInfo.id,
        ...optionalParams,
      },
      orderBy: {
        id: "desc",
      },
    });
    //return array if rooms exist, else return null
    if (nextItems.length > 0) return nextItems;
    else return null;
  } catch (error: any) {
    console.error("Error paginating rooms:", error);
    return null;
  }
};