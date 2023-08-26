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

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Disclosure className="" as="nav">
        {({ open }) => (
          <>
            <Disclosure.Button
              className="absolute top-2 right-5 inline-flex items-center peer justify-center rounded-md p-4 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group"
              onClick={toggleSidebar}
            >
              <div className="block lg:hidden h-6 w-6" aria-hidden="true">
                <Hamburger />
              </div>
            </Disclosure.Button>
            <div
              className={`p-6 w-[200px] h-screen z-20 lg:relative absolute top-0  ${
                isSidebarOpen
                  ? "absolute left-0 peer-focus:left-0 peer:transition lg:transparent  dark:bg-slate-900 bg-gray-200 bg-opacity-95 ease-out delay-150 duration-200 w-60 lg:w-60 md:w-60  lg:left-0"
                  : "-left-96 lg:w-60 lg:left-0"
              }`}
            >
              <div className="flex flex-col justify-start items-center">
                <h1 className="text-[25px] text-center cursor-pointer font-bold light:text-black border-b border-gray-400 pb-4 w-fit">
                  Realtor.io
                </h1>
                <div className="my-4  border-gray-100 pb-4">
                  <Link href="/dashboard">
                    <div className="flex mb-2 justify-start items-center gap-4 pl-5  p-2 rounded-md group cursor-pointer hover:text-gray-500  m-auto ">
                      <MdOutlineSpaceDashboard className="text-2xl light:text-gray-900 group:hover:text-white" />
                      <h3 className="text-base light:text-gray-800 pt-1  font-semibold">
                        Dashboard
                      </h3>
                    </div>
                  </Link>
                  <Link href="/Clients">
                    <div className="flex mb-2 justify-start items-center gap-4 pl-5  p-2 rounded-md group cursor-pointer hover:text-gray-500  m-auto ">
                      <CgProfile className="text-2xl light:text-gray-900 group:hover:text-white" />
                      <h3 className="text-base light:text-gray-800 pt-1  font-semibold">
                        Clients
                      </h3>
                    </div>
                  </Link>
                  <Link href="/notes">
                    <div className="flex mb-2 justify-start items-center gap-4 pl-5  p-2 rounded-md group cursor-pointer hover:text-gray-500  m-auto ">
                      <FaRegComments className="text-2xl light:text-gray-900 group:hover:text-white" />
                      <h3 className="text-base light:text-gray-800 pt-1  font-semibold">
                        Notes
                      </h3>
                    </div>
                  </Link>
                  <Link href="/analytics">
                    <div className="flex mb-2 justify-start items-center gap-4 pl-5  p-2 rounded-md group cursor-pointer hover:text-gray-500  m-auto ">
                      <MdOutlineAnalytics className="text-2xl light:text-gray-900 group:hover:text-white" />
                      <h3 className="text-base light:text-gray-800 pt-1  font-semibold">
                        Analytics
                      </h3>
                    </div>
                  </Link>
                  <Link href='/email'>
                    <div className="flex mb-2 justify-start items-center gap-4 pl-5  p-2 rounded-md group cursor-pointer hover:text-gray-500  m-auto ">
                      <MdOutlineIntegrationInstructions className="text-2xl light:text-gray-900 group:hover:text-white" />
                      <h3 className="text-base light:text-gray-800 pt-1  font-semibold">
                        Email
                      </h3>
                    </div>
                  </Link>
                  <Link href='/Ai-email'>
                    <div className="flex mb-2 justify-start items-center gap-4 pl-5  p-2 rounded-md group cursor-pointer hover:text-gray-500  m-auto ">
                      <BiMessageSquareDots className="text-2xl light:text-gray-900 group:hover:text-white" />
                      <h3 className="text-base light:text-gray-800 pt-1  font-semibold">
                        AI-Email
                      </h3>
                    </div>
                  </Link>
                </div>
                <div className="my-4 -ml-[40px]  border-gray-100 pb-4">
                  <div className="flex mb-2 justify-start items-center gap-4 pl-5  p-2 rounded-md group cursor-pointer hover:text-gray-500  m-auto ">
                    <MdOutlineSettings className="text-2xl light:text-gray-900 group:hover:text-white" />
                    <h3 className="text-base light:text-gray-800 pt-1  font-semibold">
                      Settings
                    </h3>
                  </div>
                  <div className="flex mb-2 justify-start items-center gap-4 pl-5  p-2 rounded-md group cursor-pointer hover:text-gray-500  m-auto ">
                    <MdOutlineMoreHoriz className="text-2xl light:text-gray-900 group:hover:text-white" />
                    <h3 className="text-base light:text-gray-800 pt-1  font-semibold">
                      Help
                    </h3>
                  </div>
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
