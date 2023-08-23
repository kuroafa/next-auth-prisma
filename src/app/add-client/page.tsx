import Modal from '@/components/Modal'
import React from 'react'
import ClientForm from '@/components/ClientForm'
import { ThemeToggle } from '@/components/ThemeToggle'
import UserAccountNav from '@/components/UserAccountNav'
import SignInButton from '@/components/SignInButton'
import { getAuthSession } from '@/lib/next-auth'
import { redirect } from 'next/navigation'

type Props = {
  user: string;
};

const page = async (props: Props) => {
    const session = await getAuthSession();
    if (!session?.user) {
        return redirect("/");
      }
    
  return (
  <div className='w-full lg:ml-[250px] ml-[0]'>
      <div className="flex items-center justify-between w-full gap-4 absolute xl:right-5 lg:right-5 md:right-20 right-20 top-7 ">
        <div className="lg:ml-[230px] ml-[100px] ">
          <h2 className='font-semibold text-[15px]'>Welcome, {session?.user.name}</h2>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle className="relative" />
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <SignInButton text="Sign In" />
          )}
        </div>
      </div>
      <div className='absolute top-[100px] lg:left-[210px] left-[20px]'>
      <h1 className='text-5xl font-semibold'>Add New Client</h1>
      <ClientForm  />
      </div>
     
  </div>
  )
}

export default page
  // <Modal>
    //     <h3 className='modal-head-text text-black'>Add a new Client</h3>

    //     <ClientForm/>
    // </Modal>