import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from "next/router"
import Layout from '@/components/layout'
import { createVenue } from '../../../store/slices/venue'
import DashboardLayout from '@/components/DashboardLayout'

const VenueCreate = () => {
    let dispatch = useDispatch();
    let router = useRouter();
    const [ input, setInput ] = useState({
        'name' : '',
        'nickname' : '',
        'city': '',
        'country': '',
        'state': '',
        'postcode': ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setInput({
          ...input,
          [name]: value
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        dispatch(createVenue({ 
          name: input.name, 
          nickname: input.nickname,
          city: input.city,
          country: input.country,
          state: input.state,
          postcode: input.postcode
        }));
    
        router.push('/dashboard/venue')
    }

    return (
        <Layout>
            <DashboardLayout>

         <form action='' method='post' onSubmit={handleSubmit}>   
          
            <div className="form-group">
                <label htmlFor=""> Venue Name </label>
                <input type="text" name="name" id="" className="form-control" onChange={handleChange}  />
            </div>

            <div className="form-group">
                <label htmlFor=""> Venue Nickname </label>
                <input type="text" name="nickname" id="" className="form-control" onChange={handleChange}  />
            </div>

            <div className="form-group">
                <label htmlFor=""> PostCode </label>
                <input type="text" name="postcode" id="" className="form-control" onChange={handleChange}  />
            </div>

            <div className="form-group">
                <label htmlFor=""> Country </label>
                <input type="text" name="country" id="" className="form-control" onChange={handleChange}  />
            </div>

            <div className="form-group">
                <label htmlFor=""> State </label>
                <input type="text" name="state" id="" className="form-control" onChange={handleChange}  />
            </div>

            <div className="form-group">
                <label htmlFor=""> City </label>
                <input type="text" name="city" id="" className="form-control" onChange={handleChange}  />
            </div>

            <div className="form-group">
                 <button className="btn btn-primary"> Submit </button>
            </div>
        
        </form>

            </DashboardLayout>
        </Layout>
    )
}

export default VenueCreate