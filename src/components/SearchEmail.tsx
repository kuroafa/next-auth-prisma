"use client";
import { Client } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import EmailCard from "./EmailCard";
import { Card, CardHeader } from "./ui/card";

type Props = {
  clientData: Client[];
};

const SearchEmail = ({ clientData }: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredEmails, setFilteredEmails] = useState<Client[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<string>("");

  useEffect(() => {
    const filteredData = clientData.filter((client: Client) => {
      const name = client.name;
      return name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    const timer = setTimeout(() => {
      setFilteredEmails(filteredData);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, clientData]);

  const handleEmailClick = (email: string) => {
    setSelectedEmail(email);
  };

  return (
    <div>
      <div className="w-full min-w-[150px] lg:max-w-[400px]">
        <h2 className="font-semibold mb-1">Search Email</h2>
        <div className="relative h-fit">
          <Input
            type="search"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="pl-9 text-lg py-5 w-full"
            placeholder="Find Email...."
          />
          <Search className="absolute top-2 left-2 " />
        </div>
        {}
      </div>
      <div className="grid grid-cols-1  xl:grid-cols-4 md:grid-cols-1 gap-5 pt-5">
        <Card className=" xl:mr-0 -mr-10 ">
          <h1 className="pl-5 text-4xl font-bold pt-5">Clients</h1>
          {filteredEmails.map((email) => (
            <EmailCard
              clientData={email}
              key={email.id}
              onEmailClick={handleEmailClick}
            />
          ))}
        </Card>
        <Card className="col-span-3  w-full overflow-hidden h-[800px]">
          <form action="">
            <div className="flex items-center  flex-wrap">
              <div className="flex items-center p-4 gap-1">
                <h1 className="text-2xl font-semibold ">To:</h1>
                <Input
                  id="email"
                  value={selectedEmail}
                  className="w-[300px] p-4 focus:outline-none font-medium text-1xl"
                  placeholder="Choose client from right panel"
                />
              </div>
              <div className="flex items-center p-4 gap-1">
                <h1 className="text-2xl font-semibold ">Subject:</h1>
                <Input
                  id="email"
                  className="w-[300px] p-4 font-medium focus:outline-none text-1xl"
                  placeholder="Subject of the email"
                />
              </div>
              <button type="submit" className="absolute right-[50px]">
                <img alt="send email" src="/send.png" className="w-[40px]" />
              </button>
            </div>
            <textarea
            placeholder="Type message here"
              name=""
              id=""
              cols="30"
              className="w-full h-screen p-2 rounded-xl bg-gray-900 resize-none border-none focus:outline-none"
            />
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SearchEmail;
