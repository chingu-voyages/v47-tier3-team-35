import { z } from "zod";
export const StringArraySchema = z.array(z.string());
export type StringArrayType = z.infer<typeof StringArraySchema>;
