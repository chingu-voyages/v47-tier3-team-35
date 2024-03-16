export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];
export type UpdateFoodVerQuantityPropsOptional = {
  userId: string;
  foodVerId: string;
  count?: number;
  newQuantity?: number;
};
export type UpdateFoodVerQuantityProps = RequireAtLeastOne<
  UpdateFoodVerQuantityPropsOptional,
  "count" | "newQuantity"
>;
export type UpdateFoodAmountProps = {
  newAmount: number;
  avgPrice: number | null;
};
