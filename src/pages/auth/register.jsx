import Layout from '@/components/layout'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { register } from '../../store/slices/auth'

const Register = () => {
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
    console.log('check submit');
    dispatch(register({ username: input.username,  email: input.email, password: input.password }));
    router.push('/auth/login')
  }

  return (
    <Layout>
      <h2 className='jumbotron text-center bg-primary square p-5 text-white'> Register </h2>
      <div className='col-md-4 offset-md-4'>
        <form action='' method='post' onSubmit={handleSubmit}>

          <div className='form-group'>
            <label htmlFor=""> Username </label>
            <input type="text" name="username" id="" className="form-control mb-4" onChange={handleChange} value={input.title}/>
          </div>

          <div className='form-group'>
            <label htmlFor=""> Email Address </label>
            <input type="text" name="email" id="" className="form-control mb-4" onChange={handleChange} value={input.email} />
          </div>

          <div className='form-group'>
            <label htmlFor=""> Password </label>
            <input type="text" name="password" id="" className="form-control mb-4" onChange={handleChange} value={input.password}/>
          </div>

          <div className='form-group'>
            <label htmlFor=""> Confirm Password </label>
            <input type="text" name="confirm_password" id="" className="form-control mb-4" onChange={handleChange} value={input.confirm_password}/>
          </div>

          <div className="form-group">
            <button className="btn btn-primary"> Register </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Register