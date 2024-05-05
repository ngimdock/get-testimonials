"use server";

import { ActionError, userAction } from "@/lib/safe-actions";
import { ProductSchema } from "./product.schema";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { User } from "@prisma/client";
import { resend } from "@/lib/resend";
import { EMAIL_FROM } from "@/config";
import FirstProductCreatedEmail from "../../../../../emails/FirstProductCreatedEmail";
import { redirect } from "next/navigation";

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

    await sendEmailIfUserCreateFirstProduct(user);

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

const sendEmailIfUserCreateFirstProduct = async (user: User) => {
  if (user.plan === "PREMIUM") return;

  const userProductCount = await prisma.product.count({
    where: {
      userId: user.id,
    },
  });

  if (userProductCount !== 1) return;

  const product = await prisma.product.findFirst({
    where: {
      userId: user.id,
    },
    select: {
      name: true,
      slug: true,
    },
  });

  if (!product) return;

  await resend.emails.send({
    from: EMAIL_FROM,
    to: user.email ?? "",
    subject: "You created your first product",
    react: FirstProductCreatedEmail({
      product: product.name,
      productSlug: product.slug,
    }),
  });
};

export const deleteProductAction = userAction(
  z.string(),
  async (productId, { user }) => {
    await prisma.product.delete({
      where: {
        id: productId,
        userId: user.id,
      },
    });
  }
);
