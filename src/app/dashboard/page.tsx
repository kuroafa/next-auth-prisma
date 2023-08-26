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
import AppointmentForm from "@/components/AppointmentForm";
import AppointmentsSection from "@/components/dashboard/sections/AppointmentsSection";

type Props = {
  id: string;
  name: string;
  address: string;
  time: number;
  completed: boolean;
};

export const metadata = {
  title: "Dashboard | Realtor.io",
};

const DashboardPage = async ({ name, address, time, completed, id }: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  // const fetchAppointment = await prisma.appointment.findMany({
  //   where: {
  //     name: name,
  //     address: address,
  //     time: time,
  //     completed: completed,
  //   },
  // });

  return (
    <div className="grid grid-col-1 lg:grid-cols-3 gap-8 pr-10 pt-8">
      {/* Graphs/Data */}
      <AnalyticsSection />
      {/* New Clients */}
      <ClientsSection />
      {/* Appointments */}
      <AppointmentsSection />
    </div>
  );
};

export default DashboardPage;
