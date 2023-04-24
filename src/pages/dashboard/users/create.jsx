import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { createUser } from '@/store/slices/user'
import { useRouter } from 'next/router';

const UserCreate = () => {
  
  const dispatch = useDispatch();
  const router = useRouter();

  const [ input, setInput ] = useState ({
    name: '',
    email: '',
    password: '',
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
    dispatch(createUser(input));
  };

  return (
    <Layout> 
        <DashboardLayout> 
          
        <form action='' method='post' onSubmit={handleSubmit}>
              
            <div className="form-group">
                  <label htmlFor=""> User Name </label>
                  <input type="text" name="name" id="" value={input.name} className="form-control mb-4" onChange={handleChange}  />
            </div>

            <div className="form-group">
                  <label htmlFor=""> Email </label>
                  <input type="text" name="email" id="" value={input.email} className="form-control mb-4" onChange={handleChange}  />
            </div>

            <div className="form-group">
                  <label htmlFor=""> Password </label>
                  <input type="password" name="password" id="" value={input.password} className="form-control mb-4" onChange={handleChange}  />
            </div>

            <div className="form-group">
                <button className="btn btn-primary"> Submit </button>
            </div>

        </form>

        </DashboardLayout> 
    </Layout>
  )
}

export default UserCreate