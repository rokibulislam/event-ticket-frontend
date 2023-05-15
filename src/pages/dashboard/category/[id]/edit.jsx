import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { createEventCategory, updateEventCategory } from '@/store/slices/eventcategory';
import { useRouter } from "next/router"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { protectRoute } from '@/components/protectRoute';
import { categoryvalidationSchema } from '@/validation';
import { unwrapResult } from '@reduxjs/toolkit';

const EditCategory = () => {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({resolver: yupResolver(categoryvalidationSchema)});
    const categories =  useSelector( state => state.eventcategory.items );
    const [name, setName] = useState('')

    useEffect( () => {
        if( id !== 'undefined' ) {
            const category  = categories.find( item => item.id == id );
            setName(category?.name);
            // dispatch(getEventCategory(routerId))
        }
  },[dispatch, id])

  useEffect(() => {
    reset({
      name: name
    })
  }, [name])

  const onSubmit = (data) => {
    try {
      let resultAction = dispatch(updateEventCategory({
        id: id,
        name: data.name
      }));
      unwrapResult(resultAction)
      router.push('/dashboard/category')
    } catch (error) {
      console.log(error);
    }
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

export default protectRoute(EditCategory)