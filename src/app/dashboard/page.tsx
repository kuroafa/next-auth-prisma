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
import ClosingsChart from "@/components/dashboard/components/ClosingsChart";

type Props = {

};

export const metadata = {
  title: "Dashboard | Realtor.io",
};

const DashboardPage = async (props: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }



  return (
    <div className="grid grid-col-1 lg:grid-cols-2 h-screen   pt-8">
      {/* Graphs/Data */}
      <div>
        <AnalyticsSection />
      </div>
      {/* New Clients */}
      <div className="flex     w-fit  ml-5  gap-5">
        <div className="bg-slate-100 p-5 rounded-xl">
          <ClientsSection />
          {/* Appointments */}
          <AppointmentsSection />
        </div>
        <div className="bg-slate-100 p-5 rounded-xl">
          <ClientsSection />
          
          <AppointmentsSection />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
