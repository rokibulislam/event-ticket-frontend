import Layout from '@/components/layout'
import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../store/slices/auth'
import Link from 'next/link';


const Login = () => {
  const dispatch = useDispatch()
  const router = useRouter();
  const [ input, setInput ] = useState ({
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  })


  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email: input.email, password: input.password }));
    // router.push('/');
  }

  return (
    <Layout>
      <h2 className='jumbotron text-center bg-primary square p-5 text-white'> Login </h2>
      <div className='col-md-4 offset-md-4'>
        <form action='' method='post' onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="email" className='form-label'> Email Address </label>
            <input 
              type="text" 
              name="email" 
              id="email" 
              className="form-control" 
              onChange={handleChange} 
              value={input.email} 
              placeholder='Enter Email Address'
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="password" className='form-label'> Password </label>
            <input type="text" name="password" id="password" 
              className="form-control" 
              onChange={handleChange} 
              value={input.password}
              placeholder='Enter password'
            />
          </div>

          <button type='submit' className="btn btn-primary btn-lg btn-block"> Login </button>
      </form>

      <p className='text-center p-3'>Not yet registered? <Link href="/auth/register"> Register </Link></p>

      <p className='text-center text-danger'>
        <Link href="/auth/forget-password" className='text-danger'> Forgot password </Link>
      </p>
    </div>

    </Layout>
  )
}

export default Login