import Layout from '@/components/layout'
import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/slices/auth'
import Link from 'next/link';

import { useForm } from "react-hook-form";

const Login = () => {
  const dispatch = useDispatch()
  const router = useRouter();
  const auth =  useSelector( state => state.auth )
  const { register, handleSubmit, formState: { errors, isValid } } = useForm();

  const onSubmit = data =>{
    dispatch(login(data));
    // router.push('/');
  }

  return (
    <Layout>
        <h2 className='jumbotron text-center bg-primary square p-5 text-white'> Login </h2>
        <p> { auth.error } </p>
        <div className='col-md-4 offset-md-4'>
            <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-4">
                    <label htmlFor="email" className='form-label'> Email Address </label>
                    <input 
                        {...register('email', { required: true })}
                        type="text" 
                        id="email" 
                        className="form-control" 
                        placeholder='Enter Email Address'
                    />
                </div>
                <p> { errors.type?.name == 'required' && <p> The email field is required </p>  }</p>
                <div className="form-group mb-4">
                    <label htmlFor="password" className='form-label'> Password </label>
                    <input 
                        {...register('password', { required: true } )}
                        type="text"
                        id="password" 
                        className="form-control" 
                        placeholder='Enter password'
                    />
                </div>

                <button disabled={!isValid} type='submit' className="btn btn-primary btn-lg btn-block"> Login </button>
            </form>

            <p className='text-center p-3'>
                Not yet registered? 
                <Link href="/auth/register"> Register </Link>
            </p>

            <p className='text-center text-danger'>
                <Link href="/auth/forget-password" className='text-danger'> Forgot password </Link>
            </p>
        </div>
    </Layout>
  )
}

export default Login