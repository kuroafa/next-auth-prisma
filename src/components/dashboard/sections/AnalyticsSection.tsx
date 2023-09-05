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
import { Client } from "@prisma/client";

type Props = {
  clientCount: number;
  appointmentCount: number;
  pipeline: { _sum: { budget: number } };
  chartData: Pick<Client, "budget">[];
};

const AnalyticsSection = ({
  clientCount,
  appointmentCount,
  pipeline,
  chartData,
}: Props) => {
  const { budget } = pipeline._sum; //pipeline._sum.budget

  const inPipline = budget * 0.03;

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
              ${inPipline ? inPipline.toLocaleString() : 0}
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
          <ClosingsChart chartData={chartData} />
        </div>
      </div>
    </>
  );
};

export default AnalyticsSection;
