"use server";
// import { revalidatePath } from "next/cache";
import { Food } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import { PaginationProps } from "@/components/pagination/types";
import { getSingleFood } from "./crud/getSingleFood";
import { incrementFood } from "./crud/incrementFood";

// GET FOOD -----------
export const getFood = async ({ foodId }: { foodId: string }) => {
  const { userId } = auth();
  return await getSingleFood({ foodId, userId });
};

export const getIncrementFood = async ( foodId: string, newValue: number ) => {
  const { userId } = auth();
  return await incrementFood({ foodId, newValue, userId });
};