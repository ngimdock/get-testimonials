import { LayoutTitle, LayoutWrapper } from "@/features/layout/layaout-wrapper";
import type { PageParams } from "@/types/next";

export default async function RoutePage(props: PageParams<{}>) {
  return (
    <LayoutWrapper>
      <LayoutTitle>Products</LayoutTitle>
      <p>Hello world</p>
    </LayoutWrapper>
  );
}
