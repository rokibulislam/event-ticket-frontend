import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { createEventCategory } from '@/store/slices/eventcategory';
import { useRouter } from "next/router"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, date, InferType } from 'yup'; 
import { protectRoute } from '@/components/protectRoute';

let validationSchema = object({
  name: string().required('Category Name is Required').label("Name")
});

const CategoryCreate = () => {
  const dispatch = useDispatch();
  let router = useRouter();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({resolver: yupResolver(validationSchema)});

  const onSubmit = (data) => {
    console.log(data);
    dispatch(createEventCategory(data.name));
    router.push('/dashboard/category')
  };

  return (
    <Layout> 
      <DashboardLayout>        
        <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-4">
              <label htmlFor="name" className='form-label'> Category Name </label>
              <input {...register('name')} type="text" id="name" className="form-control" />
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

export default protectRoute(CategoryCreate)