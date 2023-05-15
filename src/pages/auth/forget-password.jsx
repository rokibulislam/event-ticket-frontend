import CustomInput from '@/components/Form/input'
import Layout from '@/components/layout'
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const ForgetPassword = () => {
    const { register, handleSubmit, formState: { errors, isValid }, setError } = useForm();
    const [email, setEmail] = useState(null)
    
    const onSubmit = (data) => {
        console.log(data);
    }

  return (
    <Layout>
        <h2 className='jumbotron text-center bg-primary square p-5 text-white'>ForgetPassword</h2>

        <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>

            <div className='col-md-4 offset-md-4'>

                <CustomInput label="Email Address"  name="email" placeholder='Enter Email Address' />
                    
                {/* <div className="form-group">
                    <label htmlFor=""> Email Address </label>
                    <input 
                        type="text" 
                        name="email" 
                        id="" 
                        className="form-control mb-4" 
                        onChange={ (e) => setEmail(e.target.value)} 
                        value={email} 
                        placeholder='Enter Email Address'
                    />
                </div> */}

                <button type='submit' className="btn btn-primary btn-lg btn-block"> Submit </button>
            </div>
        </form>
    </Layout>
  )
}

export default ForgetPassword