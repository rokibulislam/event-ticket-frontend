import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { createEventCategory } from '@/store/slices/eventcategory';
import { useRouter } from "next/router"
import { useForm } from "react-hook-form";

const CategoryCreate = () => {
  const dispatch = useDispatch();
  let router = useRouter();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm();

  const onSubmit = (data) => {
    dispatch(createEventCategory(name));
    router.push('/dashboard/category')
  };

  return (
    <Layout> 
      <DashboardLayout>        
          <form action='' method='post' onSubmit={handleSubmit}>
              
              <div className="form-group mb-4">
                <label htmlFor="type_name" className='form-label'> Category Name </label>
                <input {...register('type_name', { required: true })} type="text" id="type_name" className="form-control" />
              </div>
  
              <div className="form-group">
                  <button disabled={!isValid} className="btn btn-primary"> Submit </button>
              </div>
  
          </form> 
      </DashboardLayout> 
    </Layout>
  )
}

export default CategoryCreate