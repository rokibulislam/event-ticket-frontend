import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { useRouter } from "next/router"
import { createSubEventCategory } from '@/store/slices/eventsubcategory';
import { getEventCategories } from '@/store/slices/eventcategory';
import { Select } from 'antd'
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, date, InferType } from 'yup'; 
import { protectRoute } from '@/components/protectRoute';


let validationSchema = object({
    name: string().required('name is requried').label("Name"),
    category: number().required('category is required').label("category"),
});

  
const SubCategoryCreate = () => {
  const dispatch = useDispatch();
  let router = useRouter();
  const {  control, register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(validationSchema)});
  const eventcategories =  useSelector( state => state.eventcategory.items );

  useEffect(() => {
    dispatch(getEventCategories())
  }, [dispatch])
  
  const onSubmit = (data) => {
    console.log(data);
    dispatch(createSubEventCategory({
      name: data.name,
      category_id: data.category
    }));
    router.push('/dashboard/category')
  };

  return (
    <Layout> 
      <DashboardLayout>        
          <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
              
              <div className="form-group mb-4">
                <label htmlFor="name" className='form-label'> SubCategory Name </label>
                <input {...register('name')} type="text" id="name"  className="form-control" />
                {errors.name && <span style={{ color: 'red' }}> { errors.name?.message }  </span>}
              </div>

              <div className="form-group mb-4">
                <label htmlFor="category" className='form-label'> Event Category </label> <br/>
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <Select
                      style={{ width: 220 }}
                      onChange={ (value ) => field.onChange(value) }
                      options={
                        eventcategories.length > 0 && ( eventcategories.map( ( item, i ) =>{
                          return { value: item.id, label: item.name }
                        })) } 
                    />
                  )}
                />
                {errors.category && <p style={{ color: 'red' }}> { errors.category?.message }  </p>}
              </div>
  
              <div className="form-group">
                  <button  className="btn btn-primary"> Submit </button>
              </div>
  
          </form> 
      </DashboardLayout> 
    </Layout>
  )
}

export default protectRoute(SubCategoryCreate)