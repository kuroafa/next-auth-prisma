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
    // <div>
    //   <div className="w-full min-w-[150px] max-w-[400px]">
    //     <SearchClient clientData={fetchClients} />
    //   </div>
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-[30px]">
    //     {fetchClients.map((client, index) => {
    //       return (
    //         <div
    //           key={client.id}
    //           className="flex gap-2 justify-center items-center p-4 rounded-lg w-full"
    //         >
    //           <ClientCard clientData={client} key={client.id} />
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>

    <>
      <SearchClient clientData={fetchClients} />
    </>
  );
};

export default page;
