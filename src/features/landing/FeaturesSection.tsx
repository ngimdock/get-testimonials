"use client";

import React, { useState } from "react";
import { SectionLayout } from "./SectionLayout";
import RatingSelector from "../../../app/(user)/r/[slug]/RatingSelector";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { ReviewSelector } from "../../../app/(user)/r/[slug]/ReviewSelector";
import { SocialSelector } from "../../../app/(user)/r/[slug]/SocialSelector";
import { Review } from "@prisma/client";
import { ReviewCard } from "../../../app/(customer)/wall/[slug]/ReviewCard";

const reviews: Review[] = [
  {
    id: "1",
    productId: "1",
    reviewerName: "John Doe",
    socialLink: "https://twitter.com",
    text: "I love this product",
    ratting: 4,
    createdAt: new Date(),
    audio: null,
    ip: "1.1.1.1",
    reviewerImage: "https://i.pravatar.cc/300?u=a042581f4e29026707d",
    socialType: "LINKEDIN",
    updatedAt: new Date(),
  },
  {
    id: "2",
    productId: "1",
    reviewerName: "Jane Smith",
    socialLink: "https://facebook.com",
    text: "Great product, highly recommended!",
    ratting: 5,
    createdAt: new Date(),
    audio: null,
    ip: "2.2.2.2",
    reviewerImage: "https://i.pravatar.cc/300?u=a042581f4e29026707e",
    socialType: "TWITTER",
    updatedAt: new Date(),
  },
  {
    id: "3",
    productId: "1",
    reviewerName: "Alice Johnson",
    socialLink: "https://instagram.com",
    text: "Amazing features, worth every penny!",
    ratting: 5,
    createdAt: new Date(),
    audio: null,
    ip: "3.3.3.3",
    reviewerImage: "https://i.pravatar.cc/300?u=a042581f4e29026707f",
    socialType: "LINKEDIN",
    updatedAt: new Date(),
  },
  {
    id: "4",
    productId: "1",
    reviewerName: "Bob Williams",
    socialLink: "https://linkedin.com",
    text: "This product changed my life!",
    ratting: 4,
    createdAt: new Date(),
    audio: null,
    ip: "4.4.4.4",
    reviewerImage: "https://i.pravatar.cc/300?u=a042581f4e290267080",
    socialType: "LINKEDIN",
    updatedAt: new Date(),
  },
  {
    id: "5",
    productId: "1",
    reviewerName: "Emily Davis",
    socialLink: "https://pinterest.com",
    text: "Excellent customer service, very satisfied!",
    ratting: 5,
    createdAt: new Date(),
    audio: null,
    ip: "5.5.5.5",
    reviewerImage: "https://i.pravatar.cc/300?u=a042581f4e290267081",
    socialType: "TWITTER",
    updatedAt: new Date(),
  },
  {
    id: "6",
    productId: "1",
    reviewerName: "Michael Brown",
    socialLink: "https://twitter.com",
    text: "The best product I've ever used!",
    ratting: 5,
    createdAt: new Date(),
    audio: null,
    ip: "6.6.6.6",
    reviewerImage: "https://i.pravatar.cc/300?u=a042581f4e290267082",
    socialType: "TWITTER",
    updatedAt: new Date(),
  },
];

export const FeaturesSection = () => {
  const [step, setStep] = useState(0);

  return (
    <>
      <SectionLayout id="features" sectionClassName="pb-2">
        <h2 className="text-center text-3xl font-bold text-foreground">
          The review process made simple
        </h2>
      </SectionLayout>
      <SectionLayout sectionClassName="bg-gradient-to-r light text-foreground from-violet-600 to-indigo-600 py-12 shadow rounded-lg">
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
              <h2 className="text-center text-lg font-bold">
                How much do you like get-testimonial.com ?
              </h2>

              <RatingSelector
                onSelect={(ratting) => {
                  setStep((step) => step + 1);
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
              <h2 className="text-center text-lg font-bold">
                I need more information about you
              </h2>

              <SocialSelector
                onSelect={(name, url) => {
                  setStep((step) => step + 1);
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
              <h2 className="text-center text-lg font-bold">
                Tell me what you loved and hated
              </h2>

              <ReviewSelector
                onSubmitText={() => setStep((step) => step + 1)}
                productId={""}
              />
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
              className="mx-auto flex h-full max-w-lg flex-col items-center justify-center gap-4 "
            >
              <h2 className="text-center text-lg font-bold">
                Thank you for your review!
              </h2>

              <Card className="mx-auto">
                <CardHeader>
                  <CardDescription>The review is submitted ✅</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </SectionLayout>
      <SectionLayout className="flex flex-col items-center justify-center gap-8">
        <h2 className="text-center text-3xl font-bold text-foreground">
          And get your review all to share
        </h2>

        <div>
          <h2 className="text-4xl font-extrabold">4 / 5</h2>
          <p>144 reviews</p>
        </div>

        <div className="grid w-full gap-3 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </SectionLayout>
    </>
  );
};
