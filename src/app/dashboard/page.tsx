import AnalyticsSection from "@/components/dashboard/sections/AnalyticsSection";
import ClientsSection from "@/components/dashboard/sections/ClientsSection";
import { getAuthSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import AppointmentsSection from "@/components/dashboard/sections/AppointmentsSection";
import { prisma } from "@/lib/db";
import { Loader2 } from "lucide-react";
type Props = {};

export const metadata = {
  title: "Dashboard | Realtor.io",
};

const DashboardPage = async (props: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  const countClients = await prisma.client.count({
    where: {
      userId: session.user.id,
    },
  });
  const countAppointments = await prisma.appointment.count({
    where: {
      userId: session.user.id,
    },
  });

  const getPipeline = await prisma.client.aggregate({
    _sum: {
      budget: true,
    },
    where: {
      userId: session.user.id,
    },
  });

  const getChartData = await prisma.client.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      budget: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="grid grid-col-1 xl:grid-cols-4 gap-4 pt-8 ">
      {/* Graphs/Data */}
      <div className="col-span-3">
        <AnalyticsSection
          appointmentCount={countAppointments}
          clientCount={countClients}
          pipeline={getPipeline}
          chartData={getChartData}
        />
      </div>
      <div className="col-span-3 xl:col-span-1">
        <ClientsSection dashboardMode />
      </div>
      <div className="col-span-3 xl:col-span-4 h-fit">
        <AppointmentsSection dashboardMode />
      </div>
    </div>
  );
};

export default DashboardPage;
