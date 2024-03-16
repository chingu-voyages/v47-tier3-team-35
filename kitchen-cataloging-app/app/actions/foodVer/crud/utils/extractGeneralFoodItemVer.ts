import {
  FoodItemVersionZodTypeAllOptional,
} from "@/zodTypes/FoodItemSchema";
export const extractGeneralFoodItemVerProps = async (
  userId: string,
  newData: FoodItemVersionZodTypeAllOptional
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
