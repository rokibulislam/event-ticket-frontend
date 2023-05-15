import Layout from '@/components/layout'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register as registerAction } from '../../store/slices/auth'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { unwrapResult } from "@reduxjs/toolkit";
import { registervalidationSchema } from '@/validation'
import CustomInput from '@/components/Form/input'
import CustomPassword from '@/components/Form/password'

const Register = () => {
  const dispatch = useDispatch()
  const router = useRouter();
  const auth =  useSelector( state => state.auth )
  const { register, handleSubmit, formState: { errors, isValid, isDirty, isSubmitting }, setError } = useForm({resolver: yupResolver(registervalidationSchema)});

  const onSubmit = async data =>{
    try {
      const resultAction = await dispatch(registerAction({
        username: data.username,
        email: data.email,
        password: data.password,
      }));
      unwrapResult(resultAction);
    } catch( error ) {
      console.log(Object.keys(error));
      Object.keys(error).forEach((fieldName) => {
        setError(fieldName, {
          type: "server",
          message: error[fieldName]
        });
      });
    }
  }

  return (
    <Layout>
      <h2 className='jumbotron text-center bg-primary square p-5 text-white'> Register </h2>
      {/* { auth.error } */}
      <div className='col-md-4 offset-md-4'>
        <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
          <CustomInput register={register} label="Username" name="username" placeholder="Enter Username" errors={errors} />
          <CustomInput register={register} label="Email Address" name="email" placeholder="Enter Email Address" errors={errors} />
          <CustomPassword register={register} label="Password" name="password" placeholder="Enter Password" errors={errors} />
          <CustomPassword register={register} label="Confirm Password " name="confirmPassword" placeholder="Confirm Password " errors={errors} />
         
          {/* <div className='form-group mb-4'>
            <label htmlFor="username" className='form-label'> Username </label>
            <input {...register('username')} type="text" id="username" className="form-control"/>
            {errors.username && <p style={{ color: 'red'}}>{errors.username.message}</p>}
          </div> 

          <div className='form-group mb-4'>
            <label htmlFor="email" className='form-label'> Email Address </label>
            <input {...register('email')} type="text" id="email" className="form-control" />
            {errors.email && <p style={{ color: 'red'}}>{errors.email.message}</p>}
          </div>

          <div className='form-group mb-4'>
            <label htmlFor="password" className='form-label'> Password </label>
            <input {...register('password')} type="text" name="password" id="password" className="form-control" />
            {errors.password && <p style={{ color: 'red'}}>{errors.password.message}</p>}
          </div>

          <div className='form-group'>
            <label htmlFor="confirmPassword" className='form-label'> Confirm Password </label>
            <input {...register('confirmPassword')} type="text" id="confirmPassword" className="form-control mb-4"/>
            {errors.confirmPassword && <p style={{ color: 'red'}}>{errors.confirmPassword.message}</p>}
          </div>
        */}

          <div className="form-group">
            <button disabled={!isValid} className="btn btn-primary" type='submit'> Register </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Register