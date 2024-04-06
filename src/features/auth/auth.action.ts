"use server";

import { signIn, signOut } from "@/auth/auth";

export const signOutAction = async () => {
  await signOut();
};

export const signInAction = async () => {
  await signIn();
};
