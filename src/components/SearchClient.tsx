"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Client } from "@prisma/client";
import ClientCard from "./dashboard/components/ClientCard";
import { Search } from "lucide-react";
import { Divider, Space, Tag } from "antd";

type Props = {
  clientData: Client[];
};

const SearchClient = ({ clientData }: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [filterValue, setFilterValue] = useState<string | null>(null)


  useEffect(() => {
    const filteredData = clientData.filter((client: Client) => {
      const name = client.name.toLowerCase();
     

      return(
        (name.includes(searchQuery.toLowerCase()) ||
          name?.includes(searchQuery.toLowerCase())) &&
        (filterValue === null ||
          client.preApproved === (filterValue === "approved"))
      );
    });

    const timer = setTimeout(() => {
      setFilteredClients(filteredData);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, clientData, filterValue]);

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
        <Space className=" pt-3" size={[0, 8]} wrap>
          <Tag
            color="red"
            onClick={() => setFilterValue("notApproved")}
            className={`cursor-pointer ${
              filterValue === "notApproved" ? "selected" : ""
            }`}
          >
            Not Approved
          </Tag>
          <Tag
            color="green"
            onClick={() => setFilterValue("approved")}
            className={`cursor-pointer ${
              filterValue === "approved" ? "selected" : ""
            }`}
          >
            Approved
          </Tag>
          <Tag
            color="geekblue"
            onClick={() => setFilterValue(null)}
            className={`cursor-pointer `}
          >
            All Clients
          </Tag>
        </Space>
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
