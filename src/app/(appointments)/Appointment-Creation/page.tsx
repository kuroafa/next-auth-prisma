import AppointmentForm from "@/components/forms/AppointmentForm";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

export const metadata = {
  title: "Add Appointment",
};

const page = async (props: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/");
  }

  const getClients = await prisma.client.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div>
      <AppointmentForm clientData={getClients} />
    </div>
  );
};

export default page;
