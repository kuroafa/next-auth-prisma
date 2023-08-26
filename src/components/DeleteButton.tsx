'use client'

import { DeleteSchema } from '@/lib/type';
import { useRouter } from 'next/navigation'; 
import { GrClose } from 'react-icons/gr'
import { toast } from 'react-toastify';
import React from "react";
import { Button } from "./ui/button";
import axios from "axios";


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

export default DeleteButton