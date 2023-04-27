import React from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { useRouter } from "next/router"
import { useForm } from "react-hook-form";


import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { createTicketType } from '@/store/slices/tickettype';

createTicketType

const CustomCreate = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isValid } } = useForm();

    const onSubmit = (data) => {
        dispatch(createTicketType(data.name));
        router.push('/dashboard/tickettype')
    };

  return (
    <Layout>
        <DashboardLayout>
            <h2> CustomCreate </h2>
            <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
              
              <div className="form-group mb-4">
                <label htmlFor="name" className='form-label'> Ticket Type Name </label>
                <input {...register('name', { required: true })} type="text" id="name" className="form-control" />
              </div>
  
              <div className="form-group">
                  <button disabled={!isValid} className="btn btn-primary"> Submit </button>
              </div>
  
          </form> 
        </DashboardLayout> 
    </Layout>
  )
}

export default CustomCreate