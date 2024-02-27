"use server";
import { auth } from "@clerk/nextjs";
import { createFoodLog } from "../logs/crud/createFoodLog";
import { paginateLogs } from "./search/paginateLogs";
import { PaginationProps } from "./search/paginateLogs";
import { LogType } from "@/prisma/mock/mockData";

export const createFoodLogAction = async (foodId: string, amount: number, price: number) => {
  const { userId } = auth();
  return await createFoodLog({ foodId, userId, amount, price });
};

export const getPaginateLogs = async (
  props: PaginationProps
): Promise<LogType[] | null> => {
  try {
    const { userId } = auth();
    return await paginateLogs({ ...props, userId });
  } catch (err) {
    console.error("Error paginating rooms:", err);
    return null;
  }
};