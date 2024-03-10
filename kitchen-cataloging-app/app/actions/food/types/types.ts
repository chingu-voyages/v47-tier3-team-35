import {
  PaginationProps,
  SearchFuncProps,
} from "@/components/pagination/types";
import { Food } from "@prisma/client";
export type SearchFoodProps = PaginationProps & SearchFuncProps;

export type SearchResultFood = Pick<
  Food,
  | "id"
  | "title"
  | "roomTitle"
  | "labels"
  | "roomId"
  | "amount"
  | "image"
> & { score?: number };
