import { FoodItemVersionZodType } from "@/zodTypes/FoodItemSchema";
export const extractGeneralFoodItemVerProps = async (
  userId: string,
  newData: FoodItemVersionZodType
) => {
  const newDoc = {
    userId,
    quantity: newData.quantity,
    expirationDate: newData.expirationDate,
    price: newData.price,
    foodId: newData.foodId,
  };
  return newDoc;
};
export default extractGeneralFoodItemVerProps;
