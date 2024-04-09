import { LayoutWrapper } from "@/features/layout/layaout-wrapper";
import type { PageParams } from "@/types/next";

export default async function RoutePage(
  props: PageParams<{ productId: string }>
) {
  return (
    <LayoutWrapper>
      <div>{props.params.productId}</div>
    </LayoutWrapper>
  );
}
