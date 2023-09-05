import DashboardSkeleton from "@/components/skeletons/DashboardSkeleton";
import React from "react";

type Props = {};

const loading = (props: Props) => {
  return (
    <>
      <DashboardSkeleton />
    </>
  );
};

export default loading;
