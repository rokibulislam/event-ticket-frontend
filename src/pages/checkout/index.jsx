import Layout from '@/components/layout'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Controller, useForm } from "react-hook-form";
import Cart from '@/components/Cart'
import { checkoutvalitionSchema } from '@/validation';
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from '@/components/Form/input';
import CustomDatepicker from '@/components/Form/datepicker';
import { Button } from 'antd';

const Checkout = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors, isValid }, setError } = useForm({resolver: yupResolver(checkoutvalitionSchema)});

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <Layout>
    
    <div className='container checkout' style={{ display: 'flex'}}>
      
      <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
        <div className='billing'>  
          
          <h2> Billing Information </h2> 
          
          <div className='row'>
              <div className="col-md-6">
                <CustomInput register={register} label="First Name" name="firstname" placeholder='First Name' errors={errors} />
              </div>

              <div className="col-md-6">
                  <CustomInput register={register} label="Last Name" name="lastname" placeholder='Last Name' errors={errors} />
              </div>
          </div>

          <div className='row'>
              <div className="col-md-6">
                <CustomInput register={register} label="Email Name" name="email" placeholder='Email Name' errors={errors} />
              </div>
              <div className="col-md-6">
                  <CustomInput register={register} label="Phone Number" name="phonenumber" placeholder='Phone Number' errors={errors} />
              </div>
          </div>


          <div className='row'>
              <div className="col-md-6">
                <CustomInput register={register} label="Phone Number" name="phonenumber" placeholder='Phone Number' errors={errors} />
              </div>
          </div>

        </div>

        <div className="payment">
                  
            <h2> Payment Information </h2>
            
            <div className="row">
                <CustomInput register={register} label="Card Number" name="cardNumber" placeholder='Card Number' errors={errors} />
                <div className="form-group mb-4">
                    <label htmlFor="expirationDate" className='form-label'>Expiration Date:</label>
                    <input type="text" id="expirationDate" className='form-control' name="expirationDate" onChange={ (e) => { setExpirationDate(e.target.value) }} />
                </div>
                <CustomInput register={register} label="CVV" name="cvv" placeholder='CVV' errors={errors} />
            </div>

        </div>

        <Button type="primary" htmlType="submit">
          Complete Checkout
        </Button>
      </form>

      <div>
        <Cart />
      </div>
      
    </div>
    </Layout>
  )
}

export default Checkout
