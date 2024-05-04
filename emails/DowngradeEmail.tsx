import * as React from "react";
import { EmailLayout } from "./EmailLayout";
import { Text } from "./Text";
import { Button } from "./Button";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const DowngradeEmail = () => {
  return (
    <EmailLayout key="You created your first product !">
      <Text>Hi,</Text>
      <Text>
        We are so sad to see you go. You are now downgraded to the free plan.
      </Text>
      <Text>
        Your actual reated products can still be used, but you are limited to
        100 reviews in total.
      </Text>
      <p className=" text-xs">Ngimdock Zemfack, creator of get-testimonials</p>
    </EmailLayout>
  );
};

export default DowngradeEmail;
