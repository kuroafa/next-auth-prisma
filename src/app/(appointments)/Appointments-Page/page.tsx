import SearchAppointments from "@/components/SearchAppointments";
import AppointmentCard from "@/components/dashboard/components/AppointmentCard";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";
import { Appointment } from "@prisma/client";
import { add } from "date-fns";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
appointmentData: Pick<Appointment, 'address'|'clientId'|'completed'|'date'|'id'|
'name'|'time'|'type'|'userId'>};

export const metadata = {
  title: "Appointments",
};

const page = async ({ appointmentData}: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/");
  }

  const getAppointments = await prisma.appointment.findMany({
    where: {
      userId: session.user.id,
    },
  
  });

  return (
    <div >
      <h1 className="text-4xl font-semibold">Appointments</h1>
      <div className="">
        {getAppointments.length <= 0 ? (
          <h2>No Appointments Found</h2>
        ) : (
         <SearchAppointments appointmentData={getAppointments}/>
        )}
      </div>
    </div>
  );
};

export default page;
