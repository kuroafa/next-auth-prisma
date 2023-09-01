import React from "react";
import { Skeleton } from "../ui/skeleton";
import { MdOutlineAnalytics } from "react-icons/md";

type Props = {};

const DashboardSkeleton = (props: Props) => {
  return (
    <>
      <div className="grid grid-col-1 xl:grid-cols-4 gap-8 pt-8">
        <div className="col-span-3 ">
          <div className="font-semibold flex items-center gap-4">
            <Skeleton className="h-8  w-[30%]" />
            <Skeleton className="h-8 w-[30px] rounded-md" />
          </div>
          <div className="flex flex-col gap-4 col-span-2 mt-5 ">
            <div className="flex flex-1 gap-4 flex-wrap">
              <div className=" border-gray-200 dark:border-[#4f4f4f] border-2 rounded-lg flex justify-center flex-col gap-2 space-y-1.5 p-6 min-w-[250px] h-[130px] flex-1">
                <Skeleton className="h-6 w-[50%]" />
                <Skeleton className="h-6 w-[80%]" />
              </div>
              <div className="flex items-center justify-between  border-gray-200 dark:border-[#4f4f4f] border-2 rounded-lg space-y-1.5 min-w-[250px] h-[130px] p-6 flex-1">
                <div className="flex flex-col gap-2 w-full">
                  <Skeleton className="h-6 w-[50%]" />
                  <Skeleton className="h-6 w-[80%]" />
                </div>
                <div>
                  <Skeleton className="w-14 h-14 rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between border-gray-200 dark:border-[#4f4f4f] border-2 rounded-lg space-y-1.5 p-6 min-w-[250px] h-[130px] flex-1">
                <div className="flex flex-col gap-2 w-full">
                  <Skeleton className="h-6 w-[50%]" />
                  <Skeleton className="h-6 w-[80%]" />
                </div>
                <div>
                  <Skeleton className="w-14 h-14 rounded-full" />
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="flex-1 overflow-hidden">
                <div className="mb-4">
                  <Skeleton className="h-8 w-[30%] rounded-xl" />
                </div>
                <div className="border-gray-200 dark:border-[#4f4f4f] border-2 rounded-lg p-4">
                  <Skeleton className="h-[200px] w-full rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 xl:col-span-1">
          {/*Clients*/}
          <div className="flex flex-col gap-5">
            <div className="font-semibold flex items-center gap-4">
              <Skeleton className="h-8  w-[30%]" />
              <Skeleton className="h-8 w-[30px] rounded-md" />
            </div>
            <div className="flex flex-col gap-4 ">
              <div className=" border-gray-200 dark:border-[#4f4f4f] border-2 rounded-lg flex justify-between items-center gap-2 space-y-1.5 p-6 min-w-[250px] min-h-[126px] flex-1">
                <div>
                  <Skeleton className="w-14 h-14 rounded-full" />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Skeleton className="h-6 w-[80%]" />
                  <Skeleton className="h-6 w-[50%]" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 ">
              <div className=" border-gray-200 dark:border-[#4f4f4f] border-2 rounded-lg flex justify-between items-center gap-2 space-y-1.5 p-6 min-w-[250px] min-h-[126px] flex-1">
                <div>
                  <Skeleton className="w-14 h-14 rounded-full" />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Skeleton className="h-6 w-[80%]" />
                  <Skeleton className="h-6 w-[50%]" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 ">
              <div className=" border-gray-200 dark:border-[#4f4f4f] border-2 rounded-lg flex justify-between items-center gap-2 space-y-1.5 p-6 min-w-[250px] min-h-[126px] flex-1">
                <div>
                  <Skeleton className="w-14 h-14 rounded-full" />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Skeleton className="h-6 w-[80%]" />
                  <Skeleton className="h-6 w-[50%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 xl:col-span-4 h-fit">
          {/*Appoints*/}
          <div className="font-semibold flex items-center gap-4 mb-4">
            <Skeleton className="h-8  w-[20%]" />
          </div>
          <div className="flex gap-4 flex-wrap">
            <div className=" border-gray-200 dark:border-[#4f4f4f]   border-2 rounded-lg flex justify-between flex-col items-center gap-2 space-y-1.5 p-6 min-w-[288px] min-h-[151px] flex-1">
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-6 w-[50%]" />
                <Skeleton className="h-6 w-[80%]" />
              </div>
              <div className="w-full">
                <Skeleton className="h-6 w-[60%]" />
              </div>
            </div>
            <div className=" border-gray-200 dark:border-[#4f4f4f]   border-2 rounded-lg flex justify-between flex-col items-center gap-2 space-y-1.5 p-6 min-w-[288px] min-h-[151px] flex-1">
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-6 w-[50%]" />
                <Skeleton className="h-6 w-[80%]" />
              </div>
              <div className="w-full">
                <Skeleton className="h-6 w-[60%]" />
              </div>
            </div>
            <div className=" border-gray-200 dark:border-[#4f4f4f]  border-2 rounded-lg flex justify-between flex-col items-center gap-2 space-y-1.5 p-6 min-w-[288px] min-h-[151px] flex-1">
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-6 w-[50%]" />
                <Skeleton className="h-6 w-[80%]" />
              </div>
              <div className="w-full">
                <Skeleton className="h-6 w-[60%]" />
              </div>
            </div>
            <div className=" border-gray-200 dark:border-[#4f4f4f]   border-2 rounded-lg flex justify-between flex-col items-center gap-2 space-y-1.5 p-6 min-w-[288px] min-h-[151px] flex-1">
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-6 w-[50%]" />
                <Skeleton className="h-6 w-[80%]" />
              </div>
              <div className="w-full">
                <Skeleton className="h-6 w-[60%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSkeleton;
