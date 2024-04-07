import { currentUser } from "@/auth/current-user";
import { createSafeActionClient } from "next-safe-action";

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ActionError";
  }
}

const handleReturnedServerError = (error: any) => {
  if (error instanceof ActionError) return error.message;

  return "And unexpected error occurred";
};

export const action = createSafeActionClient({
  handleReturnedServerError,
});

export const userAction = createSafeActionClient({
  handleReturnedServerError,
  middleware: async () => {
    const user = await currentUser();

    if (!user)
      throw new ActionError("You must be logged in to perform this action");

    return { user };
  },
});
