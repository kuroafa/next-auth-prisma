"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Appointment, AppointmentType } from "@prisma/client";
import { Space, Tag } from "antd";
import AppointmentCard from "./dashboard/components/AppointmentCard";

const { CheckableTag } = Tag;

interface Props {
  appointmentData: Appointment;
}

const SearchAppointment: React.FC<Props> = ({ appointmentData }) => {
  const formattedType = appointmentData.type?.replace("_", " ").toUpperCase();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredAppointments, setFilteredAppointments] =
    useState<Appointment[]>(appointmentData); // Initialize with all appointments
  const [selectedTags, setSelectedTags] = useState<AppointmentType[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleChange = (tag: AppointmentType, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  useEffect(() => {
    setIsSearching(true);

    // Filter appointments based on the search query and selected tags
    const filteredData = appointmentData.filter((appointment: Appointment) => {
      const name = appointment.name.toLowerCase();
      const matchesSearch = name.includes(searchQuery.toLowerCase());
      const matchesTags =
        selectedTags.length === 0 || selectedTags.includes(appointment.type);
      return matchesSearch && matchesTags;
    });

    const timer = setTimeout(() => {
      setFilteredAppointments(filteredData);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedTags, appointmentData]);

  return (
    <div className="mt-4">
      <div className="pt-2">
        <Space size={[0, 8]} wrap>
          {Object.values(AppointmentType).map((type) => (
            <CheckableTag
              key={type}
              checked={selectedTags.includes(type)}
              onChange={(checked) => handleChange(type, checked)}
            >
              <h1 className="text-[15px] dark:text-gray-200 font-bold py-1">
                {`${type.split("_").join(" ")}`}
              </h1>
            </CheckableTag>
          ))}
        </Space>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-[30px]">
        {filteredAppointments.map((appointment) => (
          <AppointmentCard
            dashboardMode={false}
            appointmentData={appointment}
            key={appointment.id}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchAppointment;
