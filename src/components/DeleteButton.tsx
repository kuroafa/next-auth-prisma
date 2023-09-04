"use client";

import { DeleteSchema } from "@/lib/type";
import { useRouter } from "next/navigation";
import { GrClose } from "react-icons/gr";
import { toast } from "react-toastify";
import React from "react";
import { Button } from "./ui/button";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type Props = {
  id: string;
};

const DeleteButton = ({ id }: Props) => {
  const router = useRouter();
  const refreshPage = () => {
    const currentUrl = window.location.href;
    const newUrl = currentUrl.includes("?")
      ? `${currentUrl}&refresh=${Date.now()}`
      : `${currentUrl}?refresh=${Date.now()}`;
    window.location.href = newUrl;
  };
  const deleteAppointment = (AppointmentId: string) => {
    try {
      const response = fetch("/api/appointment", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: AppointmentId,
        }),
      });
      refreshPage();
      toast.warning("Deleted Appointment");
    } catch (error) {
      console.log(`${error} deleting appointment`);
      toast.error("Failed to delete appointment");
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button>Delete</Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col items-start">
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            You are deleting this appointment forever
          </DialogDescription>
          <Button
            onClick={() => deleteAppointment(id)}
            variant="destructive"
            className="self-end"
          >
            Delete
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteButton;
