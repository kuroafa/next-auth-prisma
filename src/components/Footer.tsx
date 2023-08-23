import Link from 'next/link'
import React from 'react'

import SignInButton from './SignInButton'
import Image from 'next/image'

type Props = {}

const Footer = (props: Props) => {
  return (
    <div className='flex flex-col'  >
       <div className=' flex flex-wrap flex-col-reverse xl:flex-row lg:flex-row md:flex-row sm:flex-row  '>
           <div className='logo flex flex-col xl:p-20 lg:p-20 p-10 text-[20px]'>
            <h1 className='font-semibold text-[30px] pb-2'>Discover</h1>
               <Link href='/'>
               What Is Realtor.io?
               </Link>
               <Link href='/'>
               Developer
               </Link>
               <Link href='/'>
               Sign In
               </Link>
               <Link href='/'>
               Github
               </Link>
           </div>
           <div className='logo flex flex-col xl:p-20 lg:p-20 p-10 text-[20px]'>
            <h1 className='font-semibold text-[30px] pb-2'>Socials</h1>
               <Link href='/'>
               LinkedIn
               </Link>
               <Link href='/'>
               Instagram
               </Link>
               <Link href='/'>
               Github
               </Link>
               <Link href='/'>
               Email
               </Link>
           </div>
           <div className='flex flex-wrap items-center'>
            
              <Image className="" width={400} height={300} src="/heroGif.gif" alt="GIF" />
           </div>
       </div>
     <div className='p-10 -mt-20 ml-10'><p>&copy; 2023 Mustafa. All rights reserved.</p></div>
    </div>
  )
}

export default Footer