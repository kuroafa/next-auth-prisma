import React from "react";
import { CgProfile } from "react-icons/cg";
import { TfiArrowRight } from "react-icons/tfi";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/next-auth";
import { ThemeToggle } from "@/components/navbar/ThemeToggle";
import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/navbar/Sidebar";
import SignInButton from "@/components/navbar/SignInButton";
import UserAccountNav from "@/components/navbar/UserAccountNav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import DemoPage from "@/components/payments/DemoPage";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ClientCard from "@/components/dashboard/components/ClientCard";
import ClientsSection from "@/components/dashboard/sections/ClientsSection";
import AnalyticsSection from "@/components/dashboard/sections/AnalyticsSection";

import axios from "axios";
import { DeleteSchema } from "@/lib/type";
import { prisma } from "@/lib/db";
import AppointmentForm from "@/components/forms/AppointmentForm";
import AppointmentsSection from "@/components/dashboard/sections/AppointmentsSection";
import ClosingsChart from "@/components/dashboard/components/ClosingsChart";
import Notifications from "@/components/dashboard/sections/Notifications";
import ActitvitySection from "@/components/dashboard/sections/ActitvitySection";
import TodayTaskSection from "@/components/dashboard/sections/TodayTaskSection";
import DashboardSkeleton from "@/components/skeletons/DashboardSkeleton";

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

  return (
    <div className="grid grid-col-1 xl:grid-cols-4 gap-8 pt-8 ">
      {/* Graphs/Data */}
      <div className="col-span-3">
        <AnalyticsSection
          appointmentCount={countAppointments}
          clientCount={countClients}
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
