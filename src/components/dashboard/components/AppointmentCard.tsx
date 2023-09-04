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
import { ArrowUpRight } from "lucide-react";
import { GrClose } from "react-icons/gr";

type AppointmentCardProps = {
  dashboardMode: boolean;
  appointmentData: Pick<
    Appointment,
    | "name"
    | "address"
    | "time"
    | "completed"
    | "date"
    | "type"
    | "clientId"
    | "id"
  >;
};

const AppointmentCard = async ({
  appointmentData,
  dashboardMode,
}: AppointmentCardProps) => {
  return (
    <Card className="min-w-[240px]">
      <div className="flex flex-col">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="text-xl font-bold">
              {appointmentData?.type}
            </CardTitle>
            {!dashboardMode ? <DeleteButton id={appointmentData.id} /> : null}
          </div>

          <CardDescription>
            <h2 className="text-[16px] text-primary font-semibold ">
              {appointmentData?.name}
            </h2>
            <div className="pt-2 flex flex-col gap-1">
              <p>Date: {appointmentData.date}</p>
              <p>Time: {appointmentData.time}</p>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="-mt-5">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">View Appointment details</h2>
            <Link href={`/Appointment-Profile/${appointmentData?.id}`}>
              <ArrowUpRight size={35} strokeWidth={1} />
            </Link>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default AppointmentCard;
