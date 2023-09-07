"use client";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation"; // Import the useRouter hook from the correct path
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";

type Props = {
  id: string;
};
const refreshPage = () => {
  const currentUrl = window.location.href;
  const newUrl = currentUrl.includes("?")
    ? `${currentUrl}&refresh=${Date.now()}`
    : `${currentUrl}?refresh=${Date.now()}`;
  window.location.href = newUrl;
};

const DeleteClient = ({ id }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();
  const deleteClient = async (ClientId: string) => {
    try {
      setIsDeleting(true);
      const response = await fetch("/api/client", {
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
        toast.warning("Deleted Client!");
        router.replace("/");
      }
    } catch (error) {
      if (error) {
        toast.error("Failed to delete client!");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full">
          <Button variant="destructive" className="w-full">
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col items-start">
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            You are deleting this client forever
          </DialogDescription>
          <Button
            onClick={() => deleteClient(id)}
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

export default DeleteClient;
