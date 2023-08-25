import React from "react";
import AppointmentCard from "../components/AppointmentCard";

type Props = {};

const AppointmentsSection = (props: Props) => {
  return (
    <div className="flex items-center rounded-xl w-fit   lg:ml-[200px] md:ml-[0]  relative  ">
      <div className="flex flex-col justify-start items-start  p-10">
        <h3 className="light:text-black text-3xl font-semibold mb-5 ">
          Today&apos;s Appointments
        </h3>
        <div className="flex gap-3 flex-wrap ">
          <AppointmentCard />
        </div>
      </div>
    </div>
  );
};

export default AppointmentsSection;
