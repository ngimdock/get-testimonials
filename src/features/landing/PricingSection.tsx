"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import React, { PropsWithChildren, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type PricingCardProps = PropsWithChildren<{
  title: string;
  monthlyPrice: number;
  description: string;
  features: string[];
  popular?: boolean;
}>;

const PricingHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <section className="text-center">
    <h2 className="text-3xl font-bold">{title}</h2>
    <p className="pt-1 text-xl">{subtitle}</p>
    <br />
  </section>
);

const PricingCard = ({
  title,
  monthlyPrice,
  description,
  features,
  popular,
  children,
}: PricingCardProps) => (
  <Card
    className={cn(
      `w-72 h-fit flex flex-col justify-between py-1 relative ${
        popular ? "border-primary" : "border-zinc-700"
      } mx-auto sm:mx-0`,
      {
        "animate-background-shine bg-white dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors":
          popular,
      }
    )}
  >
    <div>
      <CardHeader className="pb-8 pt-4">
        <CardTitle className="text-lg text-zinc-700 dark:text-zinc-300">
          {title}
        </CardTitle>
        <div className="flex gap-0.5">
          <h3 className="text-3xl font-bold">{monthlyPrice}</h3>
          <span className="mb-1 flex flex-col justify-end text-sm">
            / month
          </span>
        </div>
        <CardDescription className="h-12 pt-1.5">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {features.map((feature: string) => (
          <CheckItem key={feature} text={feature} />
        ))}
      </CardContent>
    </div>
    <CardFooter className="mt-2">{children}</CardFooter>
  </Card>
);

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex gap-2">
    <CheckCircle2 size={18} className="my-auto text-green-400" />
    <p className="pt-0.5 text-sm text-zinc-700 dark:text-zinc-300">{text}</p>
  </div>
);

export const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);
  const togglePricingPeriod = (value: string) =>
    setIsYearly(parseInt(value) === 1);

  const plans: PricingCardProps[] = [
    {
      title: "Basic",
      monthlyPrice: 10,
      description: "To try our product for free",
      features: ["Create 1 product", "Get 10 reviews"],
      children: (
        <Link
          href="/api/auth/signin"
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            "w-full"
          )}
        >
          Sign In
        </Link>
      ),
    },
    {
      title: "Pro",
      monthlyPrice: 25,
      description:
        "Perfect for businessess that want to grow with the best review experience",
      features: [
        "Create unlimited products",
        "Get unlimited reviews",
        "Customize your review page",
        "Customize your review color",
        "Get a 'Wall of reviews'   ",
      ],
      popular: true,
      children: (
        <Button className="w-full" size="lg">
          Grap it
        </Button>
      ),
    },
  ];
  return (
    <div className="py-8">
      <PricingHeader
        title="Pricing Plans"
        subtitle="Choose the plan that's right for you"
      />
      <section className="mt-8 flex flex-col justify-center gap-8 sm:flex-row sm:flex-wrap">
        {plans.map((plan) => {
          return <PricingCard key={plan.title} {...plan} />;
        })}
      </section>
    </div>
  );
};
