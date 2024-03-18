import { z } from "zod";
const GeneralGroceryItemSchemaProps = {
  id: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  labels: z.array(z.string()).optional(),
  amount: z.number().optional(),
  roomId: z.string().optional(),
  image: z
    .object({
      s3ObjKey: z.string().nullable(),
      url: z.string().nullable(),
    })
    .optional(),
};
export const GroceryItemZodSchema = z.object({
  ...GeneralGroceryItemSchemaProps,
  title: z.string(),
  amount: z.number(),
  roomId: z.string(),
});
export type GroceryItemZodType = z.infer<typeof GroceryItemZodSchema>;
export const GroceryItemZodSchemaAllOptional = z.object(
  GeneralGroceryItemSchemaProps
);
export type GroceryItemZodTypeAllOptional = z.infer<
  typeof GroceryItemZodSchemaAllOptional
>;
