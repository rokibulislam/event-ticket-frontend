import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { createEventCategory } from '@/store/slices/eventcategory';
import { useRouter } from "next/router"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { protectRoute } from '@/components/protectRoute';
import { categoryvalidationSchema } from '@/validation';
import CustomInput from '@/components/Form/input';
import { unwrapResult } from '@reduxjs/toolkit';


const CategoryCreate = () => {
  const dispatch = useDispatch();
  let router = useRouter();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({resolver: yupResolver(categoryvalidationSchema)});

  const onSubmit = (data) => {
    try {
      let resultAction = dispatch(createEventCategory(data.name));
      unwrapResult(resultAction);
      router.push('/dashboard/category')
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <Layout> 
      <DashboardLayout>        
        <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>

            <CustomInput register={register} label="Category Name" name="name" errors={errors}  />
            
            {/* <div className="form-group mb-4">
              <label htmlFor="name" className='form-label'> Category Name </label>
              <input {...register('name')} type="text" id="name" className="form-control" />
              {errors.name && <span style={{ color: 'red' }}> { errors.name?.message }  </span>}
            </div> */}

            <div className="form-group">
                <button disabled={!isValid} className="btn btn-primary"> Submit </button>
            </div>
        </form> 
      </DashboardLayout> 
    </Layout>
  )
}

export default protectRoute(CategoryCreate)