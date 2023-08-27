import { Button } from "@/components/ui/button";
import Link, { LinkProps } from "next/link";
import React from "react";
import ClientCard from "../components/ClientCard";
import { ArrowUpRight, MoveRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";

type Props = {};

const ClientsSection = async (props: Props) => {
  const session = await getAuthSession();

  const fetchClients = await prisma.client.findMany({
    where: {
      userId: session?.user.id,
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
          <Link href="/add-client">
            <Button>New Client</Button>
          </Link>
        </div>
        <div className="flex flex-col gap-4 items-start w-full">
          {fetchClients.map(
            (clients, idx) =>
              idx < 3 && <ClientCard key={clients.id} clientData={clients} />
          )}
        </div>
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
      </div>
    </div>
  );
};

export default ClientsSection;
