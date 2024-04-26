import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { env } from "../env";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export const {
  handlers,
  auth: baseAuth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  theme: {
    logo: "/logo/logo-title.png",
  },
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  events: {
    createUser: async ({ user }) => {
      console.log({ userEvent: user });

      if (!user.id || !user.email) return;

      const stripeCustomer = await stripe.customers.create({
        name: user.name ?? "",
        email: user.email ?? "",
      });

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          stripeCustomerId: stripeCustomer.id,
        },
      });
    },
  },
});
