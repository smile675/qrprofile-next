"use client";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { FaUser } from "react-icons/fa";
// import { useCurrentUser } from "@/hooks/useCurrentUser"
import { LogOutButton } from "./logout-button";
import { LogOut } from "lucide-react";
import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import LoginButton from "./loginButton";
import { User } from "next-auth";
import { useSession } from "next-auth/react";

export const UserButton = () => {
  // const user = useCurrentUser()
  // const user =  useCurrentUser()
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) {
    return <LoginButton>Log in</LoginButton>;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={user?.image || ""}
            height={32}
            width={32}
            className="rounded-full"
          />
          <AvatarFallback>
            <FaUser />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 shadow-md p-2 bg-white" align="end">
        <DropdownMenuLabel>Hi, {user?.name}</DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span>My Account</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center">
          <LogOut className="mr-2 h-4 w-4" />
          <LogOutButton>Log out</LogOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  // return (
  //   <LoginButton>login</LoginButton>
  // )
};
