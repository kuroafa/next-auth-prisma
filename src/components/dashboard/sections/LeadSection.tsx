import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

type Props = {};

const LeadSection = (props: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-start">
      <div className="flex  items-center rounded-xl w-fit  relative">
        <div className="flex flex-col justify-start items-start  p-10">
          <h3 className="light:text-black text-3xl pb-3 font-semibold  ">
            Current Lead Status
          </h3>
          <div className="">
            <div>
              <Table>
                <TableCaption>A list of your recent Leads</TableCaption>
                <TableHeader>
                  <TableRow className="w-full">
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium h-[50px]">
                      James Ahmed
                    </TableCell>
                    <TableCell>not ready</TableCell>
                    <TableCell>JAhmed@example.com</TableCell>
                    <TableCell className="text-right">Buy</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium h-[50px]">
                      James Ahmed
                    </TableCell>
                    <TableCell>not ready</TableCell>
                    <TableCell>JAhmed@example.com</TableCell>
                    <TableCell className="text-right">Buy</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium h-[50px]">
                      James Ahmed
                    </TableCell>
                    <TableCell>not ready</TableCell>
                    <TableCell>JAhmed@example.com</TableCell>
                    <TableCell className="text-right">Buy</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium h-[50px]">
                      James Ahmed
                    </TableCell>
                    <TableCell>not ready</TableCell>
                    <TableCell>JAhmed@example.com</TableCell>
                    <TableCell className="text-right">Buy</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadSection;
