import { Header } from "@/features/layout/Header";
import { LayoutParams } from "@/types/next";

export default async function RouteLayout({ children }: LayoutParams<{}>) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
