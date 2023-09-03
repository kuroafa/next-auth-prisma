"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { EmailSchema, emailSendSchema } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { ToastContainer } from "react-toastify";
import { Search } from "lucide-react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Client } from "@prisma/client";
import { useEffect, useState } from "react";
import EmailCard from "./EmailCard";
import sgMail from "@sendgrid/mail";
import { Textarea } from "./ui/textarea";
import ClientDropdown from "./ClientDropdown";

type Props = {
  clientData: Client[];
};

const SendEmail = ({ clientData }: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredEmails, setFilteredEmails] = useState<Client[]>([]);

  const {
    reset,
    formState: { isLoading },
  } = useForm();

  const sendEmail = async (data: EmailSchema) => {
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await response.json();
    } catch (error) {
      console.error(error, "error sending email");
    } finally {
      reset();
    }
  };

  const form = useForm<EmailSchema>({
    resolver: zodResolver(emailSendSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

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

  const handleEmailClick = (recipientEmail: string, recipientName: string) => {
    form.setValue("email", recipientEmail);
    form.setValue("name", recipientName);
  };

  return (
    <>
      <div className=" flex flex-col gap-5 pt-5 ">
        <div className="w-full min-w-[150px] lg:max-w-[400px] hidden md:block">
          <h2 className="font-semibold mb-1">Search Client</h2>
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
        </div>
        <div className="flex gap-2 flex-col md:flex-row  ">
          <Card className="p-4 bg-slate-100 w-full md:max-w-[430px] hidden md:block">
            <h1 className="text-2xl tracking-wide mb-2 ml-1">All Clients</h1>
            <div className="overflow-auto max-h-[600px] flex flex-col gap-4 no-scrollbar">
              {filteredEmails.map((email) => (
                <EmailCard
                  clientData={email}
                  key={email.id}
                  handleAutoFill={handleEmailClick}
                />
              ))}
            </div>
          </Card>
          <div className="block md:hidden w-full">
            <ClientDropdown
              clientData={clientData}
              handleAutoFill={handleEmailClick}
            />
          </div>
          <Card className="p-8 w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(sendEmail)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="col-span-2 md:col-span-1">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            className="min-w-[200px"
                            placeholder="name..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>this is the name</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="min-w-[200px] "
                            placeholder="Email..."
                            readOnly
                          />
                        </FormControl>
                        <FormDescription>this is the Address</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            className="min-w-[200px] "
                            placeholder="Subject..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>this is the time</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            className="min-h-[250px]"
                            placeholder="Message..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>this is the time</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-start-2 place-self-end ">
                  <Button type="submit" disabled={isLoading}>
                    Send Email
                  </Button>
                </div>
                <ToastContainer />
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SendEmail;
