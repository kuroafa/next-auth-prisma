import { Client } from "@prisma/client";
import { Card, CardContent, CardHeader } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Frown, StickyNote, Smile } from "lucide-react";
import { Book } from "lucide-react";

type Props = {
  clientData: Pick<Client, "name" | "notes" | "id" | "preApproved">;
};

const NotesCard = ({ clientData }: Props) => {
  const checkColor = clientData.preApproved ? "bg-green-600" : "bg-red-600";
  const checkText = clientData.preApproved ? <Smile /> : <Frown />;

  return (
    <Card className="flex flex-col  rounded-xl  ">
      <div className="flex justify-between items-center  p-4 gap-4">
        <Book size={30} fill="#c0c0c0" />
        <span className={`rounded-full text-white p-2 ${checkColor} `}>
          {checkText}
        </span>
      </div>
      <p className="text-lg pl-4">{clientData.notes}</p>
      <Link
        className="flex items-center gap-1 p-4 w-fit"
        href={`Client-Profile/${clientData.id}`}
      >
        <h2 className="text-[17px]  font-semibold">
          <span className="font-light">{clientData.name}</span>
        </h2>
        <ArrowUpRight size={35} strokeWidth={1} />
      </Link>
    </Card>
  );
};

export default NotesCard;
