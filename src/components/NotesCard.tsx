import { Client } from "@prisma/client";
import { Card, CardContent, CardHeader } from "./ui/card";
import Image from "next/image";
import Link from "next/link";

type Props = {
  clientData: Pick<Client, "name" | "notes" | "id">;
};

const NotesCard = ({ clientData }: Props) => {
  return (
    <div className=" flex flex-col bg-slate-400">
      
       <div className="flex items-center">
         
            <Image src="/pin.png" alt="pin image" width={40} height={40} />
            <Link href={`Client-Profile/${clientData.id}`}>
              <h2 className="">{clientData.name}</h2>
            </Link>
       </div>
        
        <p>{clientData.notes}</p>
      
    </div>
  );
};

export default NotesCard;
