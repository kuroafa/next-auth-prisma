import React from "react";
import AppointmentCard from "../components/AppointmentCard";
import AppointmentForm from "@/components/AppointmentForm";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";
import { type } from "os";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, MoveRight } from "lucide-react";

type Props = {};

const AppointmentsSection = async (props: Props) => {
  const session = await getAuthSession();

  const appointmentData = await prisma.appointment.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  const hasNewAppointments = appointmentData.length > 0;

  return (
    <div className="flex rounded-xl overflow-hidden">
      <div className="flex flex-col justify-start items-start  overflow-hidden">
        <div>
          <div className="flex items-center mb-5 gap-1">
            <h3 className="light:text-black text-3xl font-semibold  ">
              Appointments
            </h3>
            <span
              className={`w-8 h-8 ${
                appointmentData.length === 0 ? "hidden" : null
              } flex rounded-full -top-4 -right-4 bg-red-600 text-white text-lg items-center font-bold justify-center`}
            >
              {appointmentData.length}
            </span>
            <Link href="/Appointments-Page">
              <ArrowUpRight size={35} strokeWidth={1} />
            </Link>
          </div>
          <Link href="/Appointment-Creation">
            <Button>Create Appointment</Button>
          </Link>
        </div>
        <div className="flex flex-wrap gap-4 mt-3">
          {hasNewAppointments ? (
            appointmentData.map((data, idx) => (
              <AppointmentCard appointmentData={data} key={data.id} />
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
