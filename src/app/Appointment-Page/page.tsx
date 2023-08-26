
import { DELETE } from "@/app/api/appointment/route";
import DeleteButton from "@/components/DeleteButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { DeleteSchema } from "@/lib/type";
import axios from "axios";
import Link from "next/link";
import React from "react";

type Props = {
  id: string;
  name: string;
  address: string;
  time: number;
  completed: boolean;
  date: number;
  type: string;
}

const page = async ({
  name,
  address,
  time,
  completed,
  id,
  date,
  type,
}: Props) => {
  const fetchAppointment = await prisma.appointment.findMany({
    where: {
      id: id,
      name: name,
      address: address,
      time: time,
      completed: completed,
      date: date,
      type: type,
    },
  });
   
  return (
    <div>
       {fetchAppointment.map((appointments) => {
        return (
          <Card className="w-[300px]" key={appointments.id}>
            <CardHeader>
              <CardTitle>{appointments.type}</CardTitle>
              <CardDescription>{appointments.name}</CardDescription>
            </CardHeader>
            <CardContent>
             
            </CardContent>
           
          </Card>
        );
      })}
    </div>
  )
}

export default page