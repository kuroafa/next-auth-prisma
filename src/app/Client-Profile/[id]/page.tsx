import { prisma } from "@/lib/db";
import React from "react";
import { redirect } from "next/navigation";
import ClientProfile from "@/components/ClientProfile";
import { getAuthSession } from "@/lib/next-auth";

type ClientProfilePageProps = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: ClientProfilePageProps) => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/");
  }

  const clientData = await prisma.client.findUnique({
    where: {
      id: id,
    },
  });

  return (
    <div className="mt-10">
      <ClientProfile clientData={clientData} />
    </div>
  );
};

export default page;
