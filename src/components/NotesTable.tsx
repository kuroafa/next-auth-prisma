"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Client } from "@prisma/client";
import { ArrowUpRight, Frown, Search, Smile } from "lucide-react";
import NotesCard from "./NotesCard";
import { Avatar, Button, List, Skeleton } from "antd";
import Link from "next/link";
import { Divider, Space, Tag } from "antd";

interface Props {
  clientData: Client[];
}

const NotesTable: React.FC<Props> = ({ clientData }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string | null>(null);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);

  useEffect(() => {
    const filteredData = clientData.filter((client: Client) => {
      const name = client.name.toLowerCase();
      const notes = client.notes?.toLowerCase();
      return (
        (name.includes(searchQuery.toLowerCase()) ||
          notes?.includes(searchQuery.toLowerCase())) &&
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
        <h2 className="font-semibold mb-1">Search Notes</h2>
        <div className="relative h-fit">
          <Input
            type="search"
            placeholder="Ex: Client name"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="pl-10  py-5 w-full"
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
            All Notes
          </Tag>
        </Space>
      </div>
      <div className="">
        <List
          className="demo-loadmore-list pt-10"
          itemLayout="horizontal"
          dataSource={filteredClients}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <div
                    className={` rounded-full   text-white p-2 ${
                      item.preApproved ? "bg-green-600" : "bg-red-600"
                    } `}
                  >
                    {item.preApproved ? <Smile /> : <Frown />}
                  </div>
                }
                title={
                  <Link
                    className="flex items-center gap-1 p-4 w-fit"
                    href={`Client-Profile/${item.id}`}
                  >
                    <h1 className="text-xl dark:text-gray-400 ">
                      <span className="font-semibold">
                        {item.name ? item.name : "No Client Name"}
                      </span>
                    </h1>
                    <ArrowUpRight className="dark:text-gray-400" size={25} strokeWidth={1} />
                  </Link>
                }
                description={
                  <p className="text-[16px] dark:text-gray-200 text-gray-700 font-medium">
                    <span className="font-bold">NOTE:</span> {item.notes}
                  </p>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default NotesTable;
