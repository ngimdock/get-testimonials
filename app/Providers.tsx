import { ThemeProvider } from "@/features/theme/ThemeProvider";
import type { PropsWithChildren } from "react";
import { Toaster } from "sonner";

export type ProvidersProps = PropsWithChildren;

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster />
      {children}
    </ThemeProvider>
  );
};
