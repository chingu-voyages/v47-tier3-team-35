"use server";
import prisma from "@/prisma/client";
const getUserInfoServer = async ({ userId }: { userId?: string | null }) => {
  try {
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
export default getUserInfoServer;
