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
  const venues =  useSelector( state => state.venue.items );

  //state
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [postcode, setPostcode] = useState('')

  useEffect( () => {
    if( id !== 'undefined') {
      const venue  = venues.find( item => item.id == id );
      setName(venue.name)
      setNickname(venue.nickname)
      setCity(venue.city)
      setCountry(venue.country)
      setState(venue.state)
      setPostcode(venue.postcode)
    }
  },[dispatch, id])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateVenue({
      id: id,
      name: name,
      nickname: nickname,
      city: city,
      country: country,
      state: state,
      postcode: postcode
    }))
    // router.push('/dashboard/venue')
  }

  return (
    <Layout>
        <DashboardLayout>
          
          <form action='' method='post' onSubmit={handleSubmit}>   
          
              <div className="form-group">
                  <label htmlFor=""> Venue Name </label>
                  <input type="text" name="name" id="" className="form-control mb-4" onChange={ (e) => setName(e.target.value)} value={name} />
              </div>

              <div className="form-group">
                <label htmlFor=""> Nickname </label>
                <input type="text" name="nickname" id="" className="form-control mb-4" onChange={ (e) => setNickname(e.target.value) }  value={nickname} />
              </div>

              <div className="form-group">
                  <label htmlFor=""> PostCode </label>
                  <input type="text" name="postcode" id="" className="form-control mb-4" onChange={ (e) => setPostcode(e.target.value)} value={postcode} />
              </div>

              <div className="form-group">
                  <label htmlFor=""> Country </label>
                  <input type="text" name="country" id="" className="form-control mb-4" onChange={ (e) => setCountry(e.target.value) } value={country}  />
              </div>

              <div className="form-group">
                  <label htmlFor=""> State </label>
                  <input type="text" name="state" id="" className="form-control mb-4" onChange={ (e) => setState(e.target.value) }  value={state} />
              </div>

              <div className="form-group">
                  <label htmlFor=""> City </label>
                  <input type="text" name="city" id="" className="form-control mb-4" onChange={(e) => setCity(e.target.value)}  value={city} />
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