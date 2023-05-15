import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { createUser } from '@/store/slices/user'
import { useRouter } from 'next/router';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, date, InferType } from 'yup'; 
import { getRoles } from '@/store/slices/role';
import { protectRoute } from '@/components/protectRoute';
import { Select } from 'antd'
import { unwrapResult } from '@reduxjs/toolkit';

let validationSchema = object({
  name: string().required().label("name"),
  email: string().email().required().label("email"),
  password: string().required().label("password"),
  role: number().required('role is requried').label("role"),
});


const UserCreate = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { control, register, handleSubmit, formState: { errors, isValid } } = useForm({resolver: yupResolver(validationSchema)});
  const roles =  useSelector( state => state.role.items );

  useEffect(() => {
    try {
      let resultAction = dispatch( getRoles() );
      unwrapResult(resultAction);
    } catch (error) {
      console.log(error);
    }
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
                  {errors.name && <span style={{ color: 'red' }}> { errors.name?.message }  </span>}
            </div>

            <div className="form-group mb-4">
                  <label htmlFor="email" className='form-label'> Email </label>
                  <input {...register('email', { required: true })} type="text" id="name" className="form-control"/>
                  {errors.email && <span style={{ color: 'red' }}> { errors.email?.message }  </span>}
            </div>

            <div className="form-group mb-4">
                  <label htmlFor="password" className='form-label'> Password </label>
                  <input {...register('password', { required: true })} type="password" id="password" className="form-control"/>
                  {errors.password && <span style={{ color: 'red' }}> { errors.password?.message }  </span>}
            </div>

            <div className="form-group mb-4">
              <label htmlFor="role" className='form-label'> Role </label> <br/>
              <Controller
                  control={control}
                  name="role"
                  render={({ field }) => (
                    <Select
                      style={{ width: 220 }}
                      onChange={ (value ) => field.onChange(value) }
                      options={
                        roles.length > 0 && ( roles.map( ( item, i ) =>{
                          return { value: item.id, label: item.name }
                        })) } 
                    />
                  )}
                />
              {/* <select {...register('role', { required: true })} className="form-control mb-4" id="role">
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
              </select> */}
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