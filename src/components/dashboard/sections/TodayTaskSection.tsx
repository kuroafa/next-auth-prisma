import React from 'react'
import { MdNotificationsActive } from 'react-icons/md'

type Props = {}

const TodayTaskSection = (props: Props) => {
  return (
    <div>
        <h2 className='text-3xl font-semibold ' >Today&apos;s Agenda</h2>
        <div className='flex flex-col pt-2 gap-3'>
            <p className='text-lg flex gap-2 items-center '> <MdNotificationsActive/>Contact 10 new Clients</p>
            <p className='text-lg flex gap-2 items-center '><MdNotificationsActive/>Call Larry and Create Meeting</p>
            <p className='text-lg flex gap-2 items-center '> <MdNotificationsActive/>Email Nader Contract</p>
            <p className='text-lg flex gap-2 items-center '> <MdNotificationsActive/>Do a showing in the bronx</p>
        </div>
       
    </div>
  )
}

export default TodayTaskSection