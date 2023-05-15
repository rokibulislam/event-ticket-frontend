import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { createRole } from '@/store/slices/role'
import { getPermissions } from '@/store/slices/permission'
import { useRouter } from "next/router"
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { protectRoute } from '@/components/protectRoute';
import { Select } from 'antd'
import { rolevalidationSchema } from '@/validation';
import CustomSelect from '@/components/Form/select';
import CustomInput from '@/components/Form/input';
import { unwrapResult } from '@reduxjs/toolkit';

const CreateRole = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const dispatch = useDispatch();
    let router = useRouter();
    const { control, register, handleSubmit, formState: { errors, isValid } } = useForm({resolver: yupResolver(rolevalidationSchema)});
    const permissions =  useSelector( state => state.premission.items );

    useEffect( () => {
      try {
        let resultAction =  dispatch(getPermissions())
        unwrapResult(resultAction)
      } catch (error) {
        console.log(error)
      }
    },[dispatch])
    
    const onSubmit = (data) => {
      try {
        let resultAction = dispatch(createRole( { 
          name: data.name,
          permissions: data.permissions
        }));
        unwrapResult(resultAction)
        router.push('/dashboard/roles') 
      } catch (error) {
        console.log(error)
      }
    };

  return (
    <Layout> 
      <DashboardLayout>        
          <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
              <CustomInput register={register} label="Role Name" name="name" errors={errors}  />
              {/* <div className="form-group mb-4">
                <label htmlFor="name" className='form-label'> Role Name </label>
                <input {...register('name', { required: true })} type="text" id="name" className="form-control" />
                {errors.name && <span style={{ color: 'red' }}> { errors.name?.message }  </span>}
              </div> */}

              <CustomSelect 
                control={control} 
                label="Permissions" 
                name="permissions" 
                options={permissions}
                errors={errors} 
                value=""
              />

{/*               
              <div className="form-group mb-4">
                <label htmlFor="permissions" className='form-label'> Permissions </label> <br/>
                <Controller
                  control={control}
                  name="permissions"
                  render={({ field }) => (
                    <Select
                      mode="multiple"
                      style={{ width: 220 }}
                      onChange={ (value ) => field.onChange(value) }
                      options={
                        permissions.length > 0 && ( permissions.map( ( item, i ) =>{
                          return { value: item.id, label: item.name }
                        })) } 
                    />
                  )}
                />
                {errors.permissions && <p style={{ color: 'red' }}> { errors.permissions?.message }  </p>}
              </div>  */}
  
              <div className="form-group">
                  <button disabled={!isValid} className="btn btn-primary"> Submit </button>
              </div>
  
          </form> 
      </DashboardLayout> 
    </Layout>
  )
}

export default protectRoute(CreateRole)