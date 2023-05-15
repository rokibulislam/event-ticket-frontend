import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import { useRouter } from "next/router"
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getPermissions } from '@/store/slices/permission';
import { updateRole } from '@/store/slices/role';
import { Select } from 'antd'

import { rolevalidationSchema } from '@/validation';
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { protectRoute } from '@/components/protectRoute'
import CustomSelect from '@/components/Form/select';


const EditRole = () => {
  const router = useRouter()
  const { id  } = router.query
  const dispatch = useDispatch();
  const permissions =  useSelector( state => state.premission.items );
  const roles =  useSelector( state => state.role.items );
  const [ name, setName ] = useState ('')
  const [selectedpermissions, setSelectedPermissions] = useState([]);
  const { control, register, handleSubmit, reset, formState: { errors, isValid } } = useForm({resolver: yupResolver(rolevalidationSchema)});

  useEffect( () => {
      if( id !== undefined ) {
        const role  = roles.find( item => item.id == id );
        setName(role.name);
        setSelectedPermissions(role.permissions);
          // dispatch(getRole(id))
        dispatch(getPermissions())
      }
  },[dispatch, id])

  useEffect(() => {
    reset({
      name: name,
      permissions: selectedpermissions
    })
  }, [name])

  const onSubmit = (data) => {
    console.log(data);
  }
  return (
    <Layout>
      <DashboardLayout>
      <h2> EditRole </h2>

        <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>

            <div className="form-group">
                <label htmlFor=""> Role Name </label>
                <input {...register('name', { required: true })} type="text"  id="name" className="form-control mb-4"/>
                {errors.name && <span style={{ color: 'red' }}> { errors.name?.message }  </span>}
            </div>

            <div className="form-group mb-4">
                <label htmlFor="permissions" className='form-label'> Permissions </label> <br/>
                <Controller
                  control={control}
                  name="permissions"
                  render={({ field }) => (
                    <Select
                      mode="multiple"
                      // value={
                      //   selectedpermissions.length > 0 && ( selectedpermissions.map( ( item, i ) =>{
                      //     console.log(item);
                      //     return { value: item.id, label: item.name }
                      //   })) 
                      // } 
                      style={{ width: 220 }}
                      onChange={ (value ) => field.onChange(value) }
                      options={
                        permissions.length > 0 && ( permissions.map( ( item, i ) =>{
                          return { value: item.id, label: item.name }
                        })) 
                      } 
                    />
                  )}
                />
                {errors.permissions && <p style={{ color: 'red' }}> { errors.permissions?.message }  </p>}
            </div> 

            <div className="form-group">
                <button disabled={!isValid} className="btn btn-primary"> Update </button>
            </div>

        </form> 

      </DashboardLayout>
    </Layout>
  )
}

export default protectRoute(EditRole)