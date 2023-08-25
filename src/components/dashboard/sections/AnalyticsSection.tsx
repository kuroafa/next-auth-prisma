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

type Props = {};

const AnalyticsSection = (props: Props) => {
  return (
    <>
      <div className="flex flex-col gap-4 col-span-2">
        <div className="flex gap-4">
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
                  Active Listings
                </CardTitle>
              </CardHeader>
              <CardContent className="text-3xl -mt-2 font-semibold">
                <h2>30</h2>
              </CardContent>
            </div>
            <div className="w-14 h-14">
              <CircularProgressbar
                value={40}
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
                43
              </CardContent>
            </div>
            <div className="w-14 h-14">
              <CircularProgressbar
                value={73}
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
        <div className="w-full">
          {/* <ClosingsChart /> */}
          <Card>
            <CardHeader>
              Closings each month Chart // Line Chart from Chartjs
            </CardHeader>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AnalyticsSection;
