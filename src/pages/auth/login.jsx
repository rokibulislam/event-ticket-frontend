import Layout from '@/components/layout'
import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/slices/auth'
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginvalidationSchema } from '@/validation';
import CustomInput from '@/components/Form/input';
import CustomPassword from '@/components/Form/password';

const Login = () => {
  const dispatch = useDispatch()
  const router = useRouter();
  const auth =  useSelector( state => state.auth )
  const { register, handleSubmit, formState: { errors, isValid, isDirty, isSubmitting }, setError } = useForm({resolver: yupResolver(loginvalidationSchema)});

  const onSubmit = data =>{
    try {
        const resultAction =  dispatch(login({
            email: data.email,
            password: data.password
        }));
    } catch(error) {
        console.log(error);
    }
    // router.push('/');
  }

  return (
    <Layout>
        
        <h2 className='jumbotron text-center bg-primary square p-5 text-white'> Login </h2>
        
        <p> { auth.error } </p>
        
        <div className='col-md-4 offset-md-4'>
            
            <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
                <CustomInput register={register} label="Email Address" name="email" placeholder="Enter Email Address" errors={errors} />
                <CustomPassword register={register} label="Password" name="password" placeholder="Enter password" errors={errors} />
                
                {/* <div className="form-group mb-4">
                    <label htmlFor="email" className='form-label'> Email Address </label>
                    <input 
                        {...register('email')}
                        type="text" 
                        id="email" 
                        className="form-control" 
                        placeholder='Enter Email Address'
                    />
                    {errors.email && <p style={{ color: 'red'}}>{errors.email.message}</p>}
                </div>
                
                <div className="form-group mb-4">
                    <label htmlFor="password" className='form-label'> Password </label>
                    <input 
                        {...register('password')}
                        type="password"
                        id="password" 
                        className="form-control" 
                        placeholder='Enter password'
                    />
                    {errors.password && <p style={{ color: 'red'}}>{errors.password.message}</p>}
                </div> */}

                <div className="form-group">
                    <button disabled={!isValid || isSubmitting } type='submit' className="btn btn-primary btn-lg btn-block"> Login </button>
                </div>

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