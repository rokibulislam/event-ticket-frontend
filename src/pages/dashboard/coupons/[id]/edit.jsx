import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import { useRouter } from "next/router"
import { updateCoupon, getCoupon } from '@/store/slices/coupon';
import { protectRoute } from '@/components/protectRoute';

const EditCoupon = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id  } = router.query
  const coupons =  useSelector( state => state.coupon.items );

  //state
  const [ code, setCode ] = useState ('')
  const [ amount, setAmount ] = useState ('')
  const [ description, setDescription ] = useState ('')
  const [ usagelimit, setUsagelimit ] = useState ('')
  const [ usagelimitperuser, setUsagelimitperuser ] = useState ('')
  const [ minimumamount, setMinimumamount ] = useState ('')
  const [ discounttype, setDiscounttype ] = useState ('')

  useEffect( () => {
    if( id !== 'undefined' ) {
      let coupon  = coupons.find( item => item.id == id );
      setCode(coupon.code);
      setAmount(coupon.discount_amount);
    }
    // dispatch(getCoupon(id))
  },[dispatch, id])

  const handleSubmit = (e) => {
    e.preventDefault(); 
    dispatch(updateCoupon({ id, code,amount}));
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
                <label htmlFor="description" className='form-label'> Coupon Description </label>
                <textarea name="description" id="description" className="form-control mb-4" onChange={ (e) => { setDescription(e.target.value) }}> </textarea>
              </div>

              <div className="form-group mb-4">
                  <label htmlFor="discount_type" className='form-label'> Discount Type </label>
                  <select className='form-control' name="discount_type" id="discount_type" onChange={ (e) => {
                      setDiscounttype(e.target.value)
                  }}>
                    <option value=""></option>
                    <option value="percent"> Percentage discount </option>
                    <option value="fixed_product"> Fixed product discount </option>
                  </select>
              </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label htmlFor="amount" className='form-label'> Discount Amount </label>
                      <input type="text" name="amount" id="" value={amount} className="form-control" onChange={ (e) => { setAmount(e.target.value) }}  />
                    </div>
                  </div>

                  <div className="col-md-6">
                      <div className="form-group mb-4">
                        <label htmlFor="usage_limit" className='form-label'> Usage Limit </label>
                        <input type='text' name="usage_limit" id="usage_limit" className="form-control mb-4" onChange={ (e) => { setUsagelimit(e.target.value) }} />
                      </div>
                  </div>
                </div>


              <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label htmlFor="usage_limit" className='form-label'> Usage Limit Per User </label>
                      <input type='text' name="usage_limit" id="usage_limit" className="form-control mb-4" onChange={ (e) => { setUsagelimitperuser(e.target.value) }} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label htmlFor="usage_limit" className='form-label'> Minimum Amount </label>
                      <input type='text' name="usage_limit" id="usage_limit" className="form-control mb-4" onChange={ (e) => { setMinimumamount(e.target.value) }} />
                    </div>
                  </div>
              </div>

              <div className="form-group">
                  <button className="btn btn-primary"> Submit </button>
              </div>

            </form> 
        </DashboardLayout>
    </Layout>
  )
}

export default protectRoute(EditCoupon)