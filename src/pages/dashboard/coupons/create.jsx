import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import { useRouter } from "next/router"
import { createCoupon } from '@/store/slices/coupon';


const CreateCoupon = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [ code, setCode ] = useState ('')
  const [ amount, setAmount ] = useState ('')

  const handleSubmit = (e) => {
    e.preventDefault(); 
    dispatch(createCoupon({code,amount}));
    setCode("");
    setAmount("");
    router.push('/dashboard/coupons')
  };

  return (
    <Layout>
        <DashboardLayout>
            <h2> CreateCoupon </h2>
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

export default CreateCoupon