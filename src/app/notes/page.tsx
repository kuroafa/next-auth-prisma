import React from "react";
import { getAuthSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import SignInButton from "@/components/navbar/SignInButton";
import { ThemeToggle } from "@/components/navbar/ThemeToggle";
import UserAccountNav from "@/components/navbar/UserAccountNav";

type Props = {};

const pages = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return (
    <div>
      <div className="lg:ml-[210px] mt-20">
        <h1 className="text-7xl">Notes</h1>
        <div className="flex flex-col gap-5 pt-10">
          <h2 className="text-3xl font-semibold">Important</h2>
          <div className="flex gap-2 flex-wrap">
            <div className="bg-gray-400 w-[300px] h-[150px] rounded-xl"></div>
            <div className="bg-gray-400 w-[300px] h-[150px] rounded-xl"></div>
            <div className="bg-gray-400 w-[300px] h-[150px] rounded-xl"></div>
            <div className="bg-gray-400 w-[300px] h-[150px] rounded-xl"></div>
          </div>
        </div>
        <div className="flex flex-col gap-5 pt-10">
          <h2 className="text-3xl font-semibold">Not as important</h2>
          <div className="flex gap-2 flex-wrap">
            <div className="bg-gray-400 w-[300px] h-[150px] rounded-xl"></div>
            <div className="bg-gray-400 w-[300px] h-[150px] rounded-xl"></div>
            <div className="bg-gray-400 w-[300px] h-[150px] rounded-xl"></div>
            <div className="bg-gray-400 w-[300px] h-[150px] rounded-xl"></div>
          </div>
        </div>
        <div className="flex flex-col gap-5 pt-10">
          <h2 className="text-3xl font-semibold">basic info</h2>
          <div className="flex gap-2 flex-wrap">
            <div className="bg-gray-400 w-[300px] h-[150px] rounded-xl"></div>
            <div className="bg-gray-400 w-[300px] h-[150px] rounded-xl"></div>
            <div className="bg-gray-400 w-[300px] h-[150px] rounded-xl"></div>
            <div className="bg-gray-400 w-[300px] h-[150px] rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default pages;
