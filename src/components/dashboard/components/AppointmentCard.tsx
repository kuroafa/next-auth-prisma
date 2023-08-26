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
import { Appointment } from "@prisma/client";

type AppointmentCardProps = {
  appointmentData: Pick<
    Appointment,
    "name" | "address" | "time" | "completed" | "date" | "type" | "clientId"
  >;
};

const AppointmentCard = async ({ appointmentData }: AppointmentCardProps) => {
  return (
    <div className="flex gap-2 mt-4 ">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>{appointmentData?.type}</CardTitle>
          <CardDescription>{appointmentData?.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div>
              <h2>
                {appointmentData?.time} - {appointmentData?.date}
              </h2>
              <h2>{appointmentData?.date}</h2>
              <h3>{appointmentData?.completed}</h3>
            </div>
            <Link href="/Appointment-Page">View Appointment</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentCard;
