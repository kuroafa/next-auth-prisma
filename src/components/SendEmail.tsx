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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Client } from "@prisma/client";
import { Textarea } from "./ui/textarea";
import ClientDropdown from "./ClientDropdown";
import EmailClients from "./EmailClients";

type Props = {
  clientData: Client[];
};

const SendEmail = ({ clientData }: Props) => {
  const form = useForm<EmailSchema>({
    resolver: zodResolver(emailSendSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const {
    setValue,
    getValues,
    formState: { isLoading },
    handleSubmit,
    control,
  } = form;

  const clientName = getValues("name") ? getValues("name") : "client";

  const sendEmail = async (data: EmailSchema) => {
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.message === "Email Send Successfully") {
        toast.success(`Email send to ${clientName}!`);
      }
    } catch (error) {
      console.error(error, "error sending email");
      if (error) {
        toast.error(`Failed to send email!`);
      }
    } finally {
      form.reset();
    }
  };

  const handleEmailClick = (recipientEmail: string, recipientName: string) => {
    form.setValue("email", recipientEmail);
    form.setValue("name", recipientName);
  };

  return (
    <>
      <div className=" flex flex-col gap-5 pt-5 ">
        <div className="flex gap-2 flex-col md:flex-row  ">
          <EmailClients
            clientData={clientData}
            handleAutoFill={handleEmailClick}
          />
          <div className="block md:hidden w-full">
            <ClientDropdown
              clientData={clientData}
              handleAutoFill={handleEmailClick}
            />
          </div>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Email Form</CardTitle>
              <CardDescription>
                Send an email by filling out the form below, use the
                client&apos;s panel to autofill information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={handleSubmit(sendEmail)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="col-span-2 md:col-span-1">
                    <FormField
                      control={control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              className="px-2 py-6 dark:bg-slate-900 col-span-2 md:col-span-1"
                              placeholder="ex. John Doe"
                              {...field}
                              readOnly
                            />
                          </FormControl>
                          <FormDescription>
                            Client name (AUTO FILL)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <FormField
                      control={control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="px-2 py-6 dark:bg-slate-900"
                              placeholder="ex. example@mail.com"
                              readOnly
                            />
                          </FormControl>
                          <FormDescription>
                            Client email (AUTO FILL)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-2">
                    <FormField
                      control={control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input
                              className="px-2 py-6 dark:bg-slate-900"
                              placeholder="ex. Offer Accepted!"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>Email Subject</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-2">
                    <FormField
                      control={control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              className="min-h-[250px] pt-3 dark:bg-slate-900"
                              placeholder="Your message here"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>Email Message</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-start-2 place-self-end ">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Sending..." : "Sent"}
                    </Button>
                  </div>
                  <ToastContainer />
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SendEmail;
