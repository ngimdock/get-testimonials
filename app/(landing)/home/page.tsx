import { CTASection } from "@/features/landing/CTASection";
import { FAQSection } from "@/features/landing/FAQSection";
import { FeaturesSection } from "@/features/landing/FeaturesSection";
import { FooterSection } from "@/features/landing/FooterSection";
import { HeroSection } from "@/features/landing/HeroSection";
import { LeandingHeader } from "@/features/landing/LeandingHeader";
import { PricingSection } from "@/features/landing/PricingSection";
import { ProblemsSection } from "@/features/landing/ProblemsSection";

export default function Home() {
  return (
    <main className="flex flex-col gap-4">
      <div className="h-16" />
      <LeandingHeader />
      <HeroSection />
      <FeaturesSection />
      <ProblemsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />

      <FooterSection />
    </main>
  );
}
