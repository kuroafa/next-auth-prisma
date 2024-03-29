import { Button } from "@/components/ui/button";
import Link, { LinkProps } from "next/link";
import React from "react";
import ClientCard from "../components/ClientCard";
import { ArrowUpRight, MoveRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";

type Props = {
  dashboardMode: boolean;
};

const ClientsSection = async ({ dashboardMode }: Props) => {
  const session = await getAuthSession();

  const fetchClients = await prisma.client.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });
  return (
    <div className="flex rounded-xl">
      <div className=" flex flex-col justify-start items-start gap-5  w-full">
        <div className="flex  justify-between gap-4 w-full">
          <h2 className="light:text-black text-3xl font-semibold flex items-center gap-1">
            Recent Clients
          </h2>
        </div>
        <div className="flex flex-col gap-4 items-start w-full">
          {fetchClients.length > 0 ? (
            fetchClients.map(
              (clients, idx) =>
                idx < 3 && (
                  <ClientCard
                    dashboardMode={dashboardMode}
                    key={clients.id}
                    clientData={clients}
                  />
                )
            )
          ) : (
            <h2>No Clients Found</h2>
          )}
        </div>
        {fetchClients.length > 0 ? (
          <Link href="/Clients">
            <div className="flex ml-2 -mt-3 flex-row-reverse items-center  gap-2 cursor-pointer ">
              <MoveRight
                size={30}
                strokeWidth={1}
                className="hover:text-gray-700"
              />
              <p className="hover:text-gray-700">View More</p>
            </div>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default ClientsSection;
