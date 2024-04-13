import { z } from "zod";

export const ReviewScheme = z.object({
  id: z.string().optional(),
  ratting: z.number().min(1).max(5).optional(),
  text: z.string().optional(),
  audio: z.string().optional(),
  socialLink: z.string().optional(),
  reviewerName: z.string().optional(),
  productId: z.string(),
});

export type ReviewType = z.infer<typeof ReviewScheme>;
