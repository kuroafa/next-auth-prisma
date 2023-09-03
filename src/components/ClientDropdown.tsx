import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { CheckIcon } from "lucide-react";
import { Client } from "@prisma/client";
import { cn } from "@/lib/utils";

type Props = {
  clientData: Client[];
  handleAutoFill: (email: any, name: string) => void;
};

const ClientDropdown: React.FC<Props> = ({ clientData, handleAutoFill }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleDataFill = (clientEmail: any, clientName: string) => {
    handleAutoFill(clientEmail, clientName);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value ? value.toUpperCase() : "Choose a Client"}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search client..." className="h-9 " />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {clientData.map((client: Client) => (
                <CommandItem
                  key={client.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    handleDataFill(client.email, client.name);
                  }}
                >
                  {client.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === client.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ClientDropdown;
