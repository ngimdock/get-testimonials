"use client";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInButton } from "@/features/auth/SignInButton";
import { LayoutWrapper } from "@/features/layout/layaout-wrapper";
import type { ErrorParams } from "@/types/next";

export default function RouteError({ reset }: ErrorParams) {
  return (
    <LayoutWrapper>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>
            Sorry, you need to be logged in to view this page.
          </CardTitle>
        </CardHeader>
        <CardFooter>
          <SignInButton />
        </CardFooter>
      </Card>
    </LayoutWrapper>
  );
}
