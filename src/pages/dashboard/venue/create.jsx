import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from "next/router"
import Layout from '@/components/layout'
import { createVenue } from '../../../store/slices/venue'
import DashboardLayout from '@/components/DashboardLayout'
import { Select } from 'antd'
import { getCountries, getStates } from '@/store/slices/countries'
import { protectRoute } from '@/components/protectRoute'
import { unwrapResult } from '@reduxjs/toolkit'

const VenueCreate = () => {
    let dispatch = useDispatch();
    let router = useRouter();
    const countries = useSelector( state => state.country.countries)
    const states = useSelector( state => state.country.states)
    const [countryId, setCountryId] = useState('')
    const [stateId, setStateId] = useState('')

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
        try {
            let resultAction = dispatch(createVenue({ 
                name: input.name, 
                nickname: input.nickname,
                city: input.city,
                country: countryId,
                state: stateId,
                country: input.country,
                state: input.state,
                postcode: input.postcode
            }));
            unwrapResult( resultAction);
            router.push('/dashboard/venue')
        } catch (error) {
            console.log(error);
        }    
    }

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch])
    
    useEffect(() => {
        if( countryId !== '') {
            dispatch(getStates(countryId));
        }
    }, [dispatch, countryId])

    return (
        <Layout>
            <DashboardLayout>

         <form action='' method='post' onSubmit={handleSubmit}>   
          
            <div className="form-group mb-4">
                <label htmlFor="name" className='form-label'> Venue Name </label>
                <input type="text" name="name" id="name" className="form-control" onChange={handleChange}  />
            </div>

            <div className="form-group mb-4">
                <label htmlFor="nickname" className='form-label'> Venue Nickname </label>
                <input type="text" name="nickname" id="nickname" className="form-control mb-4" onChange={handleChange}  />
            </div>

            <div className="form-group mb-4">
                <label htmlFor="postcode" className='form-label'> PostCode </label>
                <input type="text" name="postcode" id="postcode" className="form-control mb-4" onChange={handleChange}  />
            </div>

            <div className="form-group mb-4">
                <label htmlFor="country" className='form-label'> Country </label>
                {/* <Select
                    style={{ width: 120 }}
                    onChange={ (value ) => setCountryId(value)}
                    options={ countries.length > 0 ? countries.map( item => {
                        return { value: item.id,label: item.name }
                    }) : [] }
                /> */}
                <input type="text" name="country" id="country" className="form-control mb-4" onChange={handleChange}  />
            </div>

            <div className="form-group mb-4">
                <label htmlFor="state" className='form-label'> State </label>
                {/* <Select
                    style={{ width: 120 }}
                    onChange={ (value ) => setStateId(value)}
                    options={ states.length > 0 ? states.map( item => {
                        return { value: item.id, label: item.name }
                    }) : [] }
                /> */}
                <input type="text" name="state" id="state" className="form-control mb-4" onChange={handleChange}  />
            </div>

            <div className="form-group mb-4">
                <label htmlFor="city" className='form-label'> City </label>
                <input type="text" name="city" id="city" className="form-control mb-4" onChange={handleChange}  />
            </div>

            <div className="form-group">
                 <button className="btn btn-primary"> Submit </button>
            </div>
        
        </form>

            </DashboardLayout>
        </Layout>
    )
}

export default protectRoute(VenueCreate)