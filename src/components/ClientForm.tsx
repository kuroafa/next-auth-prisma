"use client";
import { useForm } from "react-hook-form";
import { clientCreationSchema } from "@/schema/form/form";
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

type Input = z.infer<typeof clientCreationSchema>;

const ClientForm = () => {
  const form = useForm<Input>({
    resolver: zodResolver(clientCreationSchema),
   
  });

  const onSubmit = (data: Input) => {
    try {
      alert(JSON.stringify(data, null, 2));
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  return (
    <div>
      
    </div>
  );
};

export default ClientForm;
