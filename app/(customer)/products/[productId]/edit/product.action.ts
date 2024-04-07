"use server";

import { ActionError, userAction } from "@/lib/safe-actions";
import { ProductSchema } from "./product.schema";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const createProductAction = userAction(
  ProductSchema,
  async (input, { user }) => {
    await verifyProductSlugIsUnique(input.slug);

    const product = await prisma.product.create({
      data: {
        ...input,
        userId: user.id,
      },
    });

    return { product };
  }
);

export const updateProductAction = userAction(
  z.object({
    id: z.string(),
    data: ProductSchema,
  }),
  async (input, { user }) => {
    await verifyProductSlugIsUnique(input.data.slug, input.id);

    const product = await prisma.product.update({
      where: {
        id: input.id,
        userId: user.id,
      },
      data: {
        ...input.data,
      },
    });

    return { product };
  }
);

const verifyProductSlugIsUnique = async (slug: string, productId?: string) => {
  const slugExists = await prisma.product.count({
    where: {
      slug,
      id: productId ? { not: productId } : undefined,
    },
  });

  if (slugExists) throw new ActionError("Slug already exists");
};
