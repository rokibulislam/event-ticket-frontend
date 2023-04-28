import Layout from '@/components/layout'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../store/slices/auth'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, date, InferType } from 'yup'; 

let validationSchema = object({
  email: string().required().email().label("Email"),
  password: string().required().min(4).label("Password"),
  username: string().required().min(3).label("Username")
});

const Register = () => {
  const dispatch = useDispatch()
  const router = useRouter();
  const auth =  useSelector( state => state.auth )
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({resolver: yupResolver(validationSchema)});

  const onSubmit = data =>{
    dispatch(register(data));
    // router.push('/');
  }

  return (
    <Layout>
      <h2 className='jumbotron text-center bg-primary square p-5 text-white'> Register </h2>
      { auth.error }
      <div className='col-md-4 offset-md-4'>
        <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>

          <div className='form-group mb-4'>
            <label htmlFor="username" className='form-label'> Username </label>
            <input {...register('username')} type="text" id="username" className="form-control"/>
          </div>

          <div className='form-group mb-4'>
            <label htmlFor="email" className='form-label'> Email Address </label>
            <input {...register('email')} type="text" id="email" className="form-control" />
          </div>

          <div className='form-group mb-4'>
            <label htmlFor="password" className='form-label'> Password </label>
            <input {...register('password')} type="text" name="password" id="password" className="form-control" />
          </div>

          <div className='form-group'>
            <label htmlFor="confirm_password" className='form-label'> Confirm Password </label>
            <input {...register('confirm_password')} type="text" id="confirm_password" className="form-control mb-4"/>
          </div>

          <div className="form-group">
            <button disabled={!isValid} className="btn btn-primary" type='submit'> Register </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Register