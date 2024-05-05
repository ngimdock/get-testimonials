import { requiredCurrentUser } from "@/auth/current-user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LayoutDescription,
  LayoutTitle,
  LayoutWrapper,
} from "@/features/layout/layaout-wrapper";
import { prisma } from "@/lib/prisma";
import type { PageParams } from "@/types/next";
import { ReviewCard } from "../wall/[slug]/ReviewCard";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle } from "@/components/ui/alert";

export default async function Page(props: PageParams<{}>) {
  const user = await requiredCurrentUser();

  const productsCount = await prisma.product.count({
    where: {
      userId: user.id,
    },
  });

  const reviewCount = await prisma.review.count({
    where: {
      product: {
        userId: user.id,
      },
    },
  });

  const lastReview = await prisma.review.findFirst({
    where: {
      product: {
        userId: user.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <LayoutWrapper>
      <div>
        <LayoutTitle>Dashboard</LayoutTitle>
        <LayoutDescription>Welcome back, {user.name}</LayoutDescription>
      </div>

      <div className="flex flex-wrap items-start gap-4">
        <Card className="min-w-52">
          <CardHeader>
            <CardDescription>Products</CardDescription>
            <CardTitle>{productsCount}</CardTitle>
          </CardHeader>
        </Card>

        <Card className="min-w-52">
          <CardHeader>
            <CardDescription>Reviews</CardDescription>
            <CardTitle>{reviewCount}</CardTitle>
          </CardHeader>
        </Card>

        <Card className="min-w-52">
          <CardHeader>
            <CardTitle>Last review</CardTitle>
          </CardHeader>
          <CardContent>
            {lastReview ? <ReviewCard review={lastReview} /> : "No reviews yet"}
          </CardContent>
        </Card>

        <Card className="min-w-52">
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Link
              href="/products/new"
              className={buttonVariants({ size: "lg" })}
            >
              Create Product
            </Link>
          </CardContent>
        </Card>

        <Card className="min-w-52">
          <CardHeader>
            <CardTitle>Plan</CardTitle>
            <CardDescription>
              {user.plan === "FREE" ? "Free" : "Pro"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <h4>Max {user.plan === "FREE" ? "1" : "Infinity"} products</h4>
              <Progress value={(productsCount * 100) / 1} />
            </div>
            <div>
              <h4>Max {user.plan === "FREE" ? "100" : "Infinity"} reviews</h4>
              <Progress value={(reviewCount * 100) / 100} />
            </div>

            {user.plan === "FREE" &&
              (productsCount === 1 || reviewCount === 100) && (
                <Alert>
                  <AlertTitle>
                    Upgrade to get unlimited products and reviews.
                  </AlertTitle>
                  <Link
                    href="/upgrade"
                    className={buttonVariants({ size: "sm" })}
                  >
                    Upgrade
                  </Link>
                </Alert>
              )}
          </CardContent>
        </Card>
      </div>
    </LayoutWrapper>
  );
}
