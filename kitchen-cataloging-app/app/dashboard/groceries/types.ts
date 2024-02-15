import {
  PaginationProps,
  SearchFuncProps,
} from "@/components/pagination/types";
import { GroceryItem } from "@prisma/client";
export type SearchGroceriesProps = PaginationProps & SearchFuncProps;
export type SearchResultGroceries = Pick<
  GroceryItem,
  | "id"
  | "title"
  | "roomTitle"
  | "labels"
  | "roomId"
  | "amount"
  | "image"
> & { score?: number };
