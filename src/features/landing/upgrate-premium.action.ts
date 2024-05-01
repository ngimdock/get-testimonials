"use server";

import { env } from "@/env";
import {
  GET_TESTIMONIALS_STRIPE_ID_DEV,
  GET_TESTIMONIALS_STRIPE_ID_PROD,
} from "@/utils/constants";
import { ActionError, userAction } from "@/lib/safe-actions";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getServerUrl } from "@/utils/server-url";

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
      success_url: `${getServerUrl()}/success`,
      cancel_url: `${getServerUrl()}/cancel`,
      line_items: [
        {
          price:
            env.NODE_ENV === "development"
              ? GET_TESTIMONIALS_STRIPE_ID_DEV
              : GET_TESTIMONIALS_STRIPE_ID_PROD,
          quantity: 1,
        },
      ],
    });

    if (!stripeCheckout.url)
      throw new ActionError("Failed to create checkout session");

    redirect(stripeCheckout.url);
  }
);
