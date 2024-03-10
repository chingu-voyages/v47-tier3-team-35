import { Food, FoodItemVersion } from "@prisma/client";

export interface CreateEditFormProps<T> {
  children?: React.ReactNode;
  onClose?: () => void;
  type: "create" | "edit";
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
