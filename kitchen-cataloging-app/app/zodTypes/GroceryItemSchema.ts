import { z } from "zod";
const GeneralGroceryItemSchemaProps = {
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  labels: z.array(z.string()).optional(),
  amount: z.number().nullable().optional(),
  roomTitle: z.string().nullable().optional(),
  image: z
    .object({
      s3ObjKey: z.string().nullable().optional(),
      url: z.string().nullable().optional(),
    })
    .optional(),
};
export const GroceryItemZodSchema = z.object({
  ...GeneralGroceryItemSchemaProps,
  title: z.string(),
  amount: z.number(),
  roomTitle: z.string(),
});
export type GroceryItemZodType = z.infer<typeof GroceryItemZodSchema>;
export const GroceryItemZodSchemaAllOptional = z.object(
  GeneralGroceryItemSchemaProps
);
export type GroceryItemZodTypeAllOptional = z.infer<
  typeof GroceryItemZodSchemaAllOptional
>;
