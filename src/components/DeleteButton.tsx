"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";

type Props = {
  id: string;
};

const DeleteButton = ({ id }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();
  const deleteAppointment = async (ClientId: string) => {
    try {
      setIsDeleting(true);
      const response = await fetch("/api/appointment", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: ClientId,
        }),
      });

      const result = await response.json();
      if (result.message === "Success") {
        toast.warning("Deleted Appointment!");
        router.replace("/");
      }
    } catch (error) {
      if (error) {
        toast.error("Failed to delete appointment!");
      }
    } finally {
      setIsDeleting(false);
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
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteButton;
