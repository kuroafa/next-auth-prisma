"use client";
import { useForm } from "react-hook-form";
import {
  AppointmentCreation,
  appointmentCreationSchema,
  clientCreationSchema,
} from "@/lib/type";
import { custom, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { ClientCreation } from "@/lib/type";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import * as React from "react";
import { CalendarIcon, CaretSortIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { CheckIcon } from "lucide-react";
import { Client } from "@prisma/client";

type Props = {
  clientData: Client;
};

const AppointmentForm = ({ clientData }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const router = useRouter();
  const {
    reset,
    formState: { errors, isLoading },
  } = useForm();

  const form = useForm<AppointmentCreation>({
    resolver: zodResolver(appointmentCreationSchema),
    defaultValues: {
      name: "",
      address: "",
      time: "",
      completed: true,
      date: "",
      type: "",
      clientId: "",
    },
  });
  const onSubmit = async (data: AppointmentCreation) => {
    try {
      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to make appointment");
      }

      toast.success("Appointment Made Successfully");
    } catch (error) {
      console.error("Could not create appointment:", error);
    }

    router.push("/");
  };

  dayjs.extend(customParseFormat);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="z-[-1] space-y-8"
        >
          <div className="flex gap-[10px] flex-wrap">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name..." {...field} />
                  </FormControl>
                  <FormDescription>this is the name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address..." {...field} />
                  </FormControl>
                  <FormDescription>this is the Address</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <div {...field}>
                      <TimePicker
                        placeholder="Start Time"
                        format="HH:mm"
                        onOk={(date) => {
                          if (date) {
                            const formattedDate = date.valueOf(); // Convert the date to a localized string
                            field.onChange(formattedDate.toString()); // Update the field value with the formatted date string
                          }
                        }}
                        onChange={() => console.log(field.value)}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>this is the time</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input placeholder="type..." {...field} />
                  </FormControl>
                  <FormDescription>this is the type</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              " pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(parseInt(field.value), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50 " />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 z-[500000]"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          onSelect={(date) => {
                            if (date) {
                              const formattedDate = date.valueOf(); // Convert the date to a localized string
                              field.onChange(formattedDate.toString()); // Update the field value with the formatted date string
                            }
                          }}
                          {...field}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription>this is the date</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="completed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Checkbox placeholder="false..." {...field} />
                  </FormControl>
                  <FormDescription>this is the name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen} {...field}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-[200px] justify-between"
                        >
                          {value ? value.toUpperCase() : "Choose a Client"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search framework..."
                            className="h-9"
                          />
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {clientData.map((client) => (
                              <CommandItem
                                key={client.id}
                                onSelect={(currentValue) => {
                                  setValue(
                                    currentValue === value ? "" : currentValue
                                  );
                                  setOpen(false);
                                  field.onChange(client.id);
                                }}
                              >
                                {client.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    value === client.name
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Submit</Button>
          <ToastContainer />
        </form>
      </Form>
    </div>
  );
};

export default AppointmentForm;
