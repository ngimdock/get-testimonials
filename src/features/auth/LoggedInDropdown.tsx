"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PropsWithChildren } from "react";
import { signOutAction } from "./auth.action";
import { LogOut } from "lucide-react";

export type LoggedInDropdownProps = PropsWithChildren;

export const LoggedInDropdown = ({ children }: LoggedInDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={async () => {
            signOutAction();
          }}
        >
          <LogOut size={16} className="mr-2" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
