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
import { useRouter } from "next/navigation";
import { ClientCreation } from "@/lib/type";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

const ClientForm = (props: Props) => {
  const router = useRouter();
  const {
    reset,
    formState: { errors, isLoading },
  } = useForm();

  const form = useForm<ClientCreation>({
    resolver: zodResolver(clientCreationSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      budget: "100",
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

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-fit  flex flex-row items-start p-5 rounded-xl mt-3 bg-slate-200"
        >
          <div className="flex  flex-wrap gap-[20px] ">
            <div className="border p-5 w-[250px]   rounded-xl">
              <h2 className="text-2xl mb-2 font-semibold ">Basic Info</h2>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Name</FormLabel>
                    <FormControl className="border">
                      <Input placeholder="enter first name..." {...field} />
                    </FormControl>
                    <FormDescription>This is the name</FormDescription>
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
                      <Input placeholder="enter your email..." {...field} />
                    </FormControl>
                    <FormDescription>this is the first name</FormDescription>
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
                        placeholder="enter your phone number..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>this is the first name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="border p-5 w-[250px]  rounded-xl">
            <div className="border p-5 w-[250px]   rounded-xl">
              <h2 className="text-2xl mb-2 font-semibold ">Qualification</h2>
              {/* <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="enter your budget..." {...field} />
                    </FormControl>
                    <FormDescription>this is the budget</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
                         /> */}
              <FormField
                control={form.control}
                name="preApproved"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pre-Approved?</FormLabel>
                    <FormControl>
                      <Checkbox
                        placeholder="enter your approval..."
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>this is the approval</FormDescription>
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
                        placeholder="enter your occupation..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>this is the occupation</FormDescription>
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
                      <Input
                        placeholder="enter your Martial Status..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      this is the martial status
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="children"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Children</FormLabel>
                    <FormControl>
                      <Input placeholder="enter your children..." {...field} />
                    </FormControl>
                    <FormDescription>this is the children</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
                         /> */}
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Input placeholder="enter your Notes..." {...field} />
                    </FormControl>
                    <FormDescription>this is the Notes</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notesPriority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Urgent</FormLabel>
                    <FormControl>
                      <Checkbox
                        placeholder="enter your approval..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Set note urgency</FormDescription>
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
    </div>
  );
};

export default ClientForm;
