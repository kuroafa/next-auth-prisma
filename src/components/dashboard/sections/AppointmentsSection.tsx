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

  console.log(appointmentData);

  console.log(appointmentData);

  console.log(appointmentData);

  return (
    <div className="flex  rounded-xl w-full    relative  ">
      <div className="flex flex-col justify-start items-start  ">
        <div>
          <h3 className="light:text-black text-3xl font-semibold mb-5 ">
            Today&apos;s Appointments
          </h3>
          <Link href="/Appointment-Creation">
            <Button>Create Appointment</Button>
          </Link>
        </div>
        <div className="  ">
          {appointmentData.map((data, idx) => (
            <AppointmentCard appointmentData={data} key={data.id} />
          ))}
        </div>
        <Link className="pt-5 flex gap-2 items-center pl-1" href="/Appointments-Page">View More Appointments  <MoveRight
              size={30}
              strokeWidth={1}
              className="hover:text-gray-700"
            /></Link>
      </div>
    </div>
  );
};

export default AppointmentsSection;
