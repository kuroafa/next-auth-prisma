import React from 'react'
import { MdNotificationsActive } from 'react-icons/md'

type Props = {}

const ActitvitySection = (props: Props) => {
  return (
    <div>
        <h2 className='text-3xl font-semibold '>Activity</h2>
        <div className='flex flex-col pt-2 gap-3'>
            <p className='text-lg flex gap-2 items-center '> <MdNotificationsActive/>Mustafa Confirmed Appointment</p>
            <p className='text-lg flex gap-2 items-center '><MdNotificationsActive/>REMINDER appointment @4:30pm Today</p>
            <p className='text-lg flex gap-2 items-center '> <MdNotificationsActive/>Nader Confirmed Appointment</p>
            <p className='text-lg flex gap-2 items-center '> <MdNotificationsActive/>New Form Received</p>
        </div>
    </div>
  )
}

export default ActitvitySection