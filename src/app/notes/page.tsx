import React from "react";
import { getAuthSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import SignInButton from "@/components/SignInButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import UserAccountNav from "@/components/UserAccountNav";

type Props = {};

const pages = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return (
    <div>
      <div className="flex items-center justify-between w-full gap-4 absolute xl:right-5 lg:right-5 md:right-20 right-20 top-7 ">
        <div className="lg:ml-[230px] ml-[100px] ">
          <h2 className="font-semibold text-[15px]">
            Welcome, {session?.user.name}
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

export default pages;
