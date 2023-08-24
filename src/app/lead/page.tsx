import React from "react";
import { getAuthSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import SignInButton from "@/components/navbar/SignInButton";
import { ThemeToggle } from "@/components/navbar/ThemeToggle";
import UserAccountNav from "@/components/navbar/UserAccountNav";

type Props = {};

const page = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return (
    <div className="">
      <div className="flex items-center gap-4 absolute right-5 top-7 ">
        <ThemeToggle className="" />
        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <SignInButton text="Sign In" />
        )}
      </div>
    </div>
  );
};

export default page;
