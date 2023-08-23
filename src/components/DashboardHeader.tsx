import { getAuthSession } from '@/lib/next-auth'
import React from 'react'

type Props = {}

const DashboardHeader = async (props: Props) => {
    const session = await getAuthSession()
  return (
    <div className='dark:text-black flex justify-between -mt-[65px] px-4 pt-4  '>
        <h2 className='dark:text-white light:text-black xl:text-[24px]  sm:text-[24px] font-semibold'>Realtor.io</h2>
        <h2 className='dark:text-white light:text-black  xl:text-[24px]  sm:text-[24px] font-semibold'>Welcome, <span className='font-light'>{session?.user.name}</span>  </h2>
    </div>
  )
}

export default DashboardHeader