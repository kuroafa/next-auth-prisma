"use client";

import { Client } from "@prisma/client";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";

type Props = {
  clientData: Pick<Client, "email" | "name" | "id" | "notes">;
  handleAutoFill: (email: any, name: string) => void;
};

const EmailCard = ({ clientData, handleAutoFill }: Props) => {
  const handleEmailClick = () => {
    handleAutoFill(clientData.email, clientData.name);
  };

  return (
    <Card className="md:max-w-[400px] dark:bg-slate-800 ">
      <CardHeader>
        <CardTitle>{clientData?.name}</CardTitle>
        <CardDescription title={clientData.notes as string}>
          {clientData?.notes?.slice(0, 25)}...
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4 items-center justify-end">
        <Link href={`/Client-Profile/${clientData.id}`}>
          <Button className="w-fit p-2 rounded font-semibold ">
            View Profile
          </Button>
        </Link>
        <Button
          variant={"secondary"}
          className="w-fit p-2 rounded font-semibold dark:bg-slate-900"
          onClick={handleEmailClick}
        >
          Auto fill
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmailCard;
