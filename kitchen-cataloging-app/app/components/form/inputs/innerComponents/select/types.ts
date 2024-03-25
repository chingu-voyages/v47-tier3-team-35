import { FoodItemVersion } from "@prisma/client";

export interface ValueProps {
  label: string;
  value: string;
}
export interface FoodInstanceValueProps {
  label: Partial<
    Pick<FoodItemVersion, "price" | "quantity" | "expirationDate">
  >;
  value: string;
}
