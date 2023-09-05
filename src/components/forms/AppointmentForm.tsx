"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AppointmentCreation, appointmentCreationSchema } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import "reactjs-popup/dist/index.css";
import { Input } from "../ui/input";

import { CalendarIcon, CaretSortIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Client } from "@prisma/client";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  clientData: Client[];
};

const AppointmentForm = ({ clientData }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const router = useRouter();
  const {
    reset,
    formState: { errors, isLoading },
  } = useForm();

  const typeValues = [
    { title: "Showing", value: "SHOWING" },
    { title: "Apprasial", value: "APPRASIAL" },
    { title: "Inspection", value: "INSPECTION" },
    { title: "Walk Through", value: "WALK_THROUGH" },
    { title: "Photography", value: "PHOTOGRAPHY" },
    { title: "Agent Preview", value: "AGENT_PREVIEW" },
  ];

  const form = useForm<AppointmentCreation>({
    resolver: zodResolver(appointmentCreationSchema),
    defaultValues: {
      name: "",
      address: "",
      time: "",
      completed: true,
      date: "",
      type: undefined,
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

    router.replace("/");
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
      <div className="flex items-end justify-between mt-5 ml-2 -mb-5 flex-wrap gap-2">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold pt-3">Appointments</h2>
          <p className="text-xl font-medium pb-3">
            Create an appointment using Meetly, easily keep clients up-to-date
            with our Email feature!
          </p>
          <ul className="flex flex-col gap-1">
            <li className="text-lg font-normal">
              Store clients information safely
            </li>
            <li className="text-lg font-normal">
              Always staying one foot ahead
            </li>
            <li className="text-lg font-normal">
              Creating a seemless process for the client
            </li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2  gap-5 pt-10 w-full ">
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
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Appointment Name</FormLabel>
                          <FormControl>
                            <Input
                              className=" "
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
                              className=" "
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
                  </div>
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="whitespace-nowrap">
                            Purpose of Appointment
                          </FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger className="capitalize">
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                {typeValues.map(({ title, value }, idx) => (
                                  <SelectItem key={idx} value={value}>
                                    {title}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
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
                        <FormItem className="">
                          <FormLabel className="whitespace-nowrap">
                            Appointment with
                          </FormLabel>
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
                                  className="w-[100%] justify-between"
                                >
                                  {value
                                    ? value.toUpperCase()
                                    : "Choose a Client"}
                                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0 relative top-[200px]">
                                <Command>
                                  <CommandInput
                                    placeholder="Search client..."
                                    className="h-9  "
                                  />
                                  <CommandEmpty>No client found.</CommandEmpty>
                                  <CommandGroup>
                                    {clientData.map((client: Client) => (
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
                          <FormDescription>
                            Who are you having this appointment with?
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="">
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col gap-2">
                            <FormLabel>Time</FormLabel>
                            <FormControl>
                              <TimePicker
                                className=" h-9 "
                                placeholder="Start Time"
                                format="HH:mm"
                                onOk={(date) => {
                                  if (date) {
                                    const formattedDate = date.valueOf();
                                    field.onChange(formattedDate.toString());
                                  }
                                }}
                                onChange={() => console.log(field.value)}
                              />
                            </FormControl>
                          </div>

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
                          <div className="flex flex-col gap-2">
                            <FormLabel className="pr-2">Date</FormLabel>
                            <FormControl>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        " pl-3 text-left font-normal ",
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
                                        field.onChange(
                                          formattedDate.toString()
                                        ); // Update the field value with the formatted date string
                                      }
                                    }}
                                    {...field}
                                    disabled={(date) => date < new Date()}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormControl>
                          </div>

                          <FormDescription>this is the date</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button type="submit">Submit</Button>
                <ToastContainer />
              </form>
            </Form>
          </CardContent>
        </Card>
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
      </div>
    </div>
  );
};

export default AppointmentForm;
