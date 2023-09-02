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

type Props = {
  clientData: Client[];
};

const SendEmail = ({ clientData }: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredEmails, setFilteredEmails] = useState<Client[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<string>("");
  const {
    reset,
    formState: { isLoading },
  } = useForm();

  const form = useForm<EmailSchema>({
    resolver: zodResolver(emailSendSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const sendEmail = async (data: EmailSchema) => {
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify(data),
      });
      console.log(response.json());
    } catch (error) {
      console.error(error, "error sending email");
    } finally {
      reset();
    }
  };
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

  const handleEmailClick = (email: string) => {
    setSelectedEmail(email);
  };

  return (
    <>
      <div className=" flex flex-col gap-5 pt-5">
        <div className="w-full min-w-[150px] flex flex-col gap-2 lg:max-w-[400px]">
          <h2 className="font-semibold mb-1">Search Email</h2>
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
          {}
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Card className=" xl:mr-0 -mr-10  ">
            <h1 className="pl-5 text-4xl font-bold pt-5">Clients</h1>
            {filteredEmails.map((email) => (
              <EmailCard
                clientData={email}
                key={email.id}
                onEmailClick={handleEmailClick}
              />
            ))}
          </Card>
          <Card className="p-4 min-w-[400px] col-span-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(sendEmail)}
                className=" space-y-8 "
              >
                <div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            className="w-[350px] "
                            placeholder="name..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>this is the name</FormDescription>
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
                           value={selectedEmail.toLowerCase()}
                            className="w-[350px] "
                            placeholder="Email..."
                          />
                        </FormControl>
                        <FormDescription>this is the Address</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            className="w-[350px] "
                            placeholder="Subject..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>this is the time</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Input
                            className="w-[350px] "
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
                <Button type="submit" disabled={isLoading}>
                  Send Email
                </Button>
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
