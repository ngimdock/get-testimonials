import { env } from "@/env";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Plan } from "@prisma/client";
import { resend } from "@/lib/resend";
import { EMAIL_FROM } from "@/config";
import PremiumEmail from "../../../../emails/PremiumEmail";
import DowngradeEmail from "../../../../emails/DowngradeEmail";

export const POST = async (req: NextRequest) => {
  let body = await req.text();

  const stripeSignature = req.headers.get("stripe-signature");

  if (!stripeSignature)
    return NextResponse.json({ error: "No stripe signature" }, { status: 400 });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      stripeSignature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid stripe signature" },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutSessionCompleted(session);

      break;
    }
    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;

      await handleInvoicePaid(invoice);
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;

      await handleCustomerSubscriptionDeleted(subscription);
      break;
    }

    // handle the case for failed invoice
  }

  return NextResponse.json({ received: true });
};

const handleCheckoutSessionCompleted = async (
  session: Stripe.Checkout.Session
) => {
  //@TODO check if the priceId in the checkout session corresponds to the buyed product before change user plan

  const customerId = session.customer as string;

  const user = await prisma.user.findFirst({
    where: {
      stripeCustomerId: customerId,
    },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  await changeUserPlan(user.id, "PREMIUM");

  await resend.emails.send({
    from: EMAIL_FROM,
    to: user.email ?? "",
    subject: "Your are now premium user",
    react: PremiumEmail(),
  });
};

const handleInvoicePaid = async (invoice: Stripe.Invoice) => {
  //@TODO check if the priceId in the invoice corresponds to the buyed product before change user plan

  const customerId = invoice.customer as string;

  const user = await prisma.user.findFirst({
    where: {
      stripeCustomerId: customerId,
    },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  await changeUserPlan(user.id, "PREMIUM");
};

const handleCustomerSubscriptionDeleted = async (
  subscription: Stripe.Subscription
) => {
  const customerId = subscription.customer as string;

  const user = await prisma.user.findFirst({
    where: {
      stripeCustomerId: customerId,
    },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  await changeUserPlan(user.id, "FREE");

  await resend.emails.send({
    from: EMAIL_FROM,
    to: user.email ?? "",
    subject: "You are not premium user anymore",
    react: DowngradeEmail(),
  });
};

async function changeUserPlan(userId: string, plan: Plan) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      plan,
    },
  });
}
