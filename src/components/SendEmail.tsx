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

type Props = {};

const SendEmail = (props: Props) => {
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

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(sendEmail)} className=" space-y-8 ">
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
                      className="w-[350px] "
                      placeholder="Email..."
                      {...field}
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
    </>
  );
};

export default SendEmail;
