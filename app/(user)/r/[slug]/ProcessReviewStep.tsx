"use client";
import { useLocalStorage } from "react-use";

import { Product, Review } from "@prisma/client";
import { useEffect, useState } from "react";
import RatingSelector from "./RatingSelector";
import { motion, AnimatePresence } from "framer-motion";
import { SocialSelector } from "./SocialSelector";
import { ReviewSelector } from "./ReviewSelector";
import {
  Mutation,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getReviewAction, updateReviewAction } from "./reviews.action";
import { ReviewType } from "./review.schema";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

const getCurrentStpe = (data?: Review) => {
  if (!data) return 0;

  if (data.ratting === undefined) return 0;

  if (!data.reviewerName || !data.socialLink) return 1;

  if (!data.text) return 2;

  return 3;
};

export const ProcessReviewStep = ({ product }: { product: Product }) => {
  const [reviewId, setReviewId, removeReviewId] = useLocalStorage<
    string | null
  >(`review-id-${product.id}`, null);

  const queryClient = useQueryClient();

  const reviewData = useQuery({
    queryKey: ["review", reviewId, "product", product.id],
    queryFn: async () => {
      const { data, serverError } = await getReviewAction({
        id: reviewId ?? "",
        productId: product.id,
      });

      if (serverError || !data) {
        // toast.error("Failed to load review");
        return;
      }

      return data;
    },
  });

  const mutateReview = useMutation({
    mutationFn: async (data: Partial<ReviewType>) => {
      const { data: reviewCreated, serverError } = await updateReviewAction({
        ...data,
        id: reviewId ?? undefined,
        productId: product.id,
      });

      if (serverError || !reviewCreated) {
        toast.error(serverError ?? "Failed to save review");
        return;
      }

      setReviewId(reviewCreated.id);

      await queryClient.invalidateQueries({
        queryKey: ["review", reviewCreated.id, "product", product.id],
      });
    },
  });

  const updateData = (partialData: Partial<ReviewType>) => {
    mutateReview.mutate(partialData);
  };

  const step = getCurrentStpe(reviewData.data);

  return (
    <div
      className={cn("h-full w-full", {
        "animate-pulse": mutateReview.isPending,
      })}
    >
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step-0"
            exit={{
              opacity: 0,
              x: -100,
            }}
            className="flex h-full flex-col items-center justify-center"
          >
            <h2 className="text-lg font-bold">
              {product.noteText ?? `How much do you like ${product.name}?`}
            </h2>

            <RatingSelector
              onSelect={(ratting) => {
                updateData({
                  ratting,
                });
              }}
            />
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step-1"
            exit={{
              opacity: 0,
              x: -100,
            }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex h-full flex-col items-center justify-center gap-4"
          >
            <h2 className="text-lg font-bold">
              {product.informationText ?? "I need more information about you"}
            </h2>

            <SocialSelector
              onSelect={(name, url) => {
                updateData({ reviewerName: name, socialLink: url });
              }}
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step-2"
            exit={{
              opacity: 0,
              x: -100,
            }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex h-full flex-col items-center justify-center gap-4"
          >
            <h2 className="text-lg font-bold">
              {product.reviewText ?? "Tell me what you loved and hated"}
            </h2>

            <ReviewSelector productId={product.id} />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step-3"
            exit={{
              opacity: 0,
              x: -100,
            }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex h-full max-w-lg flex-col items-center justify-center gap-4"
          >
            <h2 className="text-lg font-bold">
              {product.thanksText ?? "Thank you for your review!"}
            </h2>

            <Card>
              <CardHeader>
                <CardDescription>{reviewData.data?.text}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
