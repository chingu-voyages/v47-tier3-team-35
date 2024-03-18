import {
  PaginationProps,
  SearchFuncProps,
} from "@/components/pagination/types";
import { SuccessResult } from "@/utils/types/types";
import { GroceryItem } from "@prisma/client";
export type GroceryItemAsyncFuncDataProps = PaginationProps & SearchFuncProps;
export type GroceryItemCreateResult = SuccessResult & {
  result: GroceryItem;
};
export type GroceryItemUpdateResult = GroceryItemCreateResult;