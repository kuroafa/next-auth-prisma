import Loading from "@/components/Loading";
import SearchClient from "@/components/SearchClient";
import ClientCard from "@/components/dashboard/components/ClientCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { Suspense, useState } from "react";

type Props = {};

const page = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }

  const fetchClients = await prisma.client.findMany({
    where: {
      // userId: session.user.id,
    },
  });

  return (
    <>
      <SearchClient clientData={fetchClients} />
    </>
  );
};

export default page;
