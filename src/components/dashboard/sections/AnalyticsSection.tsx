import React from "react";

type Props = {};

const AnalyticsSection = (props: Props) => {
  return (
    <div className="flex gap-5 flex-col xl:flex-row">
      <div className="w-fit">
        <div className=" bg-gray-500 xl:w-[600px] lg:w-[600px] md:w-[600px]  w-[365px] h-[400px] rounded-xl"></div>
      </div>
      {/* <div className="w-fit">
        <div className=" bg-gray-600 xl:w-[500px] xl:mt-20 lg:w-[600px] md:w-[600px]  w-[365px] h-[400px]     rounded-xl"></div>
      </div> */}
    </div>
  );
};

export default AnalyticsSection;
