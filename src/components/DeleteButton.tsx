import React from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { DeleteSchema } from "@/lib/type";

type Props = {
  id: string;
};
const DeleteButton = async ({ id }: Props) => {
  const deleteAppointment = async (AppointmentId: string) => {
    fetch("/api/appointment", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: AppointmentId,
      }),
    });
  };
  return <Button onClick={() => deleteAppointment(id)}>Delete</Button>;
};

export default DeleteButton;
