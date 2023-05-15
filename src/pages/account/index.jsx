import Layout from '@/components/layout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import CustomInput from '@/components/Form/input'

const Account = () => {
  const { control, setValue, getValues, register, handleSubmit, watch, trigger, formState: { errors, isValid } } = useForm({})

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <Layout>

    <div className='container'>
      
      <h2> Update Profile Information </h2>

      <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
        
        <div className='row'>
          <div className="col-md-6">
            <CustomInput register={register} label="Username" name="name" errors={errors}  />
          </div>
        </div>

        <div className="form-group">
            <button className="btn btn-create"> Submit </button>
        </div>

      </form>
    
    </div>  
    
    </Layout>
  )
}

export default Account