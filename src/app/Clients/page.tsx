import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

const page = async ({ firstName, lastName, email, phoneNumber, id }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }

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
      <div className="flex flex-wrap  mt-[30px]">
        {fetchClients.map((client, index) => {
          return (
            <div
              key={client.id}
              className=" bg-slate-400 flex gap-2 justify-center items-center p-4 rounded-lg "
            >
              <h2>
                {client.firstName} {client.lastName}
              </h2>

              <Link href={`/Client-Profile/${client.id}`}>
                <Button>Client Profile</Button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
