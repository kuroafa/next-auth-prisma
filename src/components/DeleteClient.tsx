'use client'
import React from 'react';
import { Button } from './ui/button';
import axios from 'axios';
import { DeleteSchema } from '@/lib/type';
import { useRouter } from 'next/navigation'; // Import the useRouter hook from the correct path
import { GrClose } from 'react-icons/gr';
import { toast } from 'react-toastify';

type Props = {
    id: string;
};

const DeleteClient = ({ id }: Props) => {
    const router = useRouter();
    const deleteClient = (ClientId: string) => {
        fetch('/api/client', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: ClientId
            }),
          
        })
        router.refresh()
        toast.warning('Deleted Client')
          
    };

    return (
        <div>
            <button disabled={true} onClick={() => deleteClient(id)}><GrClose size={20}/></button>
        </div>
    );
};

export default DeleteClient;
