"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Client } from "@prisma/client";
import ClientCard from "./dashboard/components/ClientCard";
import { Search } from "lucide-react";

type Props = {
  clientData: Client[{}];
};

const SearchClient = ({ clientData }: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredClients, setFilteredClients] = useState<[]>([]);

  useEffect(() => {
    const filteredData = clientData.filter((client: any) => {
      const name = client.name;
      return name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const timer = setTimeout(() => {
      setFilteredClients(filteredData);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, clientData]);

  return (
    <div className="mt-4">
      <div className="w-full min-w-[150px] lg:max-w-[400px]">
        <h2 className="font-semibold mb-1">Search Client</h2>
        <div className="relative h-fit">
          <Input
            type="search"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="pl-9 text-lg py-5 w-full"
          />
          <Search className="absolute top-2 left-2 " />
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-[30px]">
        {filteredClients.map((client, index) => {
          return <ClientCard clientData={client} key={client.id} />;
        })}
      </div>
    </div>
  );
};

export default SearchClient;
