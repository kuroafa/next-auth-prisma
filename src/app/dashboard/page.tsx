

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
import { prisma } from "@/lib/db";
import AppointmentForm from "@/components/AppointmentForm";
import axios from "axios";
import { DeleteSchema } from "@/lib/type";
import DeleteButton from "@/components/deleteButton";

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

const DashboardPage = async ({name, address, time, completed, id}: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  const fetchAppointment = await prisma.appointment.findMany({
    where:{
      name:name,
      address: address,
      time: time,
      completed: completed
    }
  })

  const deleteAppointment = async (data:DeleteSchema) => {
     const response = await axios.delete('/api/appointments', {
      data: {
        id: id
      }
     })
  }

 

  return (
    <div className="grid grid-cols-2 gap-8 pr-10 pt-8">
      {/* Graphs/Data */}
      <AnalyticsSection />
      {/* New Clients */}
      <ClientsSection />
      {/* Appointments */}
      <div className="flex items-center rounded-xl w-fit   lg:ml-[200px] md:ml-[0]  relative  ">
        <div className="flex flex-col justify-start items-start  p-10">

          <div className="mb-10">
            <h3 className="light:text-black text-3xl font-semibold mb-5 ">
              Today&apos;s Appointments
            </h3>
            <AppointmentForm/>
          </div>
          <div className="flex gap-3 flex-wrap ">
          {
       fetchAppointment.map((appointment)=>{
        return (
          <div className="flex bg-gray-600 w-full rounded-lg p-4 gap-10" key={appointment.id}>
            <h2>{appointment.name}</h2>
            <h2>{appointment.address}</h2>
            <h3>{appointment.time}</h3>
            <h3>{appointment.completed}</h3>
              <DeleteButton
              id={appointment.id}
              />
          </div>
        )
       })
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
