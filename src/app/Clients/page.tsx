import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import Link from "next/link";
import React from "react";

type Props = {
    id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

const page = async ({ firstName, lastName, email, phoneNumber, id }: Props) => {
  const fetchClients = await prisma.client.findMany({
    where: {
        id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
    },
  });
  return (
    <div>
      <div className="flex flex-wrap gap-5 mt-20">
        {fetchClients.map((client, index) => {
          return (
            <div key={client.id} className=" bg-slate-400 p-4 rounded-lg ">
              <h2>
                {client.firstName} {client.lastName}
              </h2>
              <h3>{client.email}</h3>
              <h4>{client.phoneNumber}</h4>
              <Link href={`/Client-Profile/${client.id}`}>
               <Button>
                Client Profile
               </Button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
