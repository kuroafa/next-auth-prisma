import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import AppointmentCard from "../components/AppointmentCard";

type Props = {
  dashboardMode: boolean;
};

const AppointmentsSection = async ({ dashboardMode }: Props) => {
  const session = await getAuthSession();

  const appointmentData = await prisma.appointment.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
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
            {appointmentData.length > 0 ? (
              <span
                className={` w-14 h-7 flex rounded-full -top-4 -right-4 bg-red-400 text-white dark:bg-red-500 items-center font-bold justify-center`}
              >
                {appointmentData.length}
              </span>
            ) : null}
            <Link href="/Appointments-Page">
              <ArrowUpRight size={35} strokeWidth={1} />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 w-full mt-2 lg:grid-cols-2 xl:grid-cols-4">
          {hasNewAppointments ? (
            appointmentData.map(
              (data, idx) =>
                idx < 4 && (
                  <AppointmentCard
                    dashboardMode={dashboardMode}
                    appointmentData={data}
                    key={data.id}
                  />
                )
            )
          ) : (
            <h2>No Appointments Found</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsSection;
