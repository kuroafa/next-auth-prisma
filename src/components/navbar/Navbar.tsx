import { getAuthSession } from "@/lib/next-auth";
import Link from "next/link";
import React from "react";
import SignInButton from "./SignInButton";
import UserAccountNav from "./UserAccountNav";
import { ThemeToggle } from "./ThemeToggle";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession();

  return (
    <div className="flex justify-end inset-x-0 z-[10] h-fit p-5">
      <div className="flex items-center justify-between w-[98%] gap-4 absolute xl:right-5 lg:right-5 md:right-20 right-20 top-7">
        <div className="lg:ml-[230px] ml-[100px] ">
          <h2 className="font-semibold text-[15px]">
            {session?.user ? `Welcome, ${session?.user.name}` : null}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle className="relative" />
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <SignInButton text="Sign In" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
