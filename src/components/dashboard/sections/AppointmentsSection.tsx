import React from "react";
import AppointmentCard from "../components/AppointmentCard";
import AppointmentForm from "@/components/AppointmentForm";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";

type Props = {};

const AppointmentsSection = async (props: Props) => {
  const session = await getAuthSession();

  const appointmentData = await prisma.appointment.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  console.log(appointmentData);

  return (
    <div className="flex  rounded-xl w-full    relative  ">
      <div className="flex flex-col justify-start items-start  ">
        <div>
          <h3 className="light:text-black text-3xl font-semibold mb-5 ">
            Today&apos;s Appointments
          </h3>
          <AppointmentForm />
        </div>
        <div className="flex gap-3 flex-wrap">
          {appointmentData.map((appointmentData, idx) => {
            <AppointmentCard appointmentData={appointmentData} key={idx} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsSection;
