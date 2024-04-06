import { LoggedInButton } from "../auth/LoggedInButton";

export const Header = async () => {
  return (
    <div className="flex items-center gap-4">
      <h1 className=" text-lg font-bold flex-1">get-testimonials.com</h1>
      <LoggedInButton />
    </div>
  );
};
