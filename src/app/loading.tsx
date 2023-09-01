import Loading from "@/components/Loading";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardSkeleton from "@/components/skeletons/DashboardSkeleton";

type Props = {};

const loading = (props: Props) => {
  return (
    <>
      <DashboardSkeleton />
    </>
  );
};

export default loading;
