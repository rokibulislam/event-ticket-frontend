import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import { useRouter } from "next/router"
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { getEventType,updateEventType } from '@/store/slices/eventtype'
import { useForm } from "react-hook-form";

const EditType = () => {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useDispatch();
    const types =  useSelector( state => state.eventtype.items );
    const { register, handleSubmit, formState: { errors, isValid } } = useForm();

    useEffect( () => {
        if( id !== 'undefined' ) {
          const type  = types.find( item => item.id == id );
        }
      },[dispatch, id])
    
    const onSubmit = (data) => {
        console.log(data);
        // dispatch(updateEventType(data.name));
        // router.push('/dashboard/types')
    };

  return (
    <Layout> 
        <DashboardLayout> 
            <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-4">
                    <label htmlFor="name" className='form-label'> Type Name </label>
                    <input {...register('name', { required: true })} type="text" id="name" className="form-control" />
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