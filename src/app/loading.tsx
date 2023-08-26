import Loading from "@/components/Loading";
import React from "react";

type Props = {};

const loading = (props: Props) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Loading />
    </div>
  );
};

export default loading;
