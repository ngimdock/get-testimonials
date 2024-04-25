"use server";

import { ActionError, userAction } from "@/lib/safe-actions";
import { ProductSchema } from "./product.schema";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { User } from "@prisma/client";

export const createProductAction = userAction(
  ProductSchema,
  async (input, { user }) => {
    await verifyProductSlugIsUnique(input.slug);
    await verifyUserPlan(user);

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

const verifyUserPlan = async (user: User) => {
  if (user.plan === "PREMIUM") return;

  const userProductCount = await prisma.product.count({
    where: {
      userId: user.id,
    },
  });

  console.log({ userProductCount });

  if (userProductCount > 0)
    throw new ActionError(
      "You need to upgrade your plan to create more products"
    );
};

const verifyProductSlugIsUnique = async (slug: string, productId?: string) => {
  const slugExists = await prisma.product.count({
    where: {
      slug,
      id: productId ? { not: productId } : undefined,
    },
  });

  if (slugExists) throw new ActionError("Slug already exists");
};
