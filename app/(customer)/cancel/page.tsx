import { buttonVariants } from "@/components/ui/button";
import { LayoutTitle, LayoutWrapper } from "@/features/layout/layaout-wrapper";
import type { PageParams } from "@/types/next";
import Link from "next/link";

export default async function RoutePage(props: PageParams<{}>) {
  return (
    <LayoutWrapper>
      <LayoutTitle>Ohh... it's seems the payment has been canceled</LayoutTitle>

      <div className="flex gap-4">
        <Link
          href="/"
          className={buttonVariants({ size: "lg", variant: "outline" })}
        >
          Back to home
        </Link>
        <Link
          href="mailto:zemfackngimdock@gamil.com"
          className={buttonVariants({ size: "lg" })}
        >
          Contact help
        </Link>
      </div>
    </LayoutWrapper>
  );
}
