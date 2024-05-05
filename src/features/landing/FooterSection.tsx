import React from "react";
import { SectionLayout } from "./SectionLayout";
import { AppButton } from "./LeandingHeader";

export const FooterSection = () => {
  return (
    <SectionLayout>
      <footer className="m-4 rounded-lg">
        <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm  text-muted-foreground sm:text-center">
            © 2023{" "}
            <a href="https://get-testimonials.com/" className="hover:underline">
              GetTestimonials
            </a>
            . All Rights Reserved.
          </span>
          <ul className="mt-3 flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground sm:mt-0">
            <li>
              <a href="#features" className="me-4 hover:underline md:me-6">
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:underline">
                Pricing
              </a>
            </li>
            <AppButton />
          </ul>
        </div>
      </footer>
    </SectionLayout>
  );
};
