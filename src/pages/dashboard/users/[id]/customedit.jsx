import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import { useRouter } from 'next/router';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, date, InferType } from 'yup'; 
import { Select } from 'antd'

import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { protectRoute } from '@/components/protectRoute'
import { getRoles } from '@/store/slices/role';
import { updateUser } from '@/store/slices/user';

let validationSchema = object({
  name: string().required().label("name"),
  email: string().email().required().label("email"),
  password: string().required().label("password"),
  role: number().required('role is requried').label("role"),
});


const EditUser = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query
  const { control, register, handleSubmit, reset, formState: { errors, isValid } } = useForm({resolver: yupResolver(validationSchema)});
  const roles =  useSelector( state => state.role.items );
  const users =  useSelector( state => state.user.items );

  //state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  useEffect(() => {
    dispatch( getRoles() );
  }, [dispatch] )

  useEffect( () => {
    if( id !== undefined ) {
      const user  = users.find( item => item.id == id );
      setName(user.name)
      setEmail(user.email)
    }
  },[dispatch, id])

  useEffect(() => {
    reset({
      name: name,
      email: email,
    })
  }, [name, email])

  const onSubmit = data => {
    console.log(data);
    /*
    dispatch(updateUser({
      id: id,
      name: name,
      email: email
    })); */
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
        </div> 

        <div className="form-group">
            <button disabled={!isValid}  className="btn btn-primary"> Submit </button>
        </div>
    </form>
    </DashboardLayout> 
</Layout>
  )
}

export default protectRoute(EditUser)