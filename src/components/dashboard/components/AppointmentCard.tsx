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
import { GrClose } from 'react-icons/gr'

type AppointmentCardProps = {
  id: string;
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

const AppointmentCard = async ({ appointmentData }: AppointmentCardProps) => {
  return (
    <div className="  mt-4 ">
      <Card className="w-[300px]">
        <div className="flex flex-col">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-xl font-bold">
                {appointmentData?.type}
              </CardTitle>
              <DeleteButton id={appointmentData.id} />
            </div>

            <CardDescription>
              <h2 className="text-[16px] text-primary font-semibold -mb-[10px]">
                {appointmentData?.name}
              </h2>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold">View Appointment details</h2>
              <Link href={`/Appointment-Profile/${appointmentData?.id}`}>
                <ArrowUpRight size={35} strokeWidth={1} />
              </Link>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default AppointmentCard;
