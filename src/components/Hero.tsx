"use client";

import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ThemeToggle } from "./navbar/ThemeToggle";
import UserAccountNav from "./navbar/UserAccountNav";
import SignInButton from "./navbar/SignInButton";
import { getAuthSession } from "@/lib/next-auth";
import Navbar from "./navbar/Navbar";
import Link from "next/link";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="flex flex-col gap-10 xl:p-20 lg:p-20 p-10 ">
      <div className="pt-10 ">
        <h1 className="logo light:text-gray-950 text-[50px]  xl:text-[80px]  lg:text-[80px]  md:text-[60px]  ">
          Welcome To{" "}
          <strong className=" light:text-black dark:text-white">
            Realtor.io
          </strong>
        </h1>
        <p className="logo light:text-gray-950  text-[30px]  xl:text-[50px]  lg:text-[40px]  md:text-[40px]  ">
          Revitalizing Dashboards: Modern Insights, Engaging Perspectives
        </p>

        <div>
          <h2 className="logo light:text-gray-950 pt-3  text-[22px]  xl:text-[30px]  lg:text-[30px]  md:text-[25px]">
            Made by Realtor&apos;s <strong>FOR</strong> Realtor&apos;s
          </h2>
          <div className="relative flex gap-5">
            <Link href="/learnmore">
              <Button className="dark:bg-gray-700 rounded-xl dark:text-white bg-black light:bg-black text-[20px] p-6 mt-5">
                Learn More
              </Button>
            </Link>

            <button
              type="button"
              onClick={() => {
                signIn("google").catch(console.error);
              }}
              className="mt-5"
            >
              <Image
                src="/google.png"
                alt="google sign"
                width={40}
                height={40}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
