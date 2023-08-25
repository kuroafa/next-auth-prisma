
import React from 'react'
import { Button } from './ui/button'
import axios from 'axios'
import { DeleteSchema } from '@/lib/type'


type Props = {
    id: string
}
const DeleteButton = async ({id}: Props) => {
    const deleteAppointment = async (id:string) => {
        const response = await axios.delete('/api/appointments', {
         data: {
           id: id
         }
        })
     }
  return (
    <Button onClick={()=> deleteAppointment(id)}>
        Delete
    </Button>
  )
}

export default DeleteButton