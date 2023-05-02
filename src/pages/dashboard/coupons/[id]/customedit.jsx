import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { useRouter } from "next/router"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, date, InferType } from 'yup'; 
import { createCoupon, updateCoupon } from '@/store/slices/coupon';
import { protectRoute } from '@/components/protectRoute';

let validationSchema = object({
    code: string().required().label("Code"),
    amount: number().required().label("Amount")
});


const EditCoupon = () => {
    const dispatch = useDispatch();
    let router = useRouter();
    const { id  } = router.query
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({resolver: yupResolver(validationSchema)});
    const coupons =  useSelector( state => state.coupon.items );
    const [ code, setCode ] = useState ('')
    const [ amount, setAmount ] = useState ('')

    useEffect( () => {
        if( id !== 'undefined' ) {
          let coupon  = coupons.find( item => item.id == id );
          setCode(coupon.code);
          setAmount(coupon.discount_amount);
        }
    },[dispatch, id])
  
    const onSubmit = ( data ) => {
        console.log(data);
        // dispatch( updateCoupon( { id, code, amount } ));
        // router.push('/dashboard/coupons')
    };
    
    return (
        <Layout>
            <DashboardLayout>
                <h2> CreateCoupon </h2> 
                <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group mb-4">
                        <label htmlFor="code" className='form-label'> Coupon Code </label>
                        <input {...register('code')} type="text" id="code" value={code} className="form-control"/>
                    </div>
                    
                    <div className="form-group mb-4">
                        <label htmlFor="amount" className='form-label'> Discount Amount </label>
                        <input {...register('amount')} type="text" id="amount" value={amount} className="form-control" />
                    </div>
                    
                    <div className="form-group">
                        <button disabled={!isValid} className="btn btn-primary"> Submit </button>
                    </div>
                </form> 
            </DashboardLayout>
        </Layout>
    )
}

export default protectRoute(EditCoupon)