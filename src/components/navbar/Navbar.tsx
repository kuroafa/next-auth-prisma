import { getAuthSession } from "@/lib/next-auth";
import React from "react";
import SignInButton from "./SignInButton";
import UserAccountNav from "./UserAccountNav";
import { ThemeToggle } from "./ThemeToggle";
import { CalendarPlus, UserPlus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import QuickActions from "./QuickActions";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession();

  return (
    <div className="flex items-center justify-between w-[calc(100%-50px)] gap-4 absolute xl:right-5 lg:right-5 md:right-20 right-20 top-6 h-fit  ">
      <div className="lg:ml-[220px] ml-[100px]">
        <h2 className="font-semibold text-base hidden lg:block">
          {session?.user ? `Welcome, ${session?.user.name}` : null}
        </h2>
      </div>
      <div className="flex items-center gap-3">
        {session?.user ? <QuickActions /> : null}

        <ThemeToggle className="relative" />
        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <SignInButton text="Sign In" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
