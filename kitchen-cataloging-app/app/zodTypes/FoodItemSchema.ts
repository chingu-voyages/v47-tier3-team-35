import { z } from "zod";
const FoodItemSchemaProps = {
  id: z.string().optional(),
  description: z.string().optional(),
  image: z
    .object({
      s3ObjKey: z.string().nullable(),
      url: z.string().nullable(),
    })
    .optional(),
  title: z.string().optional(),
  labels: z.array(z.string()).optional(),
  threshold: z.number().optional(),
  roomId: z.string().optional(),
  amount: z.number().optional(),
  price: z.number().optional(),
};
export const FoodItemZodSchema = z.object({
  ...FoodItemSchemaProps,
  title: z.string(),
  labels: z.array(z.string()),
  threshold: z.number(),
  roomId: z.string(),
});
export type FoodItemZodType = z.infer<typeof FoodItemZodSchema>;
export const FoodItemZodSchemaAllOptional = z.object(FoodItemSchemaProps);
export type FoodItemZodTypeAllOptional = z.infer<
  typeof FoodItemZodSchemaAllOptional
>;
const FoodItemVersionSchemaProps = {
  id: z.string().optional(),
  foodId: z.string().optional(),
  quantity: z.number().optional(),
  expirationDate: z.date().optional(), // denotes how many of an item exists with the same price
  price: z.number().optional(), //limit to 2 decimal places
};
export const FoodItemVersionZodSchema = z.object({
  ...FoodItemVersionSchemaProps,
  quantity: z.number(),
  expirationDate: z.date(), // denotes how many of an item exists with the same price
  price: z.number(), //limit to 2 decimal places
});
export type FoodItemVersionZodType = z.infer<typeof FoodItemVersionZodSchema>;
export const FoodItemVersionZodSchemaAllOptional = z.object(
  FoodItemVersionSchemaProps
);
export type FoodItemVersionZodTypeAllOptional = z.infer<
  typeof FoodItemVersionZodSchemaAllOptional
>;
