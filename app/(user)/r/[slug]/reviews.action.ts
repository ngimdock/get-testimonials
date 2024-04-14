"use server";

import { prisma } from "@/lib/prisma";
import { action } from "@/lib/safe-actions";
import { Review } from "@prisma/client";
import { z } from "zod";
import { ReviewScheme } from "./review.schema";
import { headers } from "next/headers";

export const getReviewAction = action(
  z.object({
    id: z.string(),
    productId: z.string(),
  }),
  async (input) => {
    const review = await prisma.review.findUnique({
      where: {
        id: input.id,
        productId: input.productId,
      },
    });

    if (!review) {
      throw new Error("Review not found");
    }

    return review;
  }
);

export const updateReviewAction = action(ReviewScheme, async (input) => {
  console.log({ input });

  const headerList = headers();

  const userIp =
    headerList.get("x-real-ip") || headerList.get("x-forwarded-for");

  console.log({ userIp });

  if (!userIp) {
    throw new Error("User IP not found");
  }

  let review: Review | null = null;

  if (input.id) {
    review = await prisma.review.findUnique({
      where: {
        id: input.id,
        ip: userIp,
        productId: input.productId,
      },
    });

    if (!review) {
      throw new Error("Review not found");
    }

    // update review
    review = await prisma.review.update({
      where: {
        id: input.id,
      },
      data: {
        ratting: input.ratting,
        text: input.text,
        audio: input.audio,
        socialLink: input.socialLink,
        reviewerName: input.reviewerName,
      },
    });
  } else {
    review = await prisma.review.create({
      data: {
        ip: userIp,
        productId: input.productId,
        ratting: input.ratting || 0,
        text: input.text,
        audio: input.audio,
        socialLink: input.socialLink,
        reviewerName: input.reviewerName,
      },
    });
  }

  return review;
});
