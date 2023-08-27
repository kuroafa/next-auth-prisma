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

type Props = {
  clientData: Pick<Client, "name" | "email" | "phoneNumber" | "id">;
};

const ClientCard = ({ clientData }: Props) => {
  return (
    <Link href={`Client-Profile/${clientData.id}`} className="w-full">
      <Card className="flex">
        <CardHeader className="flex-1">
          <CardTitle className="flex gap-2 items-center whitespace-nowrap">
            <UserCircle size={50} />
            {clientData?.name.slice(0, 12)}
          </CardTitle>
          <CardDescription className="flex gap-2 whitespace-nowrap">
            Recent Client
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
        </CardHeader>
        <CardContent className="self-end ">
          <Button
            variant="secondary"
            className="hover:bg-slate-500 hover:text-white transition-all duration-200"
          >
            Contact
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ClientCard;
