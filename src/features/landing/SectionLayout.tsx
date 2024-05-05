import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{ className?: string }>;

export const SectionLayout = ({ children, className }: Props) => {
  return (
    <section className={cn(className)}>
      <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-16">
        {children}
      </div>
    </section>
  );
};
