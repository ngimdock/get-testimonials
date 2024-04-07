import { LayoutTitle, LayoutWrapper } from "@/features/layout/layaout-wrapper";
import type { PageParams } from "@/types/next";
import { ProductForm } from "./ProductForm";
import { requiredCurrentUser } from "@/auth/current-user";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function RoutePage(
  props: PageParams<{
    productId: string;
  }>
) {
  const user = await requiredCurrentUser();

  const product = await prisma.product.findUnique({
    where: {
      id: props.params.productId,
      userId: user.id,
    },
  });

  if (!product) return notFound();

  return (
    <LayoutWrapper>
      <LayoutTitle>Create Product</LayoutTitle>
      <ProductForm defaultValues={product} />
    </LayoutWrapper>
  );
}
