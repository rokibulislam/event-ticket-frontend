import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { useRouter } from "next/router"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, date, InferType } from 'yup'; 
import { createCoupon } from '@/store/slices/coupon';
import { protectRoute } from '@/components/protectRoute';

let validationSchema = object({
    code: string().required().label("Code"),
    amount: number().required().label("Amount"),
    discount_type: string().required().label('discount_type'),
    description: string().required().label('description'),
});


const CreateCoupon = () => {
    const dispatch = useDispatch();
    let router = useRouter();
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({resolver: yupResolver(validationSchema)});
  
    const onSubmit = (data) => {
        console.log(data);
        dispatch( createCoupon( { 
            code: data.code,
            amount: amount,
            discount_type: data.discount_type,
            description: data.description,
            minimum_amount: data.minimum_amount,
            usage_limit: data.usage_limit,
            usage_limit_per_user: data.usage_limit_per_user
        } ));
        // router.push('/dashboard/coupons')
    };
    
    return (
        <Layout>
            <DashboardLayout>
                <h2> CreateCoupon </h2> 
                <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className="form-group mb-4">
                        <label htmlFor="code" className='form-label'> Coupon Code </label>
                        <input {...register('code')} type="text" id="code" className="form-control"/>
                        {errors.code && <span style={{ color: 'red' }}> { errors.code?.message }  </span>}
                    </div>

                    <div className="form-group mb-4">
                        <label htmlFor="description" className='form-label'> Coupon Description </label>
                        <textarea {...register('description')} id="description" className="form-control mb-4"> </textarea>
                        {errors.description && <span style={{ color: 'red' }}> { errors.description?.message }  </span>}
                    </div>
                    
                    <div className="form-group mb-4">
                        <label htmlFor="discount_type" className='form-label'> Discount Type </label>
                        <select {...register('discount_type')} className='form-control' id="discount_type">
                            <option value=""></option>
                            <option value="percent"> Percentage discount </option>
                            <option value="fixed_product"> Fixed product discount </option>
                        </select>
                        {errors.discount_type && <span style={{ color: 'red' }}> { errors.discount_type?.message }  </span>}
                    </div>

                    <div className="row">
                        
                        <div className="col-md-6">
                            <div className="form-group mb-4">
                                <label htmlFor="amount" className='form-label'> Discount Amount </label>
                                <input {...register('amount')} type="text" id="amount" className="form-control" />
                                {errors.amount && <span style={{ color: 'red' }}> { errors.amount?.message }  </span>}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group mb-4">
                                <label htmlFor="usage_limit" className='form-label'> Usage Limit </label>
                                <input {...register('usage_limit')} type='text' id="usage_limit" className="form-control mb-4" />
                                {errors.usage_limit && <span style={{ color: 'red' }}> { errors.usage_limit?.message }  </span>}
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        
                        <div className="col-md-6">
                            <div className="form-group mb-4">
                                <label htmlFor="usage_limit_per_user" className='form-label'> Usage Limit Per User </label>
                                <input {...register('usage_limit_per_user')} type='text' id="usage_limit" className="form-control mb-4" />
                                {errors.usage_limit_per_user && <span style={{ color: 'red' }}> { errors.usage_limit_per_user?.message }  </span>}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group mb-4">
                                <label htmlFor="minimum_amount" className='form-label'> Minimum Amount </label>
                                <input {...register('minimum_amount')} type='text' id="minimum_amount" className="form-control mb-4" />
                                {errors.minimum_amount && <span style={{ color: 'red' }}> { errors.minimum_amount?.message }  </span>}
                            </div>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <button disabled={!isValid} className="btn btn-primary"> Submit </button>
                    </div>
                </form> 
            </DashboardLayout>
        </Layout>
    )
}

export default protectRoute(CreateCoupon)