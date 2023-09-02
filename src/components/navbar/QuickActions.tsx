import React from "react";
import { Button } from "../ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import Link from "next/link";
import { CalendarPlus, UserPlus } from "lucide-react";

type Props = {};

const QuickActions = (props: Props) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Quick Actions</Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <div className="flex flex-col gap-4">
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
