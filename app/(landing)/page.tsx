import { Button } from "@/components/ui/button";
import { LeandingHeader } from "@/features/landing/LeandingHeader";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col gap-4">
      <LeandingHeader />
    </main>
  );
}
