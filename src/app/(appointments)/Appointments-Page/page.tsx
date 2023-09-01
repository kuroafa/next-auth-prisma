import AppointmentCard from "@/components/dashboard/components/AppointmentCard";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";
import { add } from "date-fns";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  name: string;
  address: string;
  type: string;
  date: number;
  time: number;
  completed: boolean;
};

const page = async ({ name, address, type, date, time, completed }: Props) => {
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
    <div className="mt-[30px]">
      <h1>
        {getAppointments.map((appointment) => {
          return (
            <div key={appointment.id}>
              <AppointmentCard
                appointmentData={appointment}
                key={appointment.id}
              />
            </div>
          );
        })}
      </h1>
    </div>
  );
};

export default page;
