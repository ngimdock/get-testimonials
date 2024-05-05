import { Button } from "@/components/ui/button";
import { FeaturesSection } from "@/features/landing/FeaturesSection";
import { HeroSection } from "@/features/landing/HeroSection";
import { LeandingHeader } from "@/features/landing/LeandingHeader";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col gap-4">
      <div className="h-16" />
      <LeandingHeader />
      <HeroSection />
      <FeaturesSection />
    </main>
  );
}
