"use client";
import React, { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import Link from "next/link";
import { CalendarPlus, UserPlus } from "lucide-react";
import { ClientCreation } from "@/lib/type";
import { toast } from "react-toastify";
import { Client } from "@prisma/client";

type Props = {
  clientData: Client;
};

const QuickActions = ({ clientData }: Props) => {
  const getUsers = async (data: ClientCreation) => {
    try {
      const response = await fetch("/api/mock", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.message === "Success") {
        toast.success(`successfully got mock users`);
      }
    } catch (error) {
      if (error) {
        toast.error(`Error getting mock user: ${error}`);
      }
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button>Actions</Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <div className="flex flex-col gap-4">
          <Button
            onClick={() => {
              getUsers(clientData);
            }}
            className="w-full gap-2"
            variant="secondary"
          >
            Generate Mock Data
            <UserPlus size={20} />
          </Button>

          <Link href={"/add-client"}>
            <Button className="w-full gap-2" variant="secondary">
              New Client
              <UserPlus size={20} />
            </Button>
          </Link>
          <Link href={"/Appointment-Creation"}>
            <Button className="w-full gap-2" variant="secondary">
              New Appointment
              <CalendarPlus size={20} />
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default QuickActions;
