import React from "react";
import ClientForm from "@/components/forms/ClientForm";

import { getAuthSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";

type Props = {
  user: string;
};

export const metadata = {
  title: "Add Client",
};

const page = async (props: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  return (
    <div className="w-full xl:ml-0 ">
      <h1 className="text-2xl font-semibold mb-4">Add New Client</h1>
      <ClientForm />
    </div>
  );
};

export default page;
