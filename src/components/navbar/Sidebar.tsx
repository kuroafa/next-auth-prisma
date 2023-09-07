"use client";
import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { FiSettings } from "react-icons/fi";
import { BsRobot } from "react-icons/bs";
import { Divide as Hamburger } from "hamburger-react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineIntegrationInstructions,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import { ThemeToggle } from "./ThemeToggle";
import UserAccountNav from "./UserAccountNav";
import SignInButton from "./SignInButton";
import { getAuthSession } from "@/lib/next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsHamburgerActive(!isHamburgerActive);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setIsHamburgerActive(false);
  };

  return (
    <div className="">
      <Disclosure className="" as="nav">
        {({ open }) => (
          <>
            <Disclosure.Button
              className="absolute top-6 right-5 inline-flex items-center peer justify-center rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group"
              onClick={toggleSidebar}
            >
              <div className="block lg:hidden " aria-hidden="true">
                <Hamburger size={35} toggled={isHamburgerActive} />
              </div>
            </Disclosure.Button>
            <div
              className={`pt-6 w-[250px] h-screen z-20 lg:relative absolute top-0 overflow-x-hidden ${
                isSidebarOpen
                  ? "absolute left-0 peer-focus:left-0 peer:transition lg:transparent dark:bg-black bg-black text-white bg-opacity-95 ease-out delay-150 duration-200 w-60 lg:w-60 md:w-60  lg:left-0"
                  : "-left-96 lg:w-60 lg:left-0"
              }`}
            >
              <div className="flex flex-col justify-between h-full items-center w-full">
                <div>
                  <Link
                    href="/dashboard"
                    className="flex flex-col gap-1 items-center justify-center"
                  >
                    <button onClick={closeSidebar}>
                      <p className="text-md">Clients & Appointments</p>
                      <h1 className="text-4xl font-bold italic ">Meetly</h1>
                    </button>
                  </Link>
                  <div className="my-4  border-gray-100 flex flex-col gap-4 mt-8">
                    <Link onClick={closeSidebar} href="/dashboard">
                      <Button variant="ghost">
                        <MdOutlineSpaceDashboard className="text-2xl light:text-gray-900 group:hover:text-white mr-4" />
                        Dashboard
                      </Button>
                    </Link>
                    <Link onClick={closeSidebar} href="/Clients">
                      <Button variant="ghost">
                        <CgProfile className="text-2xl light:text-gray-900 group:hover:text- mr-4" />
                        Clients
                      </Button>
                    </Link>
                    <Link onClick={closeSidebar} href="/notes">
                      <Button variant="ghost">
                        <FaRegComments className="text-2xl light:text-gray-900 group:hover:text-white mr-4" />
                        Notes
                      </Button>
                    </Link>
                    <Link onClick={closeSidebar} href="/Appointments-Page">
                      <Button variant="ghost">
                        <MdOutlineAnalytics className="text-2xl light:text-gray-900 group:hover:text-white mr-4" />
                        Appointments
                      </Button>
                    </Link>
                    <Link onClick={closeSidebar} href="/email">
                      <Button variant="ghost">
                        <MdOutlineIntegrationInstructions className="text-2xl light:text-gray-900 group:hover:text-white mr-5" />
                        Email
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className=" border-gray-100 -ml-10 mb-14">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      signOut().catch(console.error);
                    }}
                  >
                    <MdOutlineLogout className="text-2xl light:text-gray-900 group:hover:text-white mr-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Sidebar;
