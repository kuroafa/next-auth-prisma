"use client";
import React, { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import Link from "next/link";
import {
  CalendarPlus,
  ListPlus,
  Mail,
  Send,
  Trash2,
  UserPlus,
} from "lucide-react";
import { ClientCreation } from "@/lib/type";
import { toast } from "react-toastify";
import { Client } from "@prisma/client";
import { useRouter } from "next/navigation";

type Props = {
  clientData: Client[];
};

const QuickActions = ({ clientData }: Props) => {
  const router = useRouter();

  const refreshPage = () => {
    const currentUrl = window.location.href;
    const newUrl = currentUrl.includes("?")
      ? `${currentUrl}&refresh=${Date.now()}`
      : `${currentUrl}?refresh=${Date.now()}`;
    window.location.href = newUrl;
  };

  const getUsers = async (data: ClientCreation) => {
    try {
      const response = await fetch("/api/mock", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result === "Data Added Successfully") {
        toast.success(`Successfully generated mock users`);
      }
    } catch (error) {
      if (error) {
        toast.error(`Error generating mock users: ${error}`);
      }
    }
  };

  const clearUsers = async () => {
    try {
      const response = await fetch("api/mock", {
        method: "DELETE",
      });
      const clearResult = await response.json();
      if (clearResult.message === "Data cleared successfully") {
        toast.success("Successfully cleared data");
      }
    } catch (error) {
      if (error) {
        toast.error("Error clearing data");
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
          <Link href={"/add-client"}>
            <Button className="w-full gap-2" variant="outline">
              New Client
              <UserPlus size={20} />
            </Button>
          </Link>
          <Link href={"/Appointment-Creation"}>
            <Button className="w-full gap-2" variant="outline">
              New Appointment
              <CalendarPlus size={20} />
            </Button>
          </Link>
          <Link href={"/email"}>
            <Button className="w-full gap-2" variant="outline">
              Send Email
              <Send size={20} />
            </Button>
          </Link>

          <Button
            onClick={() => {
              getUsers(clientData);
            }}
            className="w-full gap-2"
            variant="secondary"
          >
            Generate Mock Data
            <ListPlus size={20} />
          </Button>
          <Button
            onClick={() => {
              clearUsers();
            }}
            className="w-full gap-2"
            variant="secondary"
          >
            Clear Dashboard
            <Trash2 size={20} />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default QuickActions;
