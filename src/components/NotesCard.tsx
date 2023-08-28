import { Client } from "@prisma/client";
import { Card, CardContent, CardHeader } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Props = {
  clientData: Pick<Client, "name" | "notes" | "id" | "preApproved">;
};

const NotesCard = ({ clientData }: Props) => {
  return (
    <Card className="flex flex-col  rounded-xl  ">
      <div className="flex justify-between items-center  p-4 gap-4">
        <Image src="/cardPin.png" alt="pin image" width={25} height={40} />
        {clientData.preApproved ? <span className="rounded-full text-white bg-green-600 p-2">Pre-Approved</span> : <span className="rounded-full p-2 text-white bg-red-600 ">Not Pre-Approved</span>}
      </div>
      <p className="text-lg pl-4">{clientData.notes}</p>
      <Link
        className="flex items-center gap-1 p-4 w-fit"
        href={`Client-Profile/${clientData.id}`}
      >
        <h2 className="text-[17px]  font-semibold">
          CLIENT NAME - <span className="font-light">{clientData.name}</span>
        </h2>
        <ArrowUpRight size={35} strokeWidth={1} />
      </Link>
    </Card>
  );
};

export default NotesCard;
