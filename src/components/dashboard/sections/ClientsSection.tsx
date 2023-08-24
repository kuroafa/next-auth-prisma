import { Button } from "@/components/ui/button";
import Link, { LinkProps } from "next/link";
import React from "react";
import ClientCard from "../components/ClientCard";
import { ArrowUpRight, MoveRight } from "lucide-react";

type Props = {};

const ClientsSection = (props: Props) => {
  const clients = [1, 2, 3, 4, 5, 6];
  return (
    <div className="flex items-center rounded-xl w-fit ">
      <div className=" flex flex-col justify-start items-start gap-5 overflow-y-auto">
        <div className="flex justify-between gap-4 w-fit">
          <h2 className="light:text-black text-3xl font-semibold flex items-center gap-1">
            Recent Clients{" "}
            <Link href="/view-more-clients">
              <ArrowUpRight size={35} strokeWidth={1} />
            </Link>
          </h2>
          <Link href="/add-client">
            <Button>Add Client</Button>
          </Link>
        </div>
        <div className=" w-fit flex gap-4 items-start flex-wrap">
          {clients.map(
            (clients, idx) =>
              idx < 4 && <ClientCard key={idx} name={clients.toString()} />
          )}
        </div>
        <Link href="/view-more-clients">
          <div className="flex ml-2 flex-row-reverse items-center  gap-2 cursor-pointer">
            <MoveRight
              size={30}
              strokeWidth={1}
              className="hover:text-gray-700"
            />
            <p className="hover:text-gray-700">View More</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ClientsSection;
