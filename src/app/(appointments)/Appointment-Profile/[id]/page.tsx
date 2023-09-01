import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";
import dayjs from "dayjs";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export const metadata = {
  title: "Appointment",
};

const page = async ({ params: { id } }: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/");
  }
  const getAppointment = await prisma.appointment.findUnique({
    where: {
      id: id,
    },
  });

  const getClient = await prisma.client.findUnique({
    where: {
      id: getAppointment?.clientId,
    },
  });

  let unixDate = parseInt(getAppointment?.date ? getAppointment.date : "null");

  const date = new Date(unixDate).toDateString();

  let unixTime = parseInt(getAppointment?.time ? getAppointment.time : "null");

  const time = new Date(unixTime).toLocaleTimeString();

  console.log(time);

  return (
    <div>
      <h1 className="text-5xl font-semibold mt-[50px] ">Appointment Details</h1>

      <div>
        <h2 className="text-2xl mt-5">
          Client: <span className="font-bold">{getClient?.name}</span>
        </h2>
        <h2 className="text-2xl mt-5">
          Appointment with:
          <span className="font-bold ">{getAppointment?.name}</span>
        </h2>
        <h2 className="text-2xl mt-5">
          Reason: <span className="font-bold">{getAppointment?.type}</span>
        </h2>
        <h2 className="text-2xl mt-5">
          Date:{" "}
          <span className="font-bold">
            {`${date.slice(0, 3)}, ${date.slice(3)}`}
          </span>
        </h2>
        <h2 className="text-2xl mt-5">
          Time: <span className="font-bold">{time}</span>
        </h2>
        <h2 className="text-2xl mt-5">
          Address:{" "}
          <span className="font-bold">
            {getAppointment?.address}, bronx, New York
          </span>
        </h2>
      </div>
    </div>
  );
};

export default page;
