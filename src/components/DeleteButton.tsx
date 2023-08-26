'use client'
import React from 'react';
import { Button } from './ui/button';
import axios from 'axios';
import { DeleteSchema } from '@/lib/type';
import { useRouter } from 'next/navigation'; // Import the useRouter hook from the correct path
import { GrClose } from 'react-icons/gr'
import { toast } from 'react-toastify';
import React from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { DeleteSchema } from "@/lib/type";

type Props = {
    id: string;
};

const DeleteButton = ({ id }: Props) => {
    const router = useRouter();
    const deleteAppointment = (AppointmentId: string) => {
        fetch('/api/appointment', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: AppointmentId
            }),
          
        })
        router.refresh()
        toast.warning('Deleted Appointment')
          
    };

    return (
        <div>
            <button onClick={() => deleteAppointment(id)}><GrClose size={20}/></button>
        </div>
    );
};

export default DeleteButton;
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
