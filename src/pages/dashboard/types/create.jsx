import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import { useRouter } from "next/router"
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { createEventType } from '@/store/slices/eventtype'
import { useForm } from "react-hook-form";
import { protectRoute } from '@/components/protectRoute';
import { yupResolver } from "@hookform/resolvers/yup";
import { typevalidationSchema } from '@/validation';

const TypesCreate = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({resolver: yupResolver(typevalidationSchema)});
  
  const onSubmit = (data) => {
    // console.log(data);
    dispatch(createEventType(data.name));
    router.push('/dashboard/types')
  };

  return (
    <Layout> 
        <DashboardLayout> 
        <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-4">
              <label htmlFor="name" className='form-label'> Type Name </label>
                <input {...register('name', { required: true })} type="text" id="name" className="form-control" />
                {errors.name && <span style={{ color: 'red' }}> { errors.name?.message }  </span>}
            </div>

            <div className="form-group">
              <button className="btn btn-primary"> Submit </button>
            </div>
        </form>
        </DashboardLayout> 
    </Layout>
  )
}

export default protectRoute(TypesCreate)