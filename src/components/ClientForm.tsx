"use client";
import { useForm } from "react-hook-form";
import { clientCreationSchema } from "@/lib/type";
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
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Client } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";



type Props = {
  client?: Pick<
    Client,
    "firstName" | "lastName" | "email" | "id" | "phoneNumber"
  >;
};

type Input = z.infer<typeof clientCreationSchema>;

const ClientForm = ({ client }: Props) => {
  const router = useRouter();
  const {
    reset,
    formState: { errors, isLoading },
  } = useForm();

  const form = useForm<Input>({
    resolver: zodResolver(clientCreationSchema),
    defaultValues: {
      id: client?.id ? client?.id : "",
      firstName: client?.firstName ? client?.firstName : "",
      lastName: client?.lastName ? client?.lastName : "",
      email: client?.email ? client?.email : "",
      phoneNumber: client?.phoneNumber ? client?.phoneNumber : "",
    },
  });

  const onSubmit = async (data: Input) => {
    try {
      const response = await axios.post("/api/client", data);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error creating client:", error);
    }

    router.push("/");
    reset();
    router.refresh();
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>first name</FormLabel>
                <FormControl>
                  <Input placeholder="enter first name" {...field} />
                </FormControl>
                <FormDescription>
                  this is the first name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
             <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>first name</FormLabel>
                <FormControl>
                  <Input placeholder="enter first name" {...field} />
                </FormControl>
                <FormDescription>
                  this is the first name
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
                <FormLabel>first name</FormLabel>
                <FormControl>
                  <Input placeholder="enter first name" {...field} />
                </FormControl>
                <FormDescription>
                  this is the first name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
             <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>first name</FormLabel>
                <FormControl>
                  <Input placeholder="enter first name" {...field} />
                </FormControl>
                <FormDescription>
                  this is the first name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default ClientForm;
