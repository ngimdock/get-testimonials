import type { PageParams } from "@/types/next";

export default async function RoutePage(
  props: PageParams<{ productId: string }>
) {
  return <div>Product details</div>;
}
