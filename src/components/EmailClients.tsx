"use client";

import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import EmailCard from "./EmailCard";
import { Client } from "@prisma/client";

type Props = {
  clientData: Client[];
  handleAutoFill: (email: any, name: string) => void;
};

const EmailClients = ({ clientData, handleAutoFill }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmails, setFilteredEmails] = useState<Client[]>([]);

  useEffect(() => {
    const filteredData = clientData.filter((client) => {
      const name = client.name;
      return name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    const timer = setTimeout(() => {
      setFilteredEmails(filteredData);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, clientData]);

  return (
    <>
      <Card className="p-4 light:bg-slate-100 w-full md:max-w-[430px] hidden md:block">
        <div className="relative">
          <Input
            type="search"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="pl-9 py-5 w-full mb-4"
            placeholder="Search client"
          />
          <Search className="absolute top-2 left-2 " />
        </div>
        <h1 className="text-xl tracking-wide mb-2 ml-1">
          {searchQuery ? "Search Results..." : "All Clients"}
        </h1>
        <div className="overflow-auto max-h-[600px] flex flex-col gap-4 no-scrollbar rounded-xl">
          {filteredEmails.map((email, idx) => (
            <EmailCard
              clientData={email}
              key={email.id}
              handleAutoFill={handleAutoFill}
            />
          ))}
        </div>
      </Card>
    </>
  );
};

export default EmailClients;
