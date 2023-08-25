import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { TfiArrowRight } from "react-icons/tfi";
import { UserCircle } from "lucide-react";
import { Phone, Mail } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card";
import { Button } from "../../ui/button";
import { Client } from "@prisma/client";

type Props = {
  clientData: Pick<Client, 'firstName' | 'lastName' | 'email' | 'phoneNumber' >
};



const ClientCard = ({ clientData }: Props) => {
  return (
    <Card className="flex">
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <UserCircle size={30} />
          {clientData.firstName} {clientData.lastName}
        </CardTitle>
        <CardDescription className="flex gap-2">
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
              {clientData.phoneNumber ? clientData.phoneNumber : "No Phone Number Found"}
            </HoverCardContent>
          </HoverCard>
        </CardDescription>
      </CardHeader>
      <CardContent className="self-end">
        <Button
          variant="secondary"
          className="hover:bg-slate-500 hover:text-white transition-all duration-200"
        >
          Contact
        </Button>
      </CardContent>
    </Card>
  );
};

export default ClientCard;
