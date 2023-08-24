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
import { Checkbox } from "@/components/ui/checkbox"


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
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: '',
      state: '',
      zipCode: '',
      budget: '',
      preApproved:  false,
      occupation: '',
      children: '',
      maritalStatus: '',
      notes: ''
    },
  });

  const onSubmit = async (data: ClientCreation) => {
    try {
     const response = await axios.post("/api/client", data) 
     console.log(response.data)
    } catch (error) {
      console.log("could not create client")
    }
    router.push("/");
    reset();
    router.refresh();
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-[20px] flex-wrap">
            <div>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="enter first name..." {...field} />
                    </FormControl>
                    <FormDescription>this is the first name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="enter your last name..." {...field} />
                    </FormControl>
                    <FormDescription>this is the first name</FormDescription>
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
                      <Input placeholder="enter your phone number..." {...field} />
                    </FormControl>
                    <FormDescription>this is the first name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <div>
               <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="enter your address..." {...field} />
                    </FormControl>
                    <FormDescription>this is the address</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
                         />
               <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="enter your phone city..." {...field} />
                    </FormControl>
                    <FormDescription>this is the city</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
                         />
               <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="enter your state..." {...field} />
                    </FormControl>
                    <FormDescription>this is the state</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
                         />
               <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input placeholder="enter your zip code..." {...field} />
                    </FormControl>
                    <FormDescription>this is the zip code</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
                         />
             </div>
             <div>
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
                      <Checkbox placeholder="enter your approval..." {...field} />
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
                      <Input placeholder="enter your occupation..." {...field} />
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
                      <Input placeholder="enter your Martial Status..." {...field} />
                    </FormControl>
                    <FormDescription>this is the martial status</FormDescription>
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
             </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default ClientForm;
