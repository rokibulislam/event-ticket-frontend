import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { useRouter } from "next/router"
import { updateSubEventCategory } from '@/store/slices/eventsubcategory';
import { getEventCategories } from '@/store/slices/eventcategory';
import { Select } from 'antd'
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, date, InferType } from 'yup'; 
import { protectRoute } from '@/components/protectRoute';
import { subcategoryvalidationSchema } from '@/validation';
import CustomSelect from '@/components/Form/select';
import { unwrapResult } from '@reduxjs/toolkit';

const EditSubCategory = () => {
    const { control, register, handleSubmit, reset, getValues, formState: { errors, isValid } } = useForm({resolver: yupResolver(subcategoryvalidationSchema)});
    const router = useRouter()
    const { id } = router.query
    const dispatch = useDispatch();
    const eventcategories =  useSelector( state => state.eventcategory.items );
    const eventsubcategories =  useSelector( state => state.eventsubcategory.items );

    const [ name, setName ] = useState ('')
    const [ category, setCategory] = useState({});
  
    useEffect( () => {
      if( id !== 'undefined' ) {
        dispatch(getEventCategories());
        const eventsubcategory  = eventsubcategories.find( item => item.id == id );
        console.log(eventsubcategory.category);
        setName(eventsubcategory.name)
        setCategory(eventsubcategory.category)
      }
    },[dispatch, id])

    useEffect(() => {
      reset({
        name: name,
        category: category
      })
    }, [name, category])

    const onSubmit = (data) => {
      try {
        let resultAction = updateSubEventCategory({
          id: id,
          name: data.name,
          category_id: data.category
        })
        unwrapResult(resultAction)
        router.push('/dashboard/subcategory'); 
      } catch (error) {
        console.log(error);
      }
    };

  let selectedCat =  { value: getValues('category')?.id, label: getValues('category')?.name } 
 //             value={ { value: category.id, label: category.name } }
  return (
    <Layout> 
      <DashboardLayout>        
        <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
              
            <div className="form-group mb-4">
                <label htmlFor="name" className='form-label'> SubCategory Name </label>
                <input {...register('name', { required: true })} type="text" id="name"  className="form-control" />
                {errors.name && <span style={{ color: 'red' }}> { errors.name?.message }  </span>}
            </div>

            <CustomSelect options={eventcategories} control={control} label="Event Category" name="category" errors={errors}  value={selectedCat} />

            <div className="form-group">
                <button className="btn btn-primary"> Submit </button>
            </div>
        </form> 
      </DashboardLayout> 
    </Layout>
  )
}

export default protectRoute(EditSubCategory)