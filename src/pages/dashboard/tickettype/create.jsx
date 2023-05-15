import React from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { useRouter } from "next/router"
import { useForm } from "react-hook-form";
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, date, InferType } from 'yup'; 
import { createTicketType } from '@/store/slices/tickettype';
import { protectRoute } from '@/components/protectRoute';
import { tickettypevalidationSchema } from '@/validation';
import CustomInput from '@/components/Form/input';
import { unwrapResult } from '@reduxjs/toolkit';

const CreateTicketType = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isValid } } =  useForm({resolver: yupResolver(tickettypevalidationSchema)});

    const onSubmit = (data) => {
      try {
        let resultAction = dispatch(createTicketType(data.name));
        unwrapResult(resultAction)
        router.push('/dashboard/tickettype')
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <Layout>
        <DashboardLayout>
            <h2> Custom Ticket Type Create </h2>
            <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>

              <CustomInput register={register} label="Ticket Type Name" name="name" errors={errors}  />
              
              {/* <div className="form-group mb-4">
                <label htmlFor="name" className='form-label'> Ticket Type Name </label>
                <input {...register('name', { required: true })} type="text" id="name" className="form-control" />
                {errors.name && <span style={{ color: 'red' }}> { errors.name?.message }  </span>}
              </div> */}
  
              <div className="form-group">
                  <button disabled={!isValid} className="btn btn-primary"> Submit </button>
              </div>
  
          </form> 
        </DashboardLayout> 
    </Layout>
  )
}

export default protectRoute(CreateTicketType)