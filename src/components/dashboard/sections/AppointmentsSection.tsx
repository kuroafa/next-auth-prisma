import React from "react";
import AppointmentCard from "../components/AppointmentCard";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";
import { type } from "os";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, MoveRight } from "lucide-react";

type Props = {
  dashboardMode: boolean;
};

const AppointmentsSection = async ({ dashboardMode }: Props) => {
  const session = await getAuthSession();

  const appointmentData = await prisma.appointment.findMany({
    where: {
      userId: session?.user.id,
    },
    take: 4,
  });

  const hasNewAppointments = appointmentData.length > 0;

  return (
    <div className="flex rounded-xl  overflow-hidden">
      <div className="flex flex-col justify-start items-start w-full">
        <div>
          <div className="flex items-center mb-2 gap-3">
            <h3 className="light:text-black text-3xl font-semibold  ">
              Appointments
            </h3>
            {/* <span
              className={` w-7 h-7 ${
                appointmentData.length === 0 ? "hidden" : null
              } flex rounded-full -top-4 -right-4 bg-red-600 text-white text-[16px] items-center font-bold justify-center`}
            >
              {appointmentData.length}
            </span> */}
            <Link href="/Appointments-Page">
              <ArrowUpRight size={35} strokeWidth={1} />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 w-full mt-2 lg:grid-cols-2 xl:grid-cols-4">
          {hasNewAppointments ? (
            appointmentData.map((data, idx) => (
              <AppointmentCard
                dashboardMode={dashboardMode}
                appointmentData={data}
                key={data.id}
              />
            ))
          ) : (
            <h2>No Appointments Found</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsSection;
