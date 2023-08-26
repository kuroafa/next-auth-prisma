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
    <div className="flex  rounded-xl w-full    relative  ">
      <div className="flex flex-col justify-start items-start  ">
        <div>
          <div className="flex items-center mb-5 gap-1">
            <h3 className="light:text-black text-3xl font-semibold  ">
              Upcoming Appointments
            </h3>
            <Link href="/Appointments-Page">
                <ArrowUpRight size={35} strokeWidth={1} />
              </Link>
          </div>
          <Link href="/Appointment-Creation">
            <Button>Create Appointment</Button>
          </Link>
  
        </div>
        <div className=" mt-5 ">
          {
            hasNewAppointments ? (
              <div className="flex gap-2">
                <h2 className="text-lg font-semibold">Upcoming Appointments -</h2> <h3 className="font-bold">{appointmentData.length}</h3> 
              </div>
            ) : (
              <p>No appointments created today</p>
            )
          }
          {appointmentData.map((data, idx) => (
            <AppointmentCard appointmentData={data} key={data.id} />
          ))}
        </div>
     
      </div>
    </div>
  );
};

export default AppointmentsSection;
