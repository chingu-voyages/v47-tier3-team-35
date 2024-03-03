import { z } from "zod";
const FoodItemSchemaProps = {
  id: z.string().optional(),
  createdAt: z.date().optional(),
  title: z.string(),
  description: z.string().optional(),
  labels: z.array(z.string()),
  threshold: z.number(),
  roomId: z.string(),
  image: z
    .object({
      s3ObjKey: z.string().nullable(),
      url: z.string().nullable(),
    })
    .optional(),
};
export const FoodItemZodSchema = z.object({
  ...FoodItemSchemaProps,
});
export type FoodItemZodType = z.infer<typeof FoodItemZodSchema>;
export const FoodItemZodSchemaAllOptional = z.object(FoodItemSchemaProps);
export type FoodItemZodTypeAllOptional = z.infer<
  typeof FoodItemZodSchemaAllOptional
>;
const FoodItemVersionSchemaProps = {
  id: z.string().optional(),
  quantity: z.number(),
  expirationDate: z.date(), // denotes how many of an item exists with the same price
  price: z.number(), //limit to 2 decimal places
  foodId: z.string().optional(),
};
export const FoodItemVersionZodSchema = z.object({
  ...FoodItemVersionSchemaProps,
});
export type FoodItemVersionZodType = z.infer<typeof FoodItemVersionZodSchema>;
export const FoodItemVersionZodSchemaAllOptional = z.object(
  FoodItemVersionSchemaProps
);
export type FoodItemVersionZodTypeAllOptional = z.infer<
  typeof FoodItemZodSchemaAllOptional
>;
