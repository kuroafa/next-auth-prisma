"use client";
import React from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { DeleteSchema } from "@/lib/type";
import { useRouter } from "next/navigation"; // Import the useRouter hook from the correct path
import { GrClose } from "react-icons/gr";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

type Props = {
  id: string;
};

const DeleteClient = ({ id }: Props) => {
  const router = useRouter();
  const deleteClient = (ClientId: string) => {
    fetch("/api/client", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: ClientId,
      }),
    });
    router.replace("/");
    router.refresh();
    toast.warning("Deleted Client");
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
            You are deleting this user forever!
          </DialogDescription>
          <Button
            onClick={() => deleteClient(id)}
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

export default DeleteClient;
