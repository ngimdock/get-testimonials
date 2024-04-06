import Image from "next/image";
import { LoggedInButton } from "../auth/LoggedInButton";
import { LayoutWrapper } from "./layaout-wrapper";
import { ModeToggle } from "../theme/ModeToggle";

export const Header = async () => {
  return (
    <header className="w-full border-b border-border py-4">
      <LayoutWrapper className="flex items-center gap-4">
        <div className="flex-1">
          <Image
            src="/logo/logo.png"
            width={32}
            height={32}
            alt="Get testimonials logo"
          />
        </div>

        <div className="flex items-center gap-x-2 ">
          <ModeToggle />
          <LoggedInButton />
        </div>
      </LayoutWrapper>
    </header>
  );
};
