import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import prisma from "@/prisma/client";
const getGroceryItem = async ({
  id,
  userId,
}: {
  id: string;
  userId?: string | null;
}) => {
  const user = await getUserInfoServer({ userId });
  if (!user?.id) return null;
  const doc = await prisma.groceryItem.findFirst({
    where: {
      userId: user.id,
      id: id,
    }
  });
  return doc;
};
export default getGroceryItem;
