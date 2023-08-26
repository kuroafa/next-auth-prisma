import AppointmentCard from '@/components/dashboard/components/AppointmentCard';
import { prisma } from '@/lib/db';
import { add } from 'date-fns';
import Link from 'next/link';
import React from 'react'

type Props = {
  name: string;
  address: string;
  type: string;
  date: number;
  time: number;
  completed: boolean;

}

const page = async ({name, address, type, date, time, completed}: Props) => {
  const getAppointments = await prisma.appointment.findMany({
    where:{
      name:name,
      address: address,
      type: type,
      date: date,
      time: time,
      completed: completed
    }
  })
  return (
    <div className='mt-[30px]'>
      <Link href='/Appointment-Creation'>
           Add New Appointment
      </Link>
      <h1>{getAppointments.map((appointment)=>{
        return(
          <div key={appointment.id}>
           <AppointmentCard appointmentData={appointment} key={appointment.id}/>
          </div>
        )
      })}</h1>
    </div>
  )
}

export default page