"use client";
import { useForm } from "react-hook-form";
import { clientCreationSchema } from "@/lib/type";
import React from "react";
import { z } from "zod";
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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { ClientCreation } from "@/lib/type";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { ChevronDown, ChevronRight, DollarSign } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Textarea } from "../ui/textarea";
import Image from "next/image";

type Props = {};

const ClientForm = (props: Props) => {
  const [value, setValue] = useState(false);

  const router = useRouter();
  const {
    reset,
    watch,
    formState: { errors, isLoading },
  } = useForm();

  const martialValues = [
    "MARRIED",
    "DIVORCED",
    "SEPARATED",
    "WIDOWED",
    "SINGLE",
  ];
  const clientBenefits = [
    {
      id: 1,
      title: "Client Loyalty:",
      text: " Creating a client profile fosters a sense of loyalty and connection between the client and the service provider, potentially leading to repeat business and referrals.",
    },
    {
      id: 2,
      title: "Streamlined Transactions:",
      text: " For real estate professionals, client profiles streamline the transaction process, making it easier to manage client needs, preferences, and paperwork.",
    },
    {
      id: 3,
      title: "Faster Assistance:",
      text: " Service providers can quickly access client information, making it easier to provide support, answer inquiries, and address issues promptly.",
    },
  ];

  const form = useForm<ClientCreation>({
    resolver: zodResolver(clientCreationSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      budget: "",
      preApproved: false,
      occupation: "",
      children: "3",
      maritalStatus: "",
      notes: "",
      notesPriority: true,
    },
  });

  const onSubmit = async (data: ClientCreation) => {
    try {
      const response = await axios.post("/api/client", data);
      console.log(response.data);
    } catch (error) {
      console.log("could not create client");
    }
    router.push("/");
    reset();
    router.refresh();
    toast.success("Successfully Created Client");
  };

  watch();
  return (
    <div className=" grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1  gap-5  ">
      <Card className=" col-span-2 ">
        <CardHeader>
          <CardTitle>Create New Client</CardTitle>
          <CardDescription>
            Fill out the form below to create a new client
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 items-start p-5"
            >
              <div className="flex gap-8 flex-col md:flex-row">
                <div className="flex-1 flex flex-col gap-4">
                  <h2 className="text-2xl font-semibold ">Basic Info</h2>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="">Name</FormLabel>
                        <FormControl className="border">
                          <Input
                            className="py-5 px-4"
                            placeholder="ex. John Doe"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Client&apos;s full name
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            className="py-5 px-4"
                            placeholder="ex. example@mail.com"
                            type="email"
                            inputMode="email"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Client&apos;s email</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            className="py-5 px-4"
                            placeholder="+1 (123) 456 - 789"
                            type="number"
                            pattern="0-9"
                            inputMode="tel"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Client&apos;s phone number
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            className="py-4 px-4"
                            placeholder="enter your Notes..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>this is the Notes</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  <h2 className="text-2xl font-semibold ">Qualification</h2>
                  <FormField
                    control={form.control}
                    name="preApproved"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pre-Approved Status</FormLabel>
                        <FormControl>
                          <Select>
                            <SelectTrigger className="px-4 py-5">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem
                                value="Approved"
                                onSelect={() => {
                                  field.onChange(true);
                                }}
                              >
                                Approved
                              </SelectItem>
                              <SelectItem
                                value="Pre Approved"
                                onSelect={() => {
                                  field.onChange(false);
                                }}
                              >
                                Not Approved
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          Client&apos;s Pre Approval
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Occupation</FormLabel>
                        <FormControl>
                          <Input
                            className="py-5 px-4"
                            placeholder="ex. Software Engineer"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Client&apos;s occupation
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="maritalStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Martial Status</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className="capitalize px-4 py-5">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              {martialValues.map((value, idx) => (
                                <SelectItem
                                  className="capitalize"
                                  key={idx}
                                  value={value}
                                >
                                  {value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          Client&apos;s martial status
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              className="py-5 px-4 pl-8"
                              placeholder="ex. 350,000"
                              inputMode="numeric"
                              type="number"
                              pattern="0-9"
                              {...field}
                            />
                            <DollarSign
                              className="absolute top-3 left-3"
                              strokeWidth={1}
                              size={15}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>Client&apos;s Budget</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button className="p-5 text-1xl" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className=" flex flex-col gap-2  col-span-1   rounded-xl  ">
        <div className="">
          <h1 className="md:text-4xl text-2xl pb-3">
            Creating a client on{" "}
            <span className=" font-bold italic ">Meetly</span>
          </h1>
          <Image
            src="/Home.jpg"
            alt="home image"
            className="min-w-[200px] rounded-xl"
            width={800}
            height={800}
          />
        </div>
        <div>
          <h2 className="text-2xl py-2 font-bold">
            Benefits of adding clients to a dashboard
          </h2>
          <ul className="flex flex-col gap-3 ">
            {clientBenefits.map((benefit, idx) => {
              return (
                <li className="text-md font-medium " key={idx}>
                  <span className="text-lg font-semibold">{benefit.title}</span>
                  {benefit.text}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClientForm;
