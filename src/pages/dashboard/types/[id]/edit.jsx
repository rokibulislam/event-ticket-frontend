import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import { useRouter } from "next/router"
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { getEventType,updateEventType } from '@/store/slices/eventtype'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, date, InferType } from 'yup'; 
import { typevalidationSchema } from '@/validation';
import CustomInput from '@/components/Form/input';
import { unwrapResult } from '@reduxjs/toolkit';

const EditType = () => {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useDispatch();
    const types =  useSelector( state => state.eventtype.items );
    const { register, handleSubmit, reset, formState: { errors, isValid } } =  useForm({resolver: yupResolver(typevalidationSchema)});
    const [name, setName] = useState('')

    useEffect( () => {
        if( id !== 'undefined' ) {
          const type  = types.find( item => item.id == id );
          setName(type?.name);
        }
    },[dispatch, id])


    useEffect(() => {
        reset({
          name: name
        })
    }, [name])
      
    
    const onSubmit = (data) => {
      console.log(data);
      try {
        let resultAction = dispatch(updateEventType({
          id: id,
          name: data.name
        }));
        unwrapResult(resultAction)
        router.push('/dashboard/types')
      } catch (error) {
        console.log(error)
      }
    };

  return (
    <Layout> 
        <DashboardLayout> 
            <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
                {/* <CustomInput register={register} label="Type Name" name="name" errors={errors} value={name} />   */}
                <div className="form-group mb-4">
                    <label htmlFor="name" className='form-label'> Type Name </label>
                    <input {...register('name', { required: true })} type="text" id="name" className="form-control" />
                    {errors.name && <span style={{ color: 'red' }}> { errors.name?.message }  </span>}
                </div>
                
                <div className="form-group">
                    <button disabled={!isValid} className="btn btn-primary"> Submit </button>
                </div>
            </form>
        </DashboardLayout> 
    </Layout>
  )
}

export default EditType