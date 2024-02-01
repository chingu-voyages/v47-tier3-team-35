import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/client";
const getUserInfo = async () => {
  try {
    const { userId } = auth();
    if (!userId) return null;
    const thisUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });
    return thisUser;
  } catch (err) {
    console.error(err);
    return null;
  }
};
export default getUserInfo;
