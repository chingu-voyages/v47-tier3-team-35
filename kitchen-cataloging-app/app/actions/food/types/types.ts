import {
  PaginationProps,
  SearchFuncProps,
} from "@/components/pagination/types";
import { SuccessResult } from "@/utils/types/types";
import { Food, FoodItemVersion } from "@prisma/client";
export type SearchFoodProps = PaginationProps & SearchFuncProps;

export type SearchResultFood = Pick<
  Food,
  "id" | "title" | "roomTitle" | "labels" | "roomId" | "amount" | "image"
> & { score?: number } & {
  earliestExpirationDate: Date | string | null;
};
export type FoodCreateResult = SuccessResult & {
  result: Food;
};
export type FoodUpdateResult = FoodCreateResult;
export type FoodItemSuccessResult = SuccessResult & {
  result: { foodDoc: Food; foodVerDoc: null | FoodItemVersion };
};