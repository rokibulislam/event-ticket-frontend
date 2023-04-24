import Layout from '@/components/layout'
import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../store/slices/auth'
import Link from 'next/link';

// import { Form, Input } from 'antd';

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
    router.push('/');
  }

  return (
    <Layout>
      <h2 className='jumbotron text-center bg-primary square p-5 text-white'> Login </h2>

      {/* <Form>

        <Form.input
              label="Email Address"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
        >
          <Input />
        </Form.input>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
            <Input.Password />
        </Form.Item>

      </Form> */}


<div className='col-md-4 offset-md-4'>

      <form action='' method='post' onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor=""> Email Address </label>
          <input 
            type="text" 
            name="email" 
            id="" 
            className="form-control mb-4" 
            onChange={handleChange} 
            value={input.email} 
            placeholder='Enter Email Address'
          />
        </div>

        <div className="form-group">
          <label htmlFor=""> Password </label>
          <input type="text" name="password" id="" 
            className="form-control mb-4" 
            onChange={handleChange} 
            value={input.password}
            placeholder='Enter password'
          />
        </div>

        {/* <div className="form-group"> */}
          <button type='submit' className="btn btn-primary btn-lg btn-block"> Login </button>
        {/* </div> */}
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