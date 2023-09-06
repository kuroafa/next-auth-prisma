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
import { Github, Linkedin } from "lucide-react";
import iPhone from "../../public/iphone-demo.png";
import Tablet from "../../public/tablet-demo.png";

type Props = {};

const Hero = (props: Props) => {
  const clientNum = 292;

  return (
    <>
      <div className="px-0 mt-8 xl:mt-0 xl:p-10 w-full">
        <div className="flex flex-col xl:flex-row items-center justify-center gap-8 md:gap-24">
          <div className="flex flex-col gap-6 md:gap-8 max-w-3xl">
            <div className="self-center md:self-start text-center md:text-start">
              <h1 className="flex flex-col md:hidden">
                <span className="text-2xl font-thin">Welcome to</span>
                <span className="font-extrabold italic text-8xl md:text-4xl">
                  Meetly
                </span>
              </h1>
              <h1 className="text-4xl md:text-6xl font-semibold ">
                <span className="hidden md:block">
                  <span className="italic font-extrabold">Meetly:</span> Your
                  Path to Real Estate Success Begins
                </span>
              </h1>
            </div>
            <p className="text-xl max-w-[30rem]">
              Unlock the potential of your real estate business with our
              cutting-edge CRM solution, designed to streamline client
              management and boost your success.
            </p>
            <div className="flex gap-4 flex-col md:flex-row">
              <Link
                href="/learnmore"
                className="w-full md:w-fit
"
              >
                <Button variant="outline" size="lg" className="w-full">
                  Learn more
                </Button>
              </Link>

              <Button
                type="button"
                onClick={() => {
                  signIn("github").catch(console.error);
                }}
                size="lg"
              >
                Sign in
                <Github className="ml-2" />
              </Button>
            </div>
            <h2 className="text-xl self-center md:self-start">
              <span className="font-bold text-red-600 text-2xl border-b-2 border-black dark:border-white">
                {clientNum}
              </span>{" "}
              Companies Using{" "}
              <span className="font-semibold italic">Meetly</span>
            </h2>
            <div>
              <p className="font-semibold text-sm mb-1">Created By:</p>
              <div className="flex gap-2">
                <span className="flex gap-2 border-2 border-black rounded-xl p-1 dark:border-white items-center justify-center">
                  <p>Mustafa R.</p>
                  <Link
                    href={"https://www.linkedin.com/in/mustafa-rajeh/"}
                    target="_blank"
                  >
                    <Linkedin size={20} />
                  </Link>
                </span>
                <span className="flex gap-2 border-2 border-black rounded-xl p-1 dark:border-white items-center justify-center">
                  <p>Nader A.</p>
                  <Link
                    href={
                      "https://www.linkedin.com/in/nader-abdulrub-69205a192/"
                    }
                  >
                    <Linkedin size={20} />
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <div className="self-center xl:self-end">
            <div className=" bg-gray-200 w-fit dark:bg-gray-600 hidden md:block md:flex relative rounded-tl-full rounded-tr-full rounded-br-3xl rounded-bl-3xl pt-[7rem] px-[7rem]  items-center justify-start">
              <div className="relative min-w-[250px] ">
                <Image src={iPhone} alt="iphone" width={300} />
              </div>
            </div>
            <div className="block md:hidden w-full max-w-[500px]">
              <Image src={iPhone} alt="iphone" width={500} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

// <div className="flex flex-col gap-10">
// <div className="">
//   <h1 className="logo light:text-gray-950 text-[50px]  xl:text-[80px]  lg:text-[80px]  md:text-[60px]  ">
//     Welcome To{" "}
//     <strong className="text-8xl font-bold italic ">Meetly</strong>
//   </h1>
//   <p className="logo light:text-gray-950  text-[30px]  xl:text-[50px]  lg:text-[40px]  md:text-[40px]  ">
//     Revitalizing Dashboards: Modern Insights, Engaging Perspectives
//   </p>

//   <div>
//     <h2 className="logo light:text-gray-950 pt-3  text-[22px]  xl:text-[30px]  lg:text-[30px]  md:text-[25px]">
//       Made by Realtor&apos;s <strong>FOR</strong> Realtor&apos;s
//     </h2>
//     <div className="relative flex gap-5">
//       <Link href="/learnmore">
//         <Button className="dark:bg-gray-700 rounded-xl dark:text-white bg-black light:bg-black text-[20px] p-6 mt-5">
//           Learn More
//         </Button>
//       </Link>

//       <button
//         type="button"
//         onClick={() => {
//           signIn("github").catch(console.error);
//         }}
//         className="mt-5"
//       >
//         <Github size={40} />
//       </button>
//     </div>
//   </div>
// </div>
// </div>
