import * as React from "react";
import { EmailLayout } from "./EmailLayout";
import { Text } from "./Text";
import { Button } from "./Button";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const PremiumEmail = () => {
  return (
    <EmailLayout key="You created your first product !">
      <Text>Hi, welcome to Premium users !</Text>
      <Text>You can now crate infinite products</Text>
      <Button href={`${baseUrl}/products/new`}>Create a product</Button>
      <p className=" text-xs">Best regards,</p>
      <p className=" text-xs">Ngimdock Zemfack, creator of get-testimonials</p>
    </EmailLayout>
  );
};

export default PremiumEmail;
