import Layout from '@/components/layout'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from "next/router"
import DashboardLayout from '@/components/DashboardLayout';
import { createEvent } from '@/store/slices/event'
import { getEventCategories } from '@/store/slices/eventcategory'
import { getEventTypes } from '@/store/slices/eventtype'
import { getVenues } from '@/store/slices/venue';
import { SeatsioSeatingChart, SeatsioEventManager, SeatsioChartManager, SeatsioDesigner } from '@seatsio/seatsio-react';

const EventCreate = () => {
  let dispatch = useDispatch();
  let router = useRouter();
  const [ chart, setChart ] = useState(null)

  const eventtypes =  useSelector( state => state.eventtype.items );
  const eventcategories =  useSelector( state => state.eventcategory.items );
  const venues =  useSelector( state => state.venue.items );


  const [ input, setInput ] = useState ({
    'event_name': '',
    'event_description': '',
    'event_type': '',
    'event_category': '',
    'event_venue': '',
  })

  const [image, setImage] = useState(null);

  useEffect( () => {
    dispatch(getEventCategories());
    dispatch(getEventTypes());
    dispatch(getVenues());
  }, [dispatch])

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // const formData = new FormData()
    // formData.append('name', input.event_name)
    // formData.append('description', input.event_description)
    // formData.append('image', image)
    // formData.append('type_id', input.event_type)
    // formData.append('category_id', input.event_category)
    // formData.append('venue_id', input.event_venue)
    // formData.append( 'chart', chart)

    dispatch(createEvent({
      name: input.event_name,
      description: input.event_description,
      type_id: input.event_type,
      category_id: input.event_category,
      venue_id: input.event_venue
    }));

    // router.push('/dashboard/events')
  }

  return (
    <Layout> 
      <DashboardLayout>
        <h2> Events Create  </h2> 

      <form action='' method='post' onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor=""> Event Name </label>
          <input type="text" name="event_name" id="" className="form-control" onChange={handleChange}  />
        </div>

        <div className="form-group">
          <label htmlFor=""> Event Type </label>
          <select className="form-control" name="event_type" id="" onChange={handleChange} >
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
          <select className="form-control" name="event_category" id="" onChange={handleChange} >
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
          <select className="form-control" name="event_venue" id="" onChange={handleChange} >
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
          <textarea name="event_description" id="event_description" className="form-control" onChange={handleChange}> 
           </textarea>
        </div>
      
        {/* <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />
        </div> */}

      {/* <div className="form-group" style={{ 'height': '500px' }}> */}
        {/* <SeatsioDesigner
          secretKey="6e51c7b0-a9ce-4425-9822-831137892ab5"
          region="NA"
          onChartCreated={chart => {
            console.log('created chart', chart)
          }}
          onChartUpdated={chart =>{
            setChart(chart);
            console.log('updated chart', chart)
          }}
        /> */}
      {/* </div> */}


        <h2> Now let's set up the tickets </h2>



        <div className="form-group">
          <button className="btn btn-primary"> Submit </button>
        </div>
      </form>

      </DashboardLayout>
    </Layout>
  )
}

export default EventCreate