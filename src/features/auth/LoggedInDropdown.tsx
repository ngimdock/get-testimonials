"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PropsWithChildren } from "react";
import { signOutAction } from "./auth.action";
import {
  FireExtinguisher,
  Home,
  LayoutDashboard,
  LogOut,
  Square,
} from "lucide-react";
import Link from "next/link";

export type LoggedInDropdownProps = PropsWithChildren;

export const LoggedInDropdown = ({ children }: LoggedInDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/home" className="w-full">
            <Home size={16} className="mr-2" />
            Home
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="w-full">
            <LayoutDashboard size={16} className="mr-2" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/products" className="w-full">
            <Square size={16} className="mr-2" />
            Products
          </Link>
        </DropdownMenuItem>
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
