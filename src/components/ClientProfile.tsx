"use client";

import { Client } from "@prisma/client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { ClientUpdate, clientUpdateSchema } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
type ClientProfileProps = { clientData: Client };

const ClientProfile = ({ clientData }: ClientProfileProps) => {
  const [edit, setEdit] = useState(false);
  const router = useRouter();

  const placeholderStyles =
    "w-full placeholder:text-black disabled:text-black text-2xl w-full border-b-1 border-t-0 border-x-0 rounded-none focus-visible:ring-0 border-black outline-none focus";

  const formattedPhone = `+1 (${clientData?.phoneNumber.slice(0, 3)})-
  ${clientData?.phoneNumber.slice(3, 6)}-
  ${clientData?.phoneNumber.slice(6, 10)}`;

  const form = useForm<ClientUpdate>({
    resolver: zodResolver(clientUpdateSchema),
    defaultValues: {
      id: clientData.id,
      budget: clientData.budget ? clientData.budget.toString() : "",
      preApproved: clientData.preApproved ? clientData.preApproved : false,
      occupation: clientData.occupation ? clientData.occupation : "",
      maritalStatus: clientData.maritalStatus
        ? clientData.maritalStatus
        : undefined,
      children: clientData.children ? clientData.children.toString() : "0",
      notes: clientData.notes ? clientData.notes : "",
    },
  });

  const martialValues = [
    "MARRIED",
    "DIVORCED",
    "SEPARATED",
    "WIDOWED",
    "SINGLE",
  ];

  const onUpdate = async (data: ClientUpdate) => {
    try {
      const response = await fetch("/api/client", {
        method: "PUT",
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.message === "Success") {
        toast.success(`Changes Saved!`);
      }
    } catch (error) {
      if (error) {
        toast.error(`Error saving changes: ${error}`);
      }
    } finally {
      setEdit(false);
      router.replace(`/Client-Profile/${clientData.id}`);
    }
  };

  return (
    <div className="flex flex-col gap-8 md:grid-4 mt-8">
      <div className="flex flex-col gap-4 items-center md:flex-row">
        <div>
          <Image alt="profile image" src="/user.png" width={150} height={150} />
        </div>
        <div className="flex flex-col gap-2 items-center md:items-start">
          <h2 className="text-4xl font-semibold">
            {clientData?.name ? clientData?.name : "No Name Found"}
          </h2>
          <div className="flex flex-col gap-1 items-center md:items-start">
            <h2 className="uppercase font-medium">Contact Info:</h2>
            <div className="flex flex-col gap-2">
              <h3 className="flex gap-2">
                <Mail size={20} />{" "}
                {clientData?.email ? clientData?.email : "No Email Found"}
              </h3>
              <h3 className="flex gap-2">
                <Phone size={20} />
                {formattedPhone ? formattedPhone : "No Phone Number"}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          onSubmit={form.handleSubmit(onUpdate)}
        >
          <div className="grid grid-cols-3 gap-6 col-span-3">
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Budget:</FormLabel>
                  <FormControl className="border">
                    <Input
                      disabled={!edit}
                      type="currency"
                      placeholder={
                        clientData?.budget
                          ? `$${clientData.budget}`
                          : "No Budget"
                      }
                      className={cn(placeholderStyles, "")}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Client&apos;s budget</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preApproved"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Pre-Approved?</FormLabel>
                  <FormControl className="border">
                    <Select disabled={!edit}>
                      <SelectTrigger
                        className={cn(
                          placeholderStyles,
                          "w-full focus:ring-0 px-1"
                        )}
                      >
                        <SelectValue
                          placeholder={
                            clientData.preApproved ? "Approved" : "Not Approved"
                          }
                        />
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
                  <FormDescription>Client&apos;s pre-approval</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Occupation:</FormLabel>
                  <FormControl className="border">
                    <Input
                      disabled={!edit}
                      placeholder={
                        clientData?.occupation
                          ? clientData.occupation
                          : "No Data on Record"
                      }
                      className={placeholderStyles}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Client&apos;s occupation</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 col-span-3 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Marital Status:</FormLabel>
                  <FormControl className="border">
                    <Select onValueChange={field.onChange} disabled={!edit}>
                      <SelectTrigger
                        className={cn(
                          placeholderStyles,
                          "w-full focus:ring-0 px-1"
                        )}
                      >
                        <SelectValue placeholder={clientData.maritalStatus} />
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
                    Client&apos;s marital status
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="children"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Children:</FormLabel>
                  <FormControl className="border">
                    <Input
                      disabled={!edit}
                      placeholder={
                        clientData?.children
                          ? clientData.children
                          : "No Data on Record"
                      }
                      {...field}
                      className={placeholderStyles}
                    />
                  </FormControl>
                  <FormDescription>
                    Client&apos;s number of children
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 col-span-3">
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Notes:</FormLabel>
                  <FormControl className="border">
                    <Textarea
                      disabled={!edit}
                      placeholder={
                        clientData?.notes ? clientData.notes : "No Notes"
                      }
                      className="placeholder:text-black h-[125px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Client&apos;s notes</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-start-3 place-self-end flex gap-2">
            <Button
              className="w-fit px-10 self-start"
              disabled={edit}
              onClick={() => setEdit(true)}
              variant="outline"
            >
              Edit
            </Button>
            <Button
              className="w-fit px-10 self-start"
              type="submit"
              disabled={!edit || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
          <ToastContainer />
        </form>
      </Form>
    </div>
  );
};

export default ClientProfile;
