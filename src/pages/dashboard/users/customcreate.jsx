import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { createUser } from '@/store/slices/user'
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";

const UserCreate = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm();
  
  const onSubmit = data => {
    //dispatch(createUser(input));
  };

  return (
    <Layout> 
        <DashboardLayout> 
          
        <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
              
            <div className="form-group mb-4">
                  <label htmlFor="name" className='form-label'> User Name </label>
                  <input {...register('name', { required: true })} type="text" name="name" id="" className="form-control"/>
            </div>

            <div className="form-group mb-4">
                  <label htmlFor="email" className='form-label'> Email </label>
                  <input {...register('email', { required: true })} type="text" name="email" id="" className="form-control"/>
            </div>

            <div className="form-group mb-4">
                  <label htmlFor="password" className='form-label'> Password </label>
                  <input {...register('password', { required: true })} type="password" name="password" id="password" className="form-control"/>
            </div>

            <div className="form-group">
                <button disabled={!isValid}  className="btn btn-primary"> Submit </button>
            </div>

        </form>

        </DashboardLayout> 
    </Layout>
  )
}

export default UserCreate