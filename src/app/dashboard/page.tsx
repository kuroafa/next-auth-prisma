import React from "react";
import { CgProfile } from "react-icons/cg";
import { TfiArrowRight } from "react-icons/tfi";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/next-auth";
import { ThemeToggle } from "@/components/ThemeToggle";
import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar";
import SignInButton from "@/components/SignInButton";
import UserAccountNav from "@/components/UserAccountNav";
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

type Props = {
  user: string;
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
    <div className="  ">
      {/* Page header */}
      <div className="flex items-center justify-between w-full gap-4 absolute xl:right-5 lg:right-5 md:right-20 right-20 top-7 ">
        <div className="lg:ml-[230px] ml-[100px] ">
          <h2 className="font-semibold text-[15px]">
            Welcome, {session?.user.name}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle className="relative" />
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <SignInButton text="Sign In" />
          )}
        </div>
      </div>
      {/* New Clients */}
      <ClientsSection />
      {/* Graphs/Data */}
      <div className="flex lg:ml-10 ml-5 gap-5  -mt-5  flex-col xl:flex-row      ">
        <div className="  w-fit">
          <div className=" bg-gray-500 xl:w-[600px] mt-20 lg:w-[600px] md:w-[600px] lg:ml-[200px] md:ml-[0] w-[365px] h-[400px]   rounded-xl"></div>
        </div>
        <div className="  w-fit">
          <div className=" bg-gray-600 xl:w-[500px] xl:mt-20 lg:w-[600px] md:w-[600px]  w-[365px] h-[400px] xl:ml-0 lg:ml-[200px] md:ml-[0]  rounded-xl"></div>
        </div>
      </div>
      {/* current Leads & Appointments Container */}
      <div className="flex flex-wrap bg-gray-500 items-center justify-start  -ml-4  xl:pt-0 lg:pt-7 md:ml-0 pt-1 md:pt-7 sm:pt-7">
        {/* Current Leads List 1 */}
        <div className="flex  items-center rounded-xl w-fit sm:-mt-8 xl:mt-5  relative lg:ml-[200px] md:ml-[0]  ">
          <div className="flex flex-col justify-start items-start  p-10">
            <h3 className="light:text-black text-3xl pb-3 font-semibold  ">
              Current Lead Status
            </h3>
            <div className="">
              <div className="-ml-[10px]">
                <Table>
                  <TableCaption>A list of your recent Leads</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px] ">Name</TableHead>
                      <TableHead className="w-[150px]">Status</TableHead>
                      <TableHead className="w-[150px]">Email</TableHead>
                      <TableHead className="text-right">Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium h-[50px]">
                        James Ahmed
                      </TableCell>
                      <TableCell>not ready</TableCell>
                      <TableCell>JAhmed@example.com</TableCell>
                      <TableCell className="text-right">Buy</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium h-[50px]">
                        James Ahmed
                      </TableCell>
                      <TableCell>not ready</TableCell>
                      <TableCell>JAhmed@example.com</TableCell>
                      <TableCell className="text-right">Buy</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium h-[50px]">
                        James Ahmed
                      </TableCell>
                      <TableCell>not ready</TableCell>
                      <TableCell>JAhmed@example.com</TableCell>
                      <TableCell className="text-right">Buy</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium h-[50px]">
                        James Ahmed
                      </TableCell>
                      <TableCell>not ready</TableCell>
                      <TableCell>JAhmed@example.com</TableCell>
                      <TableCell className="text-right">Buy</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
        {/* Current Leads List 2 */}
        <div className="flex  items-center rounded-xl w-fit sm:-mt-8 xl:mt-5  relative  ml-0   ">
          <div className="flex flex-col justify-start items-start  p-10">
            <h3 className="light:text-black text-3xl pb-3 font-semibold  ">
              Current Lead Status
            </h3>
            <div className="">
              <div className="-ml-[10px]">
                <Table>
                  <TableCaption>A list of your recent Leads</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px] ">Name</TableHead>
                      <TableHead className="w-[150px]">Status</TableHead>
                      <TableHead className="w-[150px]">Email</TableHead>
                      <TableHead className="text-right">Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium h-[50px]">
                        James Ahmed
                      </TableCell>
                      <TableCell>not ready</TableCell>
                      <TableCell>JAhmed@example.com</TableCell>
                      <TableCell className="text-right">Buy</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium h-[50px]">
                        James Ahmed
                      </TableCell>
                      <TableCell>not ready</TableCell>
                      <TableCell>JAhmed@example.com</TableCell>
                      <TableCell className="text-right">Buy</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium h-[50px]">
                        James Ahmed
                      </TableCell>
                      <TableCell>not ready</TableCell>
                      <TableCell>JAhmed@example.com</TableCell>
                      <TableCell className="text-right">Buy</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium h-[50px]">
                        James Ahmed
                      </TableCell>
                      <TableCell>not ready</TableCell>
                      <TableCell>JAhmed@example.com</TableCell>
                      <TableCell className="text-right">Buy</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Appointments */}
      <div className="flex items-center rounded-xl w-fit   lg:ml-[200px] md:ml-[0]  relative  ">
        <div className="flex flex-col justify-start items-start  p-10">
          <h3 className="light:text-black text-3xl font-semibold mb-5 ">
            Today&apos;s Appointments
          </h3>
          <div className="flex gap-3 flex-wrap ">
            <div className="flex gap-5 bg-slate-400 rounded-xl p-5">
              <h3>Name</h3>
              <p>Address</p>
              <h3>Time</h3>
              <h3>complete yes/no</h3>
            </div>
            <div className="flex gap-5 bg-slate-400 rounded-xl p-5">
              <h3>Name</h3>
              <p>Address</p>
              <h3>Time</h3>
              <h3>complete yes/no</h3>
            </div>
            <div className="flex gap-5 bg-slate-400 rounded-xl p-5">
              <h3>Name</h3>
              <p>Address</p>
              <h3>Time</h3>
              <h3>complete yes/no</h3>
            </div>
            <div className="flex gap-5 bg-slate-400 rounded-xl p-5">
              <h3>Name</h3>
              <p>Address</p>
              <h3>Time</h3>
              <h3>complete yes/no</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
