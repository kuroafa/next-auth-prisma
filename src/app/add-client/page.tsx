import Modal from "@/components/Modal";
import React from "react";
import ClientForm from "@/components/ClientForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import UserAccountNav from "@/components/UserAccountNav";
import SignInButton from "@/components/SignInButton";
import { getAuthSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";

type Props = {
  user: string;
};

const page = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  return (
    <div className="w-full lg:ml-[250px] ml-[0]">
      <div className="absolute top-[100px] lg:left-[210px] left-[20px]">
        <h1 className="text-5xl font-semibold">Add New Client</h1>
        <ClientForm />
      </div>
    </div>
  );
};

export default page;
