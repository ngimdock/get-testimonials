import { requiredCurrentUser } from "@/auth/current-user";
import { buttonVariants } from "@/components/ui/button";
import { LayoutTitle, LayoutWrapper } from "@/features/layout/layaout-wrapper";
import type { PageParams } from "@/types/next";
import Link from "next/link";

export default async function RoutePage(props: PageParams<{}>) {
  return (
    <LayoutWrapper>
      <LayoutTitle>Yeah ! You are now a premium user</LayoutTitle>
      <div className="flex gap-4">
        <Link
          href="/products"
          className={buttonVariants({ size: "lg", variant: "secondary" })}
        >
          Go to products
        </Link>
        <Link href="/products/new" className={buttonVariants({ size: "lg" })}>
          Create a product
        </Link>
      </div>
    </LayoutWrapper>
  );
}
