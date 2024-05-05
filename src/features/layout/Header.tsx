import Image from "next/image";
import { LoggedInButton } from "../auth/LoggedInButton";
import { LayoutWrapper } from "./layaout-wrapper";
import { ModeToggle } from "../theme/ModeToggle";
import Link from "next/link";

export const Header = async () => {
  return (
    <header className="w-full border-b border-border py-4">
      <LayoutWrapper className="flex flex-row items-center gap-4 py-0">
        <Link href="/" className="flex-1">
          <Image
            src="/logo/logo.png"
            width={32}
            height={32}
            alt="Get testimonials logo"
          />
        </Link>

        <div className="flex items-center gap-x-2 ">
          <ModeToggle />
          <LoggedInButton />
        </div>
      </LayoutWrapper>
    </header>
  );
};
