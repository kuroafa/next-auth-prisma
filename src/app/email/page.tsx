import React from "react";
import { getAuthSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import SignInButton from "@/components/navbar/SignInButton";
import { ThemeToggle } from "@/components/navbar/ThemeToggle";
import UserAccountNav from "@/components/navbar/UserAccountNav";
import SearchEmail from "@/components/SearchEmail";
import { prisma } from "@/lib/db";
import SendEmail from "@/components/SendEmail";

type Props = {};

export const metadata = {
  title: "Email | Realtor.io",
};

const page = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  const fetchClientEmails = await prisma.client.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return (
    <>
      <h1 className="text-3xl font-medium pt-3">Email Clients</h1>
      <SendEmail clientData={fetchClientEmails} />
    </>
  );
};

export default page;
