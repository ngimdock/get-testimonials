import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string(),
  slug: z
    .string()
    .regex(/^[a-zA-Z0-9_-]+$/)
    .min(5)
    .max(20),
  image: z.string().optional().nullable(),
  noteText: z.string().optional().nullable(),
  informationText: z.string().optional().nullable(),
  reviewText: z.string().optional().nullable(),
  thanksText: z.string().optional().nullable(),
  backgroundColor: z.string(),
});

export type ProductType = z.infer<typeof ProductSchema>;
