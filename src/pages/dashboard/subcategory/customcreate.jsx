import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { useRouter } from "next/router"
import { createSubEventCategory } from '@/store/slices/eventsubcategory';
import { getEventCategories } from '@/store/slices/eventcategory';
import { Select } from 'antd'
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { protectRoute } from '@/components/protectRoute';
import CustomSelect from '@/components/Form/select';
import { subcategoryvalidationSchema } from '@/validation';
import CustomInput from '@/components/Form/input';
import { unwrapResult } from '@reduxjs/toolkit';
  
const SubCategoryCreate = () => {
  const dispatch = useDispatch();
  let router = useRouter();
  const {  control, register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(subcategoryvalidationSchema)});
  const eventcategories =  useSelector( state => state.eventcategory.items );

  useEffect(() => {
    try {
      let resultAction = dispatch(getEventCategories())
      unwrapResult( resultAction );
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])
  
  const onSubmit = (data) => {
    console.log(data);
    try {
      let resultAction = dispatch(createSubEventCategory({
        name: data.name,
        category_id: data.category
      }));
      unwrapResult( resultAction );
      router.push('/dashboard/subcategory')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout> 
      <DashboardLayout>        
          <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
              <div className='col-md-4'>
                <CustomInput register={register} label="SubCategory Name" name="name" errors={errors}  />
              </div>

              <CustomSelect 
                Controller={Controller} 
                control={control} 
                label="Event Category"
                name="category"
                options={eventcategories}
                errors={errors}
                value=""
              />  
              <div className="form-group">
                  <button  className="btn btn-primary"> Submit </button>
              </div>
  
          </form> 
      </DashboardLayout> 
    </Layout>
  )
}

export default protectRoute(SubCategoryCreate)