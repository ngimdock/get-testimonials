import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Tailwind,
  Section,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const EmailLayout = ({
  children,
  preview,
}: React.PropsWithChildren<{
  preview?: string;
}>) => {
  return (
    <Tailwind>
      <Html>
        <Head />
        {preview && <Preview>Dropbox reset your password</Preview>}
        <Body
          className="bg-gray-100 p-10"
          style={{
            fontFamily:
              "-apple-system, system-ui, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, 'Fira Sans', sans-serif",
          }}
        >
          <Container className="border border-gray-200 bg-white p-6">
            <Img
              src={`${baseUrl}/logo/logo-title-color.png`}
              width="120"
              height="auto"
              alt="GET TESTIMONIALS"
            />
            <Section className="mt-6">{children}</Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};
