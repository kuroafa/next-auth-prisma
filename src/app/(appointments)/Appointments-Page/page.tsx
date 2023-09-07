import SearchAppointments from "@/components/SearchAppointments";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { CalendarPlus } from "lucide-react";

type Props = {};

export const metadata = {
  title: "Appointments",
};

const page = async (props: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/");
  }

  const getAppointments = await prisma.appointment.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="mt-10">
      <div className="flex justify-between w-full">
        <h1 className="text-3xl font-semibold">Appointments</h1>
        <Button variant="outline" className="hidden md:flex">
          New Appointment <CalendarPlus className="ml-2 w-4 h-4" />
        </Button>
      </div>
      <div className="">
        {getAppointments.length <= 0 ? (
          <h2>No Appointments Found</h2>
        ) : (
          <SearchAppointments appointmentData={getAppointments} />
        )}
      </div>
    </div>
  );
};

export default page;
