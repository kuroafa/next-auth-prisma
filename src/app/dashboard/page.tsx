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
import Notifications from "@/components/dashboard/sections/Notifications";
import ActitvitySection from "@/components/dashboard/sections/ActitvitySection";
import TodayTaskSection from "@/components/dashboard/sections/TodayTaskSection";

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
    <div className="grid grid-col-1 lg:grid-cols-4 h-auto place-content-center m-[15px]   pt-8">
      {/* Graphs/Data */}
      <div className="col-start-1 col-span-3">
        <AnalyticsSection />
         <div className=" flex flex-col xl:flex-row   gap-5 mt-5  rounded-xl">
            <ClientsSection />
            <AppointmentsSection />
            
            
          </div>
      </div>
      
      {/* New Clients */}
      <div>
        <div className="flex flex-wrap  w-fit  ml-5  gap-5">
         
          <div className="light:bg-slate-100 pt-5 flex flex-col gap-5 rounded-xl">
            <Notifications/>
            <ActitvitySection/>
            <TodayTaskSection/>
          </div>
        </div>
        {/* <div className="w-full  ml-10 mt-5 h-fit">
          <h1 className="text-3xl font-bold ">Try Out Realtor AI</h1>
          <p className="text-xl font-semibold">AI made for Realtors. Copywrite, Ask questions, Ask for suggestions, Email templates.</p>
        </div> */}
      </div>
    </div>
  );
};

export default DashboardPage;
