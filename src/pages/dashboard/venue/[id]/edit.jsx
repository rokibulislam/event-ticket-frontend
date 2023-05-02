import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import DashboardLayout from '@/components/DashboardLayout'
import { getVenue, updateVenue } from '@/store/slices/venue'
import { protectRoute } from '@/components/protectRoute'


const EditVenue = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch();
  const venue =  useSelector( state => state.venue.item );
  const [ input, setInput ] = useState({
    'name' : venue.name,
    'nickname' : venue.nickname,
    'city': venue.city,
    'country': venue.country,
    'state': venue.state,
    'postcode': venue.postcode
  })

  useEffect( () => {
    dispatch(getVenue(id))
  },[dispatch, router])

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id);
    console.log(input);
    dispatch(updateVenue({id, input}))
    // router.push('/dashboard/venue')
  }

  return (
    <Layout>
        <DashboardLayout>
          
          <form action='' method='post' onSubmit={handleSubmit}>   
          
              <div className="form-group">
                  <label htmlFor=""> Venue Name </label>
                  <input type="text" name="name" id="" className="form-control mb-4" onChange={handleChange} value={input.name} />
              </div>

              <div className="form-group">
                <label htmlFor=""> input Nickname </label>
                <input type="text" name="nickname" id="" className="form-control mb-4" onChange={handleChange}  value={input.nickname} />
              </div>

              <div className="form-group">
                  <label htmlFor=""> PostCode </label>
                  <input type="text" name="postcode" id="" className="form-control mb-4" onChange={handleChange} value={input.postcode} />
              </div>

              <div className="form-group">
                  <label htmlFor=""> Country </label>
                  <input type="text" name="country" id="" className="form-control mb-4" onChange={handleChange} value={input.country}  />
              </div>

              <div className="form-group">
                  <label htmlFor=""> State </label>
                  <input type="text" name="state" id="" className="form-control mb-4" onChange={handleChange}  value={input.state} />
              </div>

              <div className="form-group">
                  <label htmlFor=""> City </label>
                  <input type="text" name="city" id="" className="form-control mb-4" onChange={handleChange}  value={input.city} />
              </div>

              <div className="form-group">
                  <button className="btn btn-primary"> Submit </button>
              </div>
          
          </form>

        </DashboardLayout>
    </Layout>
  )
}

export default protectRoute(EditVenue)