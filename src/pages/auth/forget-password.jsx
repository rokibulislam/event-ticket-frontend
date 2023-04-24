import Layout from '@/components/layout'
import React, { useState } from 'react'

const ForgetPassword = () => {

    const [email, setEmail] = useState(null)
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }

  return (
    <Layout>
        <h2 className='jumbotron text-center bg-primary square p-5 text-white'>ForgetPassword</h2>

        <div className='col-md-4 offset-md-4'>

            <form action='' method='post' onSubmit={handleSubmit}>
                <div className="form-group">
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
                </div>

                <button type='submit' className="btn btn-primary btn-lg btn-block"> Submit </button>
            </form>
        </div>
    
    </Layout>
  )
}

export default ForgetPassword