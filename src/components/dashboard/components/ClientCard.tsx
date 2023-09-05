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
  dashboardMode?: boolean;
};

const ClientCard = ({ clientData, dashboardMode }: Props) => {
  return (
    <Card className="flex justify-between w-full">
      <CardHeader className="flex-1">
        <CardTitle className="flex gap-2 items-center ">
          <UserCircle size={50} />
          <Link href={`Client-Profile/${clientData.id}`} className="w-full">
            {clientData?.name.slice(0, 10)}
            {clientData.name.length > 10 ? "..." : null}
          </Link>
        </CardTitle>
        <CardDescription className="flex gap-2 ">
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
      <CardContent className="self-end flex-1">
        <div className="flex flex-wrap gap-2 justify-end">
          <Link href={"/email"}>
            <Button
              variant="secondary"
              className="hover:bg-slate-500 hover:text-white transition-all duration-200"
            >
              Contact
            </Button>
          </Link>
          {!dashboardMode ? <DeleteClient id={clientData.id} /> : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientCard;
