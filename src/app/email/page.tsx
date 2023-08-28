import React from "react";
import { getAuthSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";

type Props = {};

const page = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return <div className="">email</div>;
};

export default page;
