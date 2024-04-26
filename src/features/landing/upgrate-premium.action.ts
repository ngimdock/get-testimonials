"use server";

import { env } from "@/env";
import { ActionError, userAction } from "@/lib/safe-actions";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { z } from "zod";

export const upgrateToPremiumAction = userAction(
  z.string(), // Pass a schema a no need to use
  async (_, { user }) => {
    const stripeCustomerId = user?.stripeCustomerId;

    if (!stripeCustomerId)
      throw new ActionError("User does not have a stripe customer id");

    const stripeCheckout = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: "subscription",
      payment_method_types: ["card", "link"],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
      line_items: [
        {
          price:
            env.NODE_ENV === "development"
              ? "price_1P9rdHLDSiiDbLlSnP4WAIaE"
              : "",
          quantity: 1,
        },
      ],
    });

    if (!stripeCheckout.url)
      throw new ActionError("Failed to create checkout session");

    redirect(stripeCheckout.url);
  }
);
