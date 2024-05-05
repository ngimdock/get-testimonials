import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  id?: string;
  className?: string;
  sectionClassName?: string;
}>;

export const SectionLayout = ({
  children,
  id,
  className,
  sectionClassName,
}: Props) => {
  return (
    <section id={id} className={sectionClassName}>
      <section
        className={cn(
          "mx-auto max-w-screen-xl px-4 py-8 lg:px-12 lg:py-16",
          className
        )}
      >
        {children}
      </section>
    </section>
  );
};
