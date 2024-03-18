import prisma from "@/prisma/client";
export const determineSpaceProps = async ({
  spaceId,
  userId,
}: {
  spaceId: string;
  userId: string;
}) => {
  //find room name
  const room = await prisma.room.findFirst({
    where: {
      id: spaceId,
      userId,
    },
  });
  return {
    roomId: room?.id,
    roomTitle: room?.title,
  };
};
