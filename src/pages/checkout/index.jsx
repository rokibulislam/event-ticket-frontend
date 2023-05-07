import Layout from '@/components/layout'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Checkbox, Form, Input } from 'antd';
import { addCartItem, removeCartItem } from '@/store/slices/cart';
import Cart from '@/components/Cart'

const Checkout = () => {
  const dispatch = useDispatch();
  // state 
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postalcode, setPostcode] = useState("");

  // payment
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  
  useEffect(() => {

  })
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // send order data to backend API
  };

  return (
    <Layout>
    
    <div className='checkout' style={{ display: 'flex'}}>
      
      <div className='billing'>  
        
        <h2> Billing Information </h2> 
        
        <div className='row'>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="" className='form-label'> First Name </label>
                <input type="text" className='form-control' name="firstname" id="firstname" placeholder='First Name' onChange={ (e) => setFirstname(e.target.value)}/>
              </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="" className='form-label'> Last Name </label>
                  <input type="text" className='form-control' name="lastname" id="lastname" placeholder='Last Name' onChange={ (e) => setLastname(e.target.value)}/>
                </div>
            </div>
        </div>

        <div className='row'>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="" className='form-label'> Email Address </label>
                <input type="text" className='form-control' name="emailaddress" id="emailaddress" placeholder='Email Address' 
                onChange={ (e) => setEmail(e.target.value)}/>
              </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="" className='form-label'> Phone Number </label>
                  <input type="text" className='form-control' name="phonenumber" id="phonenumber" placeholder='Phone Number' onChange={ (e) => setPhone(e.target.value)}/>
                </div>
            </div>
        </div>


        <div className='row'>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="" className='form-label'> Postal Code </label>
                <input type="text" className='form-control' name="postalcode" id="postalcode" placeholder='Postal Code' onChange={ (e) => setPostcode(e.target.value)} />
              </div>
            </div>
        </div>

      </div>

      <div className="payment">
                
          <h2> Payment Information </h2>
          
          <div className="row">
              
              <div className="form-group">
                  <label htmlFor="cardNumber" className='form-label'>Card Number:</label>
                  <input type="text" id="cardNumber" name="cardNumber"  className='form-control' onChange={ (e) => { setCardNumber(e.target.value) }} />
              </div>

              <div className="form-group">
                  <label htmlFor="expirationDate" className='form-label'>Expiration Date:</label>
                  <input type="text" id="expirationDate" className='form-control' name="expirationDate" onChange={ (e) => { setExpirationDate(e.target.value) }} />
              </div>

              <div className="form-group">
                  <label htmlFor="cvv" className='form-label'>CVV:</label>
                  <input type="text" id="cvv" className='form-control' name="cvv" onChange={ (e) => { setCvv(e.target.value) }} />
              </div>

          </div>

      </div>

      <div>
        <Cart />
      </div>

    </div>
    </Layout>
  )
}

export default Checkout