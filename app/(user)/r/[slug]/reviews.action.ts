"use server";

import { prisma } from "@/lib/prisma";
import { ActionError, action } from "@/lib/safe-actions";
import { Review } from "@prisma/client";
import { z } from "zod";
import { ReviewScheme } from "./review.schema";
import { headers } from "next/headers";
import { openai } from "@/lib/openai";

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
  const headerList = headers();

  const userIp =
    headerList.get("x-real-ip") || headerList.get("x-forwarded-for");

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

export const processAudioAction = action(
  z.object({
    formData: z.instanceof(FormData),
    reviewId: z.string(),
    productId: z.string(),
  }),
  async (input) => {
    const userIp = getUserIp();

    const review = await prisma.review.findUnique({
      where: {
        id: input.reviewId,
        ip: userIp,
        productId: input.productId,
      },
      include: {
        product: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    console.log({
      review,
    });

    if (!review) throw new ActionError("Review not found");

    if (review.text) throw new ActionError("Review already has text");

    const audio = input.formData.get("audio");

    console.log({ audio });

    const result = await openai.audio.transcriptions.create({
      model: "whisper-1",
      file: audio as any,
    });

    console.log({ result });

    if (!result.text) throw new ActionError("Failed to transcribe audio");

    console.log({
      firstReviewText: result.text,
    });

    const finalResult = await openai.chat.completions.create({
      model: "gpt-4",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: `Context:
          You are a transcriptionist and you are transcribing an audio review for a product. The audio review is about the product ${review.product.name}}
          
          Goal: 
          You need to transcript and organize the audio review into a written review. The review should be clear and concise. It should be easy to understand and should be helpful for other customers.
          
          Criteria:
          1. Transcribe the audio review into a written review
          2. Be clear,  concise
          3. Be helpful for other customers
          4. The review should respect what the customer said in the audio review
          `,
        },
        {
          role: "user",
          content: result.text,
        },
      ],
    });

    const resultText = finalResult.choices[0].message.content;

    console.log({
      finalReviewText: resultText,
    });

    await prisma.review.update({
      where: {
        id: input.reviewId,
      },
      data: {
        text: resultText,
      },
    });

    return review;
  }
);

function getUserIp() {
  const headerList = headers();

  const userIp =
    headerList.get("x-real-ip") || headerList.get("x-forwarded-for");

  if (!userIp) throw new Error("User IP not found");

  return userIp;
}
