import Layout from '@/components/layout'
import React, { useState } from 'react'
import { useForm } from "react-hook-form";


const CustomForgetPassword = () => {

    const [email, setEmail] = useState(null)
    
    const onSubmit = (e) => {
        e.preventDefault();
    }

    const { register, handleSubmit, formState: { errors, isValid } } = useForm();

  return (
    <Layout>
        <h2 className='jumbotron text-center bg-primary square p-5 text-white'>ForgetPassword</h2>

        <div className='col-md-4 offset-md-4'>

            <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-4">
                    <label htmlFor="email" className='form-label'> Email Address </label>
                    <input 
                        {...register('email', { required: true })}
                        type="text" 
                        name="email" 
                        id="email" 
                        className="form-control"
                        placeholder='Enter Email Address'
                    />
                </div>

                <button disabled={!isValid} type='submit' className="btn btn-primary btn-lg btn-block"> Submit </button>
            </form>
        </div>
    
    </Layout>
  )
}

export default CustomForgetPassword