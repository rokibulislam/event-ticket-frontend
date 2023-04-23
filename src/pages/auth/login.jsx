import Layout from '@/components/layout'
import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../store/slices/auth'

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
      <h2> Login </h2>

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

      <form action='' method='post' onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor=""> Email Address </label>
          <input type="text" name="email" id="" className="form-control" onChange={handleChange} value={input.email} />
        </div>

        <div className="form-group">
          <label htmlFor=""> Password </label>
          <input type="text" name="password" id="" className="form-control" onChange={handleChange} value={input.password}/>
        </div>

        <div className="form-group">
          <button className="btn btn-primary"> Login </button>
        </div>
      </form>
    </Layout>
  )
}

export default Login