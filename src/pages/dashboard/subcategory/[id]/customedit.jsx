import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { useRouter } from "next/router"
import { createSubEventCategory } from '@/store/slices/eventsubcategory';
import { getEventCategories } from '@/store/slices/eventcategory';
import { Select } from 'antd'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, date, InferType } from 'yup'; 
import { protectRoute } from '@/components/protectRoute';


let validationSchema = object({
    name: string().required().label("Name"),
    event_category: string().required().label("event_category"),
});

const EditSubCategory = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({resolver: yupResolver(validationSchema)});
    const router = useRouter()
    const { id } = router.query
    const dispatch = useDispatch();
    const eventcategories =  useSelector( state => state.eventcategory.items );
    const eventsubcategories =  useSelector( state => state.eventsubcategory.items );

    const [ name, setName ] = useState ('')
    const [ category, setCategory] = useState('');
  
    useEffect( () => {
      if( id !== 'undefined' ) {
        dispatch(getEventCategories());
        const eventsubcategory  = eventsubcategories.find( item => item.id == id );
      }
    },[dispatch, id])

    const onSubmit = (data) => {
        console.log(data);
    };

  return (
    <Layout> 
      <DashboardLayout>        
        <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
              
            <div className="form-group mb-4">
                <label htmlFor="name" className='form-label'> SubCategory Name </label>
                <input {...register('name', { required: true })} type="text" id="name"  className="form-control" />
            </div>

            <div className="form-group mb-4">
                <label htmlFor="event_category" className='form-label'> Event Category </label>
                <Select
                  style={{ width: 120 }}
                  onChange={ (value ) => setCategory(value)}
                  options={
                    eventcategories.map( ( item, i ) =>{
                      return { value: item.id, label: item.name }
                    })}
                />
            </div>
  
            <div className="form-group">
                <button className="btn btn-primary"> Submit </button>
            </div>
        </form> 
      </DashboardLayout> 
    </Layout>
  )
}

export default protectRoute(EditSubCategory)