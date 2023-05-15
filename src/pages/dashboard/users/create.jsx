import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { createUser } from '@/store/slices/user'
import { useRouter } from 'next/router';
import { getRoles } from '@/store/slices/role';
import { protectRoute } from '@/components/protectRoute';
import { unwrapResult } from '@reduxjs/toolkit';

const UserCreate = () => {
  
  const dispatch = useDispatch();
  const router = useRouter();

  const [ input, setInput ] = useState ({
    name: '',
    email: '',
    password: '',
    role: ''
  })

  const roles =  useSelector( state => state.role.items );

  useEffect(() => {
    try {
      let resultAction = dispatch( getRoles() );
      unwrapResult(resultAction);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch] )
  

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    try {
      let resultAction = dispatch(createUser(input));
      unwrapResult(resultAction)
    } catch (error) {
      console.log(error)
    }
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


            <div className="form-group mb-4">
              <label htmlFor="role" className='form-label'> Role </label>
              <select className="form-control mb-4" name="role" id="role" onChange={handleChange} >
                { 
                  roles.length > 0  ? (
                    roles.map( ( item, i ) =>{
                      return (
                        <option key={item.id} value={item.name}>
                          { item.name }
                        </option>
                      )
                    })
                  ) : ''
                }
              </select>
            </div> 

            <div className="form-group">
                <button className="btn btn-primary"> Submit </button>
            </div>

        </form>

        </DashboardLayout> 
    </Layout>
  )
}

export default protectRoute(UserCreate)