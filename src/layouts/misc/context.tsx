"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import React from "react";

type Props = {};

const NavContext = (props: Props) => {
  return (
    <div>
      {" "}
      <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
    </div>
  );
};

export default NavContext;
