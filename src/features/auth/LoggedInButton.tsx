import { auth } from "@/auth/auth";
import { Button } from "@/components/ui/button";
import { SignInButton } from "./SignInButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoggedInDropdown } from "./LoggedInDropdown";

export const LoggedInButton = async () => {
  const session = await auth();

  if (!session?.user) return <SignInButton />;

  return (
    <LoggedInDropdown>
      <Button variant="outline" size="sm">
        <Avatar className="size-6">
          <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
          {session.user.image && (
            <AvatarImage
              src={session.user.image}
              alt={`${session.user.name} - Avatar`}
            />
          )}
        </Avatar>
      </Button>
    </LoggedInDropdown>
  );
};
