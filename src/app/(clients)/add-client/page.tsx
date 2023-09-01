import Modal from "@/components/Modal";
import React from "react";
import ClientForm from "@/components/forms/ClientForm";

import { getAuthSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import { ThemeToggle } from "@/components/navbar/ThemeToggle";
import UserAccountNav from "@/components/navbar/UserAccountNav";
import SignInButton from "@/components/navbar/SignInButton";

type Props = {
  user: string;
};

const page = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  return (
    <div className="w-full -ml-10 xl:ml-0 ">
      <div className=" mt-5 ">
        <h1 className="text-5xl font-semibold">Add New Client</h1>
        <ClientForm />
      </div>
      <div></div>
    </div>
  );
};

export default page;
