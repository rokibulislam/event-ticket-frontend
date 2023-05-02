import Layout from '@/components/layout'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from "next/router"
import DashboardLayout from '@/components/DashboardLayout';
import { createEvent } from '@/store/slices/event'
import { getEventCategories, getSubCategoriesByCategory } from '@/store/slices/eventcategory'
import { getEventTypes } from '@/store/slices/eventtype'
import { getVenues } from '@/store/slices/venue';
import { SeatsioSeatingChart, SeatsioEventManager, SeatsioChartManager, SeatsioDesigner } from '@seatsio/seatsio-react';
import { DatePicker, TimePicker, Radio, Upload, Button } from 'antd';
import { getTicketTypes } from '@/store/slices/tickettype';
import VenueRepeatField from '@/components/VenueRepeatField'
import TicketRepeatField from '@/components/TicketField';
import { protectRoute } from '@/components/protectRoute';
// import { getSubEventCategories, getSubEventCategory } from '@/store/slices/eventsubcategory';

const EventCreate = () => {
  let dispatch = useDispatch();
  let router = useRouter();
  const [ chart, setChart ] = useState(null)
  const [ reserve, setReserve ] = useState(null)

  const eventtypes =  useSelector( state => state.eventtype.items );
  const eventcategories =  useSelector( state => state.eventcategory.items );
  const eventsubcategories =  useSelector( state => state.eventcategory.subcategory );
  const venues =  useSelector( state => state.venue.items );
  const tickettypes =  useSelector( state => state.tickettype.items );

  const [category, setCategory] = useState('')

  const [ input, setInput ] = useState ({
    'event_name': '',
    'event_description': '',
    'event_type': '',
    // 'event_category': '',
    'event_venue': '',
  })

  const [image, setImage] = useState(null);

  useEffect( () => {
    dispatch(getEventCategories());
    dispatch(getEventTypes());
    // dispatch(getVenues());
    dispatch(getTicketTypes());
  }, [dispatch])


  useEffect( () => {
    if( category !== '') {
      console.log('subcategory fetching');
      dispatch(getSubCategoriesByCategory(category))
    }
  }, [category])

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('name', input.event_name)
    formData.append('description', input.event_description)
    formData.append('image', image)
    formData.append('type_id', input.event_type)
    formData.append('category_id', input.event_category)
    formData.append('venue_id', input.event_venue)
    
    dispatch(createEvent(formData));

    // router.push('/dashboard/events')
  }


  const onRevisiedChange = (e) => {
    e.preventDefault();
    setReserve(e.target.value)
    // console.log('radio checked', e.target.value);
  }

  return (
    <Layout> 
      <DashboardLayout>
        <h2> Events Create  </h2> 

      <form action='' method='post' onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label htmlFor="event_name" className='form-label'> Event Name </label>
          <input type="text" name="event_name" id="" className="form-control " onChange={handleChange}  />
        </div>

        <div className='row'>
            
            <div className="col">
              <div className="form-group mb-4">
                <label htmlFor="event_type" className='form-label'> Event Type </label>
                <select className="form-control mb-4" name="event_type" id="event_type" onChange={handleChange}>
                  <option value=""> Select Type </option>
                  {
                    eventtypes.length > 0  ? (
                      eventtypes.map( ( item, i ) =>{
                        return (
                          <option value={item.id} key={item.id}>
                            { item.name }
                          </option>
                        )
                      })
                    ) : ''
                  }
                </select>
              </div>
            </div>
          
          <div className="col">

            <div className="form-group mb-4">
              <label htmlFor="event_category" className='form-label'> Event Category </label>
              <select className="form-control mb-4" name="event_category" id="" onChange={ (e) => setCategory(e.target.value)} >
                <option value=""> Select Category </option>
              {
                  eventcategories.length > 0  ? (
                    eventcategories.map( ( item, i ) =>{
                      return (
                        <option value={item.id} key={item.id}>
                          { item.name }
                        </option>
                      )
                    })
                  ) : ''
                }
              </select>
            
            </div>
          
          </div>

          <div className="col">
            <div className="form-group mb-4"> 
                <label htmlFor="event_subcategory" className='form-label'> Event SubCategory </label>
                <select className="form-control mb-4" name="event_subcategory" id="event_subcategory">
                  <option value=""> Select SubCategory </option>
                  {
                  eventsubcategories.length > 0  ? (
                    eventsubcategories.map( ( item, i ) =>{
                      return (
                        <option value={item.id} key={item.id}>
                          { item.name }
                        </option>
                      )
                    })
                  ) : ''
                }
                </select>
            </div>
          </div>
        

        <div className="col">

          {/* <div className="form-group mb-4">
            <label htmlFor="event_venue" className='form-label'> Event Venue </label>
            <select className="form-control mb-4" name="event_venue" id="event_venue" onChange={handleChange} >
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
          </div>  */}

        </div>
      
      </div>
      

        <div className="form-group mb-4">
          <label htmlFor="event_description" className='form-label'> About Your Event </label>
          <textarea name="event_description" id="event_description" className="form-control mb-4" onChange={handleChange}> 
           </textarea>
        </div>
      
        <div className="form-group mb-5" style={{ 'height': "150px"}}>
              <Upload.Dragger 
                multiple={false}
                onChange= { info => setImage(info.file) }
                onDrop = { (e) => {
                  console.log('Dropped files', e.dataTransfer.files);
                } }
              >
                  Drag files here OR
                  <br/>
                  <Button> Click Upload </Button>
              </Upload.Dragger>

        </div>

        {/* <div className="form-group mb-4">
          <label htmlFor="image">Event Image:</label>
          <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />
        </div> */}

  
        <div className='row'>
          <div className="col">
            <div className='form-group mb-4'>
              <label htmlFor='' className='form-label'> Start Date </label>
              <DatePicker className="form-control"/>
            </div>
          </div>

          <div className="col">
            <div className='form-group mb-4'>
              <label htmlFor='' className='form-label'> End Date </label>
              <DatePicker className="form-control"/>
            </div>
          </div>

          <div className="col">
            <div className='form-group mb-4'>
              <label htmlFor='' className='form-label'> Start Time </label>
              <TimePicker className="form-control" mode='time'/>
            </div>
          </div>

          <div className="col">
            <div className='form-group mb-4'>
              <label htmlFor='' className='form-label'> End Time </label>
              <TimePicker className="form-control" mode='time'/>
            </div>
          </div>
        </div>

        <div className='form-group mb-4'>
          <label htmlFor="" className='form-label'> IS THIS RESERVED SEATING? WHERE CUSTOMERS PICK THEIR OWN SEATS. </label>
          <Radio.Group onChange={onRevisiedChange} className='form-control'>
            <Radio value={1}>Yes</Radio>
            <Radio value={0}>No</Radio>
          </Radio.Group>
        </div>

        <h2> Tickets </h2>
        <TicketRepeatField />
        {
          reserve == 1 ? (
            <>
              <h2> Venue </h2>
              <VenueRepeatField />
            </>
          ) : ''
        }


      {/* <div className="form-group" style={{ 'height': '500px' }}> 
        <SeatsioDesigner
          secretKey="6e51c7b0-a9ce-4425-9822-831137892ab5"
          region="NA"
          onChartCreated={chart => {
            console.log('created chart', chart)
          }}
          onChartUpdated={chart =>{
            setChart(chart);
            console.log('updated chart', chart)
          }}
          pricing= {[
            {"category": "test category", 'price': 30},
        ]}
        />

      </div> */}

        <div className="form-group">
          <button className="btn btn-primary"> Submit </button>
        </div>
      </form>

      </DashboardLayout>
    </Layout>
  )
}

export default protectRoute(EventCreate)