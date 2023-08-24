import React from "react";
import { getAuthSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import SignInButton from "@/components/navbar/SignInButton";
import { ThemeToggle } from "@/components/navbar/ThemeToggle";
import UserAccountNav from "@/components/navbar/UserAccountNav";

type Props = {};

const AnalyticsPage = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return <div>hi</div>;
};

export default AnalyticsPage;
