import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from "next/router"
import Layout from '@/components/layout'
import { createVenue } from '../../../store/slices/venue'
import DashboardLayout from '@/components/DashboardLayout'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, date, InferType } from 'yup'; 
import { protectRoute } from '@/components/protectRoute'

let validationSchema = object({
    name: string().required().label("name"),
    nickname: string().required().label("nickname"),
    postcode: string().required().label("postcode"),
    country: string().required().label("country"),
    city: string().required().label("city"),
});

const VenueCreate = () => {
    let dispatch = useDispatch();
    let router = useRouter();
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({resolver: yupResolver(validationSchema)});

    const onSubmit = (data) => console.log(data);

    return (
        <Layout>
            <DashboardLayout>

         <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>   
          
            <div className="form-group mb-4">
                <label htmlFor="name" className='form-label'> Venue Name </label>
                <input {...register('name')} type="text" id="name" className="form-control"/>
            </div>

            <div className="form-group mb-4">
                <label htmlFor="nickname" className='form-label'> Venue Nickname </label>
                <input {...register('nickname')} type="text" id="nickname" className="form-control"/>
            </div>

            <div className="form-group mb-4">
                <label htmlFor="postcode" className='form-label'> PostCode </label>
                <input {...register('postcode')} type="text" id="postcode" className="form-control"/>
            </div>

            <div className="form-group mb-4">
                <label htmlFor="country" className='form-label'> Country </label>
                <input {...register('country', { required: true })}  type="text" name="country" id="country" className="form-control"/>
            </div>

            <div className="form-group mb-4">
                <label htmlFor="state" className='form-label'> State </label>
                <input {...register('state')} type="text" name="state" id="state" className="form-control"/>
            </div>

            <div className="form-group mb-4">
                <label htmlFor="city" className='form-label'> City </label>
                <input {...register('city')}  type="text" name="city" id="city" className="form-control"/>
            </div>

            <div className="form-group">
                 <button disabled={!isValid}  className="btn btn-primary"> Submit </button>
            </div>
        
        </form>

            </DashboardLayout>
        </Layout>
    )
}

export default protectRoute(VenueCreate)