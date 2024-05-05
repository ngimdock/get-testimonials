import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { SectionLayout } from "./SectionLayout";

export const CTASection = () => {
  return (
    <SectionLayout>
      <Card className="flex flex-col items-center justify-center gap-4 p-12 lg:p-20">
        <h2 className="text-center text-3xl font-bold text-foreground">
          Get started today
        </h2>

        <Link className={buttonVariants({ size: "lg" })} href="#pricing">
          Start now
        </Link>
      </Card>
    </SectionLayout>
  );
};
