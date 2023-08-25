import React from "react";
import AppointmentCard from "../components/AppointmentCard";
import AppointmentForm from "@/components/AppointmentForm";

type Props = {};

const AppointmentsSection = (props: Props) => {
  return (
    <div className="flex  rounded-xl w-full    relative  ">
      <div className="flex flex-col justify-start items-start  ">
        <div>
          <h3 className="light:text-black text-3xl font-semibold mb-5 ">
            Today&apos;s Appointments
          </h3>
          <AppointmentForm/>
        </div>
        <div className="flex gap-3 flex-wrap ">
          <AppointmentCard />
        </div>
      </div>
    </div>
  );
};

export default AppointmentsSection;
