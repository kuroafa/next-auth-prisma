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
              <div className="flex flex-col justify-start items-center w-full">
                <Link
                  href="/dashboard"
                  className="flex flex-col gap-1 items-center justify-center"
                >
                  <button onClick={closeSidebar}>
                    <p className="text-md">Clients & Appointments</p>
                    <h1 className="text-4xl font-bold italic ">Meetly</h1>
                  </button>
                </Link>
                <div className="my-4  border-gray-100 pb-4">
                  <Link onClick={closeSidebar} href="/dashboard">
                    <div className="flex mb-2 justify-start items-center gap-4 pl-5  p-2 rounded-md group cursor-pointer hover:text-gray-500  m-auto ">
                      <MdOutlineSpaceDashboard className="text-2xl light:text-gray-900 group:hover:text-white" />
                      <h3 className="text-base light:text-gray-800 pt-1  font-semibold">
                        Dashboard
                      </h3>
                    </div>
                  </Link>
                  <Link onClick={closeSidebar} href="/Clients">
                    <div className="flex mb-2 justify-start items-center gap-4 pl-5  p-2 rounded-md group cursor-pointer hover:text-gray-500  m-auto ">
                      <CgProfile className="text-2xl light:text-gray-900 group:hover:text-white" />
                      <h3 className="text-base light:text-gray-800 pt-1  font-semibold">
                        Clients
                      </h3>
                    </div>
                  </Link>
                  <Link onClick={closeSidebar} href="/notes">
                    <div className="flex mb-2 justify-start items-center gap-4 pl-5  p-2 rounded-md group cursor-pointer hover:text-gray-500  m-auto ">
                      <FaRegComments className="text-2xl light:text-gray-900 group:hover:text-white" />
                      <h3 className="text-base light:text-gray-800 pt-1  font-semibold">
                        Notes
                      </h3>
                    </div>
                  </Link>
                  <Link onClick={closeSidebar} href="/Appointments-Page">
                    <div className="flex mb-2 justify-start items-center gap-4 pl-5  p-2 rounded-md group cursor-pointer hover:text-gray-500  m-auto ">
                      <MdOutlineAnalytics className="text-2xl light:text-gray-900 group:hover:text-white" />
                      <h3 className="text-base light:text-gray-800 pt-1  font-semibold">
                        Appointments
                      </h3>
                    </div>
                  </Link>
                  <Link onClick={closeSidebar} href="/email">
                    <div className="flex mb-2 justify-start items-center gap-4 pl-5  p-2 rounded-md group cursor-pointer hover:text-gray-500  m-auto ">
                      <MdOutlineIntegrationInstructions className="text-2xl light:text-gray-900 group:hover:text-white" />
                      <h3 className="text-base light:text-gray-800 pt-1  font-semibold">
                        Email
                      </h3>
                    </div>
                  </Link>
                </div>
                <div className="my-4 -ml-[40px] border-gray-100 pb-4">
                  <button
                    onClick={() => {
                      signOut().catch(console.error);
                    }}
                    className="flex mb-2 justify-start items-center gap-4 pl-5  p-2 rounded-md group cursor-pointer hover:text-gray-500 m-auto "
                  >
                    <MdOutlineLogout className="text-2xl light:text-gray-900 group:hover:text-white" />
                    <h3 className="text-base light:text-gray-800 pt-1  font-semibold">
                      Logout
                    </h3>
                  </button>
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
