"use client";
import { useForm } from "react-hook-form";
import {
  AppointmentCreation,
  appointmentCreationSchema,
  clientCreationSchema,
} from "@/lib/type";
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
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

type Props = {};

const AppointmentForm = (props: Props) => {
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
      time: 10,
      completed: true,
      date: 10,
      type: 'Property Showing'
    },
  });

  const onSubmit = async (data: AppointmentCreation) => {
    try {
      const response = await axios.post("/api/appointment", data);
      console.log(response.data);
    } catch (error) {
      console.log("could not create appointment");
    }
    router.push("/");
    reset();
    router.refresh();
  };

  return (
    <Popup trigger={<Button>Create New Appointment</Button>} position="right center">

    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-[20px] flex-wrap">
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
                    <Input placeholder="time..." {...field} />
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
                    <Input placeholder="date..." {...field} />
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
                    <Checkbox placeholder="flase..." {...field} />
                  </FormControl>
                  <FormDescription>this is the name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
    </Popup>
  );
};

export default AppointmentForm;
