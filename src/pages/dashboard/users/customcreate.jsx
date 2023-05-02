import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { createUser } from '@/store/slices/user'
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, date, InferType } from 'yup'; 
import { getRoles } from '@/store/slices/role';
import { protectRoute } from '@/components/protectRoute';

let validationSchema = object({
  name: string().required().label("name"),
  email: string().email().required().label("email"),
  password: string().required().label("password")
});


const UserCreate = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({resolver: yupResolver(validationSchema)});
  const [ role, setRole ] = useState ('')

  const roles =  useSelector( state => state.role.items );

  useEffect(() => {
    dispatch( getRoles() );
  }, [dispatch] )

  const onSubmit = data => {
    console.log(data);
    //dispatch(createUser(input));
  };

  return (
    <Layout> 
        <DashboardLayout> 
          
        <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
              
            <div className="form-group mb-4">
                  <label htmlFor="name" className='form-label'> User Name </label>
                  <input {...register('name', { required: true })} type="text" id="name" className="form-control"/>
            </div>

            <div className="form-group mb-4">
                  <label htmlFor="email" className='form-label'> Email </label>
                  <input {...register('email', { required: true })} type="text" id="name" className="form-control"/>
            </div>

            <div className="form-group mb-4">
                  <label htmlFor="password" className='form-label'> Password </label>
                  <input {...register('password', { required: true })} type="password" id="password" className="form-control"/>
            </div>

            <div className="form-group mb-4">
              <label htmlFor="role" className='form-label'> Role </label>
              <select {...register('role', { required: true })} className="form-control mb-4" id="role">
                { 
                  roles.length > 0  ? (
                    roles.map( ( item, i ) =>{
                      return (
                        <option value={item.name}>
                          { item.name }
                        </option>
                      )
                    })
                  ) : ''
                }
              </select>
            </div> 

            <div className="form-group">
                <button disabled={!isValid}  className="btn btn-primary"> Submit </button>
            </div>

        </form>

        </DashboardLayout> 
    </Layout>
  )
}

export default protectRoute(UserCreate)