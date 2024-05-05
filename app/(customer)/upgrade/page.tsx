import { LayoutTitle, LayoutWrapper } from "@/features/layout/layaout-wrapper";
import type { PageParams } from "@/types/next";
import { requiredCurrentUser } from "@/auth/current-user";
import { AlertTriangle } from "lucide-react";
import { PricingSection } from "@/features/landing/PricingSection";
import { redirect } from "next/navigation";

export default async function RoutePage(props: PageParams<{}>) {
  const user = await requiredCurrentUser();

  if (user.plan === "PREMIUM") redirect("/dashboard");

  return (
    <LayoutWrapper>
      <LayoutTitle>Upgrade</LayoutTitle>
      <p>
        <AlertTriangle className=" mr-2 inline" /> You need to upgrade your plan
        to create more products.
      </p>

      <PricingSection />
    </LayoutWrapper>
  );
}
