import DeleteButton from "@/components/DeleteButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { Appointment } from "@prisma/client";
import { ArrowUpRight } from "lucide-react";

type AppointmentCardProps = {
  dashboardMode?: boolean;
  appointmentData: Appointment;
};

const AppointmentCard = async ({
  appointmentData,
  dashboardMode,
}: AppointmentCardProps) => {
  //TYPE
  const formattedType = appointmentData?.type.replace("_", " ").toLowerCase(); //Removing underscore & making it lowercase

  //DATE
  const todayDate = new Date().toDateString();
  const formattedDate = new Date(parseInt(appointmentData.date)).toDateString();
  const todayDateCheck = formattedDate === todayDate ? "Today" : formattedDate;

  //TIME
  const appointmentTime = new Date(
    parseInt(appointmentData.time)
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <Card className="min-w-[240px]">
      <div className="flex flex-col">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="text-xl font-bold capitalize">
              {formattedType}
            </CardTitle>
            {!dashboardMode ? <DeleteButton id={appointmentData.id} /> : null}
          </div>

          <CardDescription>
            <h2 className="text-[16px] text-primary font-semibold ">
              {appointmentData?.name}
            </h2>
            <div className="pt-2 flex flex-col gap-1">
              <p>Date: {todayDateCheck}</p>
              <p>Time: {appointmentTime}</p>
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
