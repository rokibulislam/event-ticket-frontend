import Layout from '@/components/layout'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Checkbox, Form, Input } from 'antd';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, date, InferType } from 'yup'; 

import { getCartsItems, addCartItem, updateCartItem, removeCartItem } from '@/store/slices/cart';

let validationSchema = object({
    code: string().required().label("Code"),
    amount: number().required().label("Amount")
});

const Checkout = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({resolver: yupResolver(validationSchema)});
  
    const onSubmit = (data) => {
        console.log(data);
    };

    return (
    <Layout>
        <div className='checkout' style={{ display: 'flex'}}>

            <div className='billing'>   
            <h2> Billing Information </h2> 
            
                <div className='row'>
                    
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="firstname" className='form-label'> First Name </label>
                            <input {...register('firstname')} type="text" className='form-control' name="firstname" id="firstname" placeholder='First Name' onChange={ (e) => setFirstname(e.target.value)}/>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="lastname" className='form-label'> Last Name </label>
                            <input {...register('lastname')} type="text" className='form-control' name="lastname" id="lastname" placeholder='Last Name' onChange={ (e) => setLastname(e.target.value)}/>
                        </div>
                    </div>

                </div>

                <div className='row'>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="email" className='form-label'> Email Address </label>
                            <input {...register('email')} type="text" className='form-control' name="email" id="email" placeholder='Email Address' onChange={ (e) => setEmail(e.target.value)}/>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="phonenumber" className='form-label'> Phone Number </label>
                            <input {...register('phonenumber')} type="text" className='form-control' name="phonenumber" id="phonenumber" placeholder='Phone Number' onChange={ (e) => setPhone(e.target.value)}/>
                        </div>
                    </div>

                </div>

                <div className='row'>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="postalcode" className='form-label'> Postal Code </label>
                            <input {...register('postalcode')} type="text" className='form-control' name="postalcode" id="postalcode" placeholder='Postal Code' onChange={ (e) => setPostcode(e.target.value)} />
                        </div>
                    </div>
                </div>

            </div> 

            <div className="payment">
                
                <h2> Payment Information </h2>
                
                <div className="row">
                    
                    <div className="form-group">
                        <label htmlFor="cardNumber" className='form-label'>Card Number:</label>
                        <input type="text" id="cardNumber" name="cardNumber"  className='form-control' onChange={ (e) => {}} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="expirationDate" className='form-label'>Expiration Date:</label>
                        <input type="text" id="expirationDate" className='form-control' name="expirationDate" onChange={ (e) => {}} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cvv" className='form-label'>CVV:</label>
                        <input type="text" id="cvv" className='form-control' name="cvv" onChange={ (e) => {}} />
                    </div>

                </div>
            </div>
        </div>
    </Layout>
    )
}

export default Checkout;