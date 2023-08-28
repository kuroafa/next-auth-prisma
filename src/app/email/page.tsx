import React from "react";
import { getAuthSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import SignInButton from "@/components/navbar/SignInButton";
import { ThemeToggle } from "@/components/navbar/ThemeToggle";
import UserAccountNav from "@/components/navbar/UserAccountNav";
import SearchEmail from "@/components/SearchEmail";
import { prisma } from "@/lib/db";

type Props = {
  email: string;
  id: string;
};

const page = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  const fetchClientEmails = await prisma.client.findMany({
    where: {},
  });
  return <>
    <SearchEmail clientData={fetchClientEmails}  />
  </>;
};

export default page;
