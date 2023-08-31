"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ClosingsChart from "../components/ClosingsChart";
import { MdOutlineAnalytics } from "react-icons/md";

type Props = {
  clientCount: number;
  appointmentCount: number;
};

const AnalyticsSection = ({ clientCount, appointmentCount }: Props) => {
  return (
    <>
      <h2 className="light:text-black text-3xl font-semibold flex items-center gap-1">
        Analytics
        <MdOutlineAnalytics
          size={35}
          className="text-2xl light:text-gray-900 group:hover:text-white"
        />
      </h2>
      <div className="flex flex-col gap-4 col-span-2 mt-5">
        <div className="flex gap-4 flex-wrap">
          <Card className="flex-1 h-fit pr-10 ">
            <CardHeader>
              <CardTitle className="text-xl font-light">In Pipeline</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl -mt-2 font-semibold">
              $132,000
            </CardContent>
          </Card>
          <Card className="flex-1 h-fit pr-10 flex items-center justify-between">
            <div>
              <CardHeader>
                <CardTitle className="text-xl whitespace-nowrap font-light">
                  Appointments
                </CardTitle>
              </CardHeader>
              <CardContent className="text-3xl -mt-2 font-semibold">
                {appointmentCount}
              </CardContent>
            </div>
            <div className="w-14 h-14">
              <CircularProgressbar
                value={appointmentCount * 10}
                strokeWidth={20}
                className="fill-gray-100"
                styles={buildStyles({
                  strokeLinecap: "butt",
                  textSize: "16px",
                  pathTransitionDuration: 0.5,
                  pathColor: `rgba(255, 102, 102)`,
                  textColor: "#ff2323",
                  trailColor: "#d6d6d6",
                  backgroundColor: "#fd9191",
                })}
              />
            </div>
          </Card>
          <Card className="flex-1 h-fit pr-10 flex items-center justify-between">
            <div>
              <CardHeader>
                <CardTitle className="text-xl whitespace-nowrap font-light">
                  Current Clients
                </CardTitle>
              </CardHeader>
              <CardContent className="text-3xl -mt-2 font-semibold">
                {clientCount}
              </CardContent>
            </div>
            <div className="w-14 h-14">
              <CircularProgressbar
                value={clientCount * 10}
                strokeWidth={20}
                className="fill-gray-100"
                styles={buildStyles({
                  strokeLinecap: "butt",
                  textSize: "16px",
                  pathTransitionDuration: 0.5,
                  pathColor: `rgba(100, 200, 150)`,
                  textColor: "#ff2323",
                  trailColor: "#d6d6d6",
                  backgroundColor: "#fd9191",
                })}
              />
            </div>
          </Card>
        </div>

        <div className="flex">
          <Card className="flex-1 overflow-hidden">
            <CardHeader>
              <CardTitle>Closing Rate</CardTitle>
            </CardHeader>
            <CardContent className="overflow-hidden">
              <ClosingsChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AnalyticsSection;
