import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import { useRouter } from "next/router"
import { updateCoupon, getCoupon } from '@/store/slices/coupon';

const EditCoupon = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id  } = router.query
  const coupon =  useSelector( state => state.coupon.item );
  const [ code, setCode ] = useState (coupon.code)
  const [ amount, setAmount ] = useState (coupon.discount_amount)

  useEffect( () => {
    dispatch(getCoupon(id))
  },[dispatch, router])

  const handleSubmit = (e) => {
    e.preventDefault(); 
    dispatch(updateCoupon({code,amount}));
    setCode("");
    setAmount("");
    router.push('/dashboard/coupons')
  };

  return (
    <Layout>
        <DashboardLayout>
            <h2> EditCoupon </h2> 
            <form action='' method='post' onSubmit={handleSubmit}>
      
              <div className="form-group mb-4">
                <label htmlFor="code" className='form-label'> Coupon Code </label>
                <input type="text" name="code" id="" value={code} className="form-control" onChange={ (e) => {
                  setCode(e.target.value)
                }}  />
              </div>

              <div className="form-group mb-4">
                <label htmlFor="amount" className='form-label'> Discount Amount </label>
                <input type="text" name="amount" id="" value={amount} className="form-control" onChange={ (e) => {
                  setAmount(e.target.value)
                }}  />
              </div>

              <div className="form-group">
                  <button className="btn btn-primary"> Submit </button>
              </div>

            </form> 
        </DashboardLayout>
    </Layout>
  )
}

export default EditCoupon