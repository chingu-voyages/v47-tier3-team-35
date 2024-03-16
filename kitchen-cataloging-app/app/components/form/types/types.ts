import { Food, FoodItemVersion } from "@prisma/client";
export interface FormProps<T, B = any> {
  children?: React.ReactNode;
  onClose?: (e?: B) => void;
  actionType: "create" | "edit";
  spaces?: string[];
  userId?: string;
  itemId?: string;
  defaultData?: T;
}
export interface SuccessResult {
  type: "success";
  statusCode: 200;
}
export type FoodItemSuccessResult = SuccessResult & {
  result: { foodDoc: Food; foodVerDoc: null | FoodItemVersion };
};
export type FoodItemVerSuccessResult = SuccessResult & {
  result: FoodItemVersion;
};
export type FoodCreateResult = SuccessResult & {
  result: Food;
};
export type FoodUpdateResult = FoodCreateResult;
export type FoodVerUpdateResult = SuccessResult & {
  result: FoodItemVersion;
};
export type FoodVerCreateResult = SuccessResult & {
  result: FoodItemVersion;
};
