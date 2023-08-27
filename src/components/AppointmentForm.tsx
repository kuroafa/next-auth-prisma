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
import { CalendarIcon } from "@radix-ui/react-icons";
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

type Props = {};

const AppointmentForm = (props: Props) => {
  const [date, setDate] = React.useState<Date>();
  const [time, setTime] = React.useState("10:00");
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
      time: new Date(),
      completed: true,
      date: 10,
      type: "Property Showing",
    },
  });

  const onSubmit = async (data: AppointmentCreation) => {
    try {
      const response = await axios.post("/api/appointment", data);
      console.log(response.data);
    } catch (error) {
      console.log("could not create appointment");
    }
    toast.success("Appointment Made Successfully");
    router.push("/");
    router.refresh();
  };

  const parseTimeInput = (value: string) => {
    // Parse the input value and convert it to a number
    const parsedValue = parseInt(value, 10);
    return isNaN(parsedValue) ? null : parsedValue; // Return null for non-numeric inputs
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
                    {/* <Input
                      placeholder="time..."
                      {...field}
                      onChange={(e) => {
                        const parsedValue = parseTimeInput(e.target.value);
                        field.onChange(parsedValue);
                      }}
                    /> */}
                    {/* <TimePicker placeholder="Start Time" format="HH:mm a" /> */}
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
                              format(field.value, "PPP")
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
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          className=""
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
          </div>
          <Button type="submit">Submit</Button>
          <ToastContainer />
        </form>
      </Form>
      {/* 
      <TimePicker
        onOk={() => setTime(new Date())}
        placeholder="End Time"
        defaultValue={dayjs("13:30:56", "HH:mm:ss")}
        format="HH:mm a"
      />
      {time} */}
    </div>
  );
};

export default AppointmentForm;
