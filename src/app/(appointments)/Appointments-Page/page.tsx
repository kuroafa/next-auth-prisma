import SearchAppointments from "@/components/SearchAppointments";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import React from "react";

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
    <div className="pt-5">
      <h1 className="text-4xl font-semibold">Appointments</h1>
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
