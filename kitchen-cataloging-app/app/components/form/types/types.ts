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
export interface FoodItemSuccessResult {
  type: "success";
  statusCode: 200;
  result: { foodDoc: Food; foodVerDoc: null | FoodItemVersion };
}
