"use client";
import { useForm } from "react-hook-form";
import {
  AppointmentCreation,
  appointmentCreationSchema,
  clientCreationSchema,
} from "@/lib/type";
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
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
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
import { Card, TimePicker } from "antd";
import { Card, TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { CheckIcon } from "lucide-react";
import { Client } from "@prisma/client";
import Image from "next/image";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

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

  const currentDate = new Date();
  const calendarTo = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    1
  );

  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2  gap-5 pt-10 w-full ">
        <div className="w-full col-span-1  ">
          <Image
            src="/realestate.png"
            alt="form image"
            className="rounded-lg"
            width={800}
            height={800}
          />
          <p className="pt-5 text-lg font-medium">
            Tip -{" "}
            <span className="text-sm">
              Creating appointments with clients ensures a higher chance of
              knowing weather this client is MOTIVATED or not. Always remember
              to schedule an Appointment!
            </span>
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Add New Appointment</CardTitle>
            <CardDescription>
              Fill out the fields below to add a new appointment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" space-y-8 "
              >
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Appointment Name</FormLabel>
                        <FormControl>
                          <Input
                            className="w-[350px] "
                            placeholder="ex. Showing"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Appointment&apos;s nickname
                        </FormDescription>
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
                          <Input
                            className="w-[350px] "
                            placeholder="ex. 123 Street Address"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Appointment&apos;s Location
                        </FormDescription>
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
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="pr-2">Date -</FormLabel>
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
                                fromDate={new Date()}
                                toDate={calendarTo}
                                mode="single"
                                onSelect={(date) => {
                                  if (date) {
                                    const formattedDate = date.valueOf(); // Convert the date to a localized string
                                    field.onChange(formattedDate.toString()); // Update the field value with the formatted date string
                                  }
                                }}
                                {...field}
                                disabled={(date) => date < new Date()}
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
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purpose of appointment</FormLabel>
                        <FormControl>
                          <Input
                            className="w-[350px] "
                            placeholder="type..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          what&apos;s the goal of this appointment?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="clientId"
                    render={({ field }) => (
                      <FormItem className="pt-3">
                        <FormControl>
                          <Popover
                            open={open}
                            onOpenChange={setOpen}
                            {...field}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[200px] justify-between"
                              >
                                {value
                                  ? value.toUpperCase()
                                  : "Choose a Client"}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Search client..."
                                  className="h-9 "
                                />
                                <CommandEmpty>No framework found.</CommandEmpty>
                                <CommandGroup>
                                  {clientData.map((client) => (
                                    <CommandItem
                                      key={client.id}
                                      onSelect={(currentValue) => {
                                        setValue(
                                          currentValue === value
                                            ? ""
                                            : currentValue
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
          </CardContent>
        </Card>
      </div>
      {/* <div className="relative p-5 bg-white rounded-lg shadow mt-4">
        <div className="absolute top-0 right-0 m-4 p-3 rounded-full bg-gray-100"></div>

        <div className="relative z-10">
          <div className="w-10/12">
            <h3 className="font-medium text-gray-800">
              Create an appointment with your potential client with{" "}
              <span className="text-3xl font-bold italic ">Meetly</span>
            </h3>
          </div>

          <div className="mt-8 w-full md:w-7/12">
            <p className="text-xs text-gray-600">
              Made for realtors by realtors
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AppointmentForm;
