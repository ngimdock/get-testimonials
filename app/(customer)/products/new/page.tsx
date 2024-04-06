import { LayoutTitle, LayoutWrapper } from "@/features/layout/layaout-wrapper";
import type { PageParams } from "@/types/next";
import { ProductForm } from "../[productId]/edit/ProductForm";

export default async function RoutePage(props: PageParams<{}>) {
  return (
    <LayoutWrapper>
      <LayoutTitle>Create Product</LayoutTitle>
      <ProductForm />
    </LayoutWrapper>
  );
}
