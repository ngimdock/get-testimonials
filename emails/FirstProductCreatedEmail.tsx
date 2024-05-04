import * as React from "react";
import { EmailLayout } from "./EmailLayout";
import { Text } from "./Text";
import { Button } from "./Button";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const FirstProductCreatedEmail = ({
  product,
  productSlug,
}: {
  product: string;
  productSlug: string;
}) => {
  return (
    <EmailLayout key="You created your first product !">
      <Text>
        {`Hi, you just created your first product ${product} on get-testimonials.com`}
      </Text>
      <Text>So nice, you can now share the review url:</Text>
      <Button href={`${baseUrl}/r/${productSlug}`}>Share review URL</Button>

      <Text>
        If you want to create more products, consider upgrating to our premium
        plan.
      </Text>
      <Button href={`${baseUrl}/upgrade`}>Upgrade to premium</Button>
      <p className=" text-xs">Best regards,</p>
      <p className=" text-xs">
        Ngimdock Zemfack, creator of{" "}
        <a href="https://get-testimonials.com">get-testimonials.com</a>
      </p>
    </EmailLayout>
  );
};

FirstProductCreatedEmail.PreviewProps = {
  product: "Product name",
  productSlug: "product-slug",
};

export default FirstProductCreatedEmail;
