import { Client } from "@prisma/client";
import Link from "next/link";


type Props = {
  clientData: Pick<Client, "email" | "name" | "id">;
  onEmailClick: (email: any) => void;
};

const EmailCard = ({ clientData, onEmailClick }: Props) => {
  const handleEmailClick = () => {
    onEmailClick(clientData.email); 
  };

  return (
    <div className="font p-4 flex flex-col gap-1">
      <Link href={`Client-Profile/${clientData.id}`}>
          <h1 className="font-medium text-xl">
            Client name: {clientData?.name}
          </h1>
      </Link>
      <button className="w-fit bg-gray-500 p-2 rounded text-white font-semibold " onClick={handleEmailClick}>Add Email</button>
    </div>
  );
};

export default EmailCard;

