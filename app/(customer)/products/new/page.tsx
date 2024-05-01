import { LayoutTitle, LayoutWrapper } from "@/features/layout/layaout-wrapper";
import type { PageParams } from "@/types/next";
import { ProductForm } from "../[productId]/edit/ProductForm";
import { requiredCurrentUser } from "@/auth/current-user";
import { User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { AlertTriangle } from "lucide-react";
import { PricingSection } from "@/features/landing/PricingSection";

export default async function RoutePage(props: PageParams<{}>) {
  const user = await requiredCurrentUser();

  const isUserAuthorized = await userIsAuthorizeToCreateProduct(user);

  if (!isUserAuthorized) {
    return (
      <LayoutWrapper>
        <LayoutTitle>Create Product</LayoutTitle>
        <p>
          {" "}
          <AlertTriangle className=" mr-2 inline" /> You need to upgrade your
          plan to create more products.
        </p>

        <PricingSection />
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <LayoutTitle>Create Product</LayoutTitle>
      <ProductForm />
    </LayoutWrapper>
  );
}

async function userIsAuthorizeToCreateProduct(user: User) {
  const NUMBER_OF_FREE_PRODUCTS = 1;
  if (user.plan === "PREMIUM") return true;

  const userProductCount = await prisma.product.count({
    where: {
      userId: user.id,
    },
  });

  if (userProductCount >= NUMBER_OF_FREE_PRODUCTS) return false;

  return true;
}
