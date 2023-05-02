import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import { useRouter } from "next/router"
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { createEventType } from '@/store/slices/eventtype'
import { useForm } from "react-hook-form";
import { protectRoute } from '@/components/protectRoute';

const TypesCreate = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isValid } } = useForm();

  const onSubmit = (data) => {
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
            </div>

            <div className="form-group">
                <button disabled={!isValid} className="btn btn-primary"> Submit </button>
            </div>

        </form>

        </DashboardLayout> 
    </Layout>
  )
}

export default protectRoute(TypesCreate)