import { prisma } from "@/lib/db";
import React from "react";
import { redirect } from "next/navigation";
import ClientProfile from "@/components/ClientProfile";
import { getAuthSession } from "@/lib/next-auth";
import AppointmentsSection from "@/components/dashboard/sections/AppointmentsSection";
import AppointmentCard from "@/components/dashboard/components/AppointmentCard";
import { da } from "date-fns/locale";


type ClientProfilePageProps = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: ClientProfilePageProps) => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/");
  }

  const clientData = await prisma.client.findUnique({
    where: {
      id: id,
    },
  });

  const clientAppoints = await prisma.appointment.findMany({
    where: {
      clientId: id,
    },
  });

  return (
    <div className="mt-10 flex flex-col md:pr-8">
      <h2 className="text-lg font-thin">Client Profile</h2>
      <div className="flex flex-col md:flex-row gap-8 w-full">
        <ClientProfile clientData={clientData} />

        <div className="mt-12 flex-1">
          <h2 className="text-2xl font-semibold">Client Appointments</h2>
          {clientAppoints.length ? (
            clientAppoints.map((data, idx) => (
              <AppointmentCard appointmentData={data} key={data.id} />
            ))
          ) : (
            <h2 className="font-thin mt-4">No Appointments Found</h2>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default page;
