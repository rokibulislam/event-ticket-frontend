import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { createEventCategory, updateEventCategory } from '@/store/slices/eventcategory';
import { useRouter } from "next/router"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, date, InferType } from 'yup'; 
import { protectRoute } from '@/components/protectRoute';

let validationSchema = object({
  email: string().required().email().label("Email"),
  password: string().required().min(4).label("Password")
});

const EditCategory = () => {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({resolver: yupResolver(validationSchema)});
    const categories =  useSelector( state => state.eventcategory.items );
    
    useEffect( () => {
        if( id !== 'undefined' ) {
            const category  = categories.find( item => item.id == id );
            // dispatch(getEventCategory(routerId))
        }
  },[dispatch, id])

  const onSubmit = (data) => {
    // dispatch(updateEventCategory(data.name));
    // router.push('/dashboard/category')
  };

  return (
    <Layout> 
      <DashboardLayout>        
          <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
              
              <div className="form-group mb-4">
                <label htmlFor="name" className='form-label'> Category Name </label>
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

export default protectRoute(EditCategory)