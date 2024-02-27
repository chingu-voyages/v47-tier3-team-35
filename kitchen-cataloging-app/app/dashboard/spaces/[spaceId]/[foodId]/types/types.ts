import { LogType, FoodType } from "@/prisma/mock/mockData";
export type LogDataType = Omit<LogType, "id" | "userId" | "foodId">;
export type FoodDataType = FoodType & { logs: LogDataType[] };
