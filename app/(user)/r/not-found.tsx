"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInButton } from "@/features/auth/SignInButton";
import { LayoutWrapper } from "@/features/layout/layaout-wrapper";
import type { ErrorParams } from "@/types/next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function RouteError({ reset }: ErrorParams) {
  return (
    <LayoutWrapper>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Product not found</CardTitle>
          <CardDescription>
            The review may deleted or you don't have permission to view it
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link
            href="/"
            className={cn(
              buttonVariants({
                variant: "outline",
              })
            )}
          >
            Back to home
          </Link>
        </CardFooter>
      </Card>
    </LayoutWrapper>
  );
}
