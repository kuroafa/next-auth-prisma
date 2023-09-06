"use client";
import Link from "next/link";
import React from "react";

import SignInButton from "./navbar/SignInButton";
import Image from "next/image";
import heroImg from "../../public/heroGif.gif";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="flex flex-col">
      <div className=" flex flex-wrap flex-col-reverse xl:flex-row lg:flex-row md:flex-row sm:flex-row gap-10 ">
        <div className="logo flex flex-col text-[20px]">
          <h1 className="font-semibold text-[30px] pb-2">Discover</h1>
          <Link href="/">What Is Meetly?</Link>
          <Link href="/">Developer</Link>
          <Link href="/">Sign In</Link>
          <Link href="/">Github</Link>
        </div>
        <div className="logo flex flex-col text-[20px]">
          <h1 className="font-semibold text-[30px] pb-2">Socials</h1>
          <Link href="/">LinkedIn</Link>
          <Link href="/">Instagram</Link>
          <Link href="/">Github</Link>
          <Link href="/">Email</Link>
        </div>
        <div className="flex flex-wrap items-center w-80">
          <Image
            className=""
            width={400}
            height={300}
            src={heroImg}
            alt="GIF"
          />
        </div>
      </div>
      <div className="w-full py-4">
        <p>&copy; Made by Mustafa R. & Nader A.</p>
      </div>
    </div>
  );
};

export default Footer;
