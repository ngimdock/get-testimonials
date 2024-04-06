import { Button } from "@/components/ui/button";
import { SignInButton } from "./SignInButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoggedInDropdown } from "./LoggedInDropdown";
import { currentUser } from "@/auth/current-user";

export const LoggedInButton = async () => {
  const user = await currentUser();

  if (!user) return <SignInButton />;

  return (
    <LoggedInDropdown>
      <Button variant="outline" size="sm">
        <Avatar className="size-6">
          <AvatarFallback>{user.name?.[0]}</AvatarFallback>
          {user.image && (
            <AvatarImage src={user.image} alt={`${user.name} - Avatar`} />
          )}
        </Avatar>
      </Button>
    </LoggedInDropdown>
  );
};
