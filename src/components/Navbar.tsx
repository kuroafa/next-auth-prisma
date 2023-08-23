import { getAuthSession } from "@/lib/next-auth";
import Link from "next/link";
import React from "react";
import SignInButton from "./SignInButton";
import UserAccountNav from "./UserAccountNav";
import { ThemeToggle } from "./ThemeToggle";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession();
  //   if(session?.user){

  //       return <pre>{JSON.stringify(session.user, null, 2)}</pre>
  //   } else {
  //       return <h1>Not signed in</h1>
  //   }
  return (
    <div className="fixed flex justify-end inset-x-0 top-0   z-[10] h-fit   p-5">
      <div className="flex items-center gap-1">
        <ThemeToggle className="mr-2" />
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
