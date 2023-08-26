import { Button } from "@/components/ui/button";
import Link, { LinkProps } from "next/link";
import React from "react";
import ClientCard from "../components/ClientCard";
import { ArrowUpRight, MoveRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";

type Props = {
  name: string;
  email: string;
  phoneNumber: string;
  id: string;
};

const ClientsSection = async ({ name, email, phoneNumber, id }: Props) => {
  const session = await getAuthSession();

  const fetchClients = await prisma.client.findMany({
    where: {
      userId: session?.user.id,
    },
    take: 6,
  });
  return (
    <div className="flex  rounded-xl w-fit h-full   ">
      <div className=" flex flex-col justify-start items-start gap-5 overflow-y-auto">
        <div className="flex  justify-between gap-4 w-fit">
          <h2 className="light:text-black text-3xl font-semibold flex items-center gap-1">
            Recent Clients
            
          </h2>
          <Link href="/add-client">
            <Button>Add</Button>
          </Link>
        </div>
        <div className=" w-fit flex gap-4 items-start flex-wrap">
          {fetchClients.map(
            (clients, idx) =>
              idx < 3 && <ClientCard key={clients.id} clientData={clients} />
          )}
        </div>
        <Link href="/Clients">
          <div className="flex ml-2 flex-row-reverse items-center  gap-2 cursor-pointer">
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
