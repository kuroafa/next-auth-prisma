import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { TfiArrowRight } from "react-icons/tfi";
import { ArrowUpRight, UserCircle } from "lucide-react";
import { Phone, Mail } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card";
import { Button } from "../../ui/button";
import { Client } from "@prisma/client";
import Link from "next/link";
import DeleteClient from "@/components/DeleteClient";

type Props = {
  clientData: Pick<Client, "name" | "email" | "phoneNumber" | "id">;
};

const ClientCard = ({ clientData }: Props) => {
  return (
    <Card className=" flex flex-col gap-1 p-4 w-[350px]">
      <div className="flex items-center justify-between mb-3">
        <UserCircle size={35} />
        <Link href={`/Client-Profile/${clientData.id}`}>
          <ArrowUpRight size={35} strokeWidth={1} />
        </Link>
      </div>
      <h2 className="font-semibold">New Client</h2>

      <CardTitle>
        <h2 className="flex text-xl font-bold gap-2 items-center">
          {clientData.name}
        </h2>
      </CardTitle>

      {/* <CardDescription className="flex gap-2">
        <HoverCard>
          <HoverCardTrigger>
            <Mail
              size={20}
              className="hover:cursor-pointer hover:text-black transition-text duration-200"
            />
          </HoverCardTrigger>
          <HoverCardContent>
            {clientData.email ? clientData.email : "No Email Found"}
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger>
            <Phone
              size={20}
              className="hover:cursor-pointer hover:text-black transition-text duration-200"
            />
          </HoverCardTrigger>
          <HoverCardContent>
            {clientData.phoneNumber
              ? clientData.phoneNumber
              : "No Phone Number Found"}
          </HoverCardContent>
        </HoverCard>
      </CardDescription> */}
    </Card>
  );
};

export default ClientCard;

{
  /* <CardHeader className=" font-semibold">
<div className=" flex justify-end  ">
  <DeleteClient id={clientData.id} />
</div>
  <div className="mb-10">
    <UserCircle size={40} />
  </div>
  New Client
  <Link href={`/Client-Profile/${clientData.id}`}>
    <CardTitle>
      <h2 className="flex text-xl gap-2 items-center">
        {clientData.name}
      </h2>
    </CardTitle>
  </Link>
  <CardDescription className="flex gap-2">
    <HoverCard>
      <HoverCardTrigger>
        <Mail
          size={20}
          className="hover:cursor-pointer hover:text-black transition-text duration-200"
        />
      </HoverCardTrigger>
      <HoverCardContent>
        {clientData.email ? clientData.email : "No Email Found"}
      </HoverCardContent>
    </HoverCard>
    <HoverCard>
      <HoverCardTrigger>
        <Phone
          size={20}
          className="hover:cursor-pointer hover:text-black transition-text duration-200"
        />
      </HoverCardTrigger>
      <HoverCardContent>
        {clientData.phoneNumber
          ? clientData.phoneNumber
          : "No Phone Number Found"}
      </HoverCardContent>
    </HoverCard>
  </CardDescription>
</CardHeader> */
}
