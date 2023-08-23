import React from "react";
import Link from "next/link";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import Image from "next/image";
import { AiOutlineCheck } from "react-icons/ai";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import SignInButton from "./SignInButton";

type Props = {};

const LearnMore = (props: Props) => {
  return (
    <div>
      <div className="pl-10 pt-20 ">
        <Link href="/">
          <MdOutlineArrowBackIosNew size={40} />
        </Link>
      </div>
      <div className="flex flex-col gap-4 xl:p-20 lg:p-20 p-10">
        <h2 className="logo text-5xl font-semibold">
          AI-Powered Dashboards: Elevating Insights and Experiences
        </h2>
        <p className="logo text-2xl font-light">
          Unlocking Intelligence: Your Guide to AI-Enhanced Dashboards
        </p>
        <ul className="flex flex-col gap-1 text-xl">
          <li className="flex items-center gap-1">
            <AiOutlineCheck /> AI Chat-bot
          </li>
          <li className="flex items-center gap-1">
            <AiOutlineCheck />
            Modern Dashboard
          </li>
          <li className="flex items-center gap-1">
            <AiOutlineCheck />
            Lead gathering & organization
          </li>
          <li className="flex items-center gap-1">
            <AiOutlineCheck />
            Smart Decisions
          </li>
        </ul>
      </div>
      <div className="flex  items-center  flex-wrap  ">
        <div className="xl:p-20 lg:p-20 p-10">
          <h2 className="logo text-5xl font-light pb-1 ">Features</h2>
          <div className="flex flex-col gap-10 pt-2">
            <div>
              <h2 className="logo text-2xl font-semibold border-b w-fit pb-1 border-gray-400">
                AI chat-bot
              </h2>
              <p className="text-xl pt-2">
                Utilize the power of your own personal AI assistant.
              </p>
            </div>
            <div>
              <h2 className="logo text-2xl font-semibold border-b w-fit pb-1 border-gray-400">
                Dashboard
              </h2>
              <p className="text-xl pt-2">
                Providing you with the latest industry tools to SUCCESSED.
                <br /> A Dashboard made specifically for Real Estate Agents.
              </p>
            </div>
            <div>
              <h2 className="logo text-2xl font-semibold border-b w-fit pb-1 border-gray-400">
                Analyzed Data{" "}
              </h2>
              <p className="text-xl pt-2">
                Focus on finding leads, Leave all the DATA to US.
                <br />
                Our goal is to make sure you know what&apos;s really going on.
              </p>
            </div>
          </div>
        </div>
        <div className="xl:p-20 lg:p-20 p-10">
          <Card className=" dark:bg-gray-900 p-3 w-[350px] h-[200px] ">
            <CardTitle className="p-4 text-[20px]">
              Give Realtor.io a Try!
            </CardTitle>
            <CardDescription className="p-4 dark:text-gray-500 -mt-5 text-[18px]">
              Utilize the power of Ai in your Dashboard
            </CardDescription>
            <CardContent className="-ml-2">
              <SignInButton text="Sign In" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
