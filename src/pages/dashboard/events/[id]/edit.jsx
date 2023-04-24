import Layout from '@/components/layout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import DashboardLayout from '@/components/DashboardLayout';
import { getEvent, updateEvent } from '@/store/slices/event';
import { getEventCategories } from '@/store/slices/eventcategory'
import { getEventTypes } from '@/store/slices/eventtype'
import { getVenues } from '@/store/slices/venue';

const EditEvents = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch();

  const event =  useSelector( state => state.event.item );

  const eventtypes =  useSelector( state => state.eventtype.items );
  const eventcategories =  useSelector( state => state.eventcategory.items );
  const venues =  useSelector( state => state.venue.items );

  useEffect( () => {
    dispatch(getEvent(id))
    dispatch(getEventCategories());
    dispatch(getEventTypes());
    dispatch(getVenues());
  },[dispatch, router])


  const handleChange = (e) => {
    const { name, value } = e.target;

    // setInput({
    //   ...input,
    //   [name]: value
    // })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Layout>
      <DashboardLayout>
        
        <h2> Edit Events </h2> 
        
        <form action='' method='post' onSubmit={handleSubmit}>

          <input type="hidden" name="id" value={event.id} />
          
          <div className="form-group">
            <label htmlFor=""> Event Name </label>
            <input type="text" name="event_name" id="" className="form-control mb-4" value={event.name} onChange={handleChange}  />
          </div>

          <div className="form-group">
            <label htmlFor=""> Event Type </label>
            <select className="form-control mb-4" name="event_type" id="" onChange={handleChange} >
              {
                eventtypes.length > 0  ? (
                  eventtypes.map( ( item, i ) =>{
                    return (
                      <option value={item.id}>
                        { item.name }
                      </option>
                    )
                  })
                ) : ''
              }
            </select>
          </div>

        <div className="form-group">
          <label htmlFor=""> Event Category </label>
          <select className="form-control mb-4" name="event_category" id="" onChange={handleChange} >
          {
              eventcategories.length > 0  ? (
                eventcategories.map( ( item, i ) =>{
                  return (
                    <option value={item.id}>
                      { item.name }
                    </option>
                  )
                })
              ) : ''
            }
          </select>
        </div>

        <div className="form-group">
          <label htmlFor=""> Event Venue </label>
          <select className="form-control mb-4" name="event_venue" id="" onChange={handleChange} >
            { 
              venues.length > 0  ? (
                venues.map( ( item, i ) =>{
                  return (
                    <option value={item.id}>
                      { item.name }
                    </option>
                  )
                })
              ) : ''
            }
          </select>
        </div> 

          <div className="form-group">
            <label htmlFor="event_description"> About Your Event </label>
            <textarea name="event_description" id="event_description" className="form-control mb-4" onChange={handleChange}>  </textarea>
            {event.description}
          </div>

          <div className="form-group">
              <button className="btn btn-primary"> Submit </button>
          </div>

        </form>

      </DashboardLayout>
    </Layout>
  )
}

export default EditEvents