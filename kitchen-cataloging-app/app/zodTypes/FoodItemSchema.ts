import { z } from "zod";
const FoodItemSchemaProps = {
    createdAt: z.date().optional(),
  title: z.string(),
  description: z.string(),
  labels: z.array(z.string()),
    amount: z.number(),
    price: z.number(),
    threshold: z.number(),
    expirationDate: z.date(),
  roomTitle: z.string(),
  image: z
    .object({
      s3ObjKey: z.string().nullable().optional(),
      url: z.string().nullable().optional(),
    })
        .optional(),
};
export const FoodItemZodSchema = z.object({
  ...FoodItemSchemaProps
});
export type FoodItemZodType = z.infer<typeof FoodItemZodSchema>;
export const FoodItemZodSchemaAllOptional = z.object(
  FoodItemSchemaProps
);
export type FoodItemZodTypeAllOptional = z.infer<
  typeof FoodItemZodSchemaAllOptional
>;

