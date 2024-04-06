import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string(),
  image: z.string().optional(),
  noteText: z.string().optional(),
  informationText: z.string().optional(),
  reviewText: z.string().optional(),
  thanksText: z.string().optional(),
  backgroundColor: z.string().optional(),
});

export type ProductType = z.infer<typeof ProductSchema>;
