import Layout from '@/components/layout'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from "next/router"
import DashboardLayout from '@/components/DashboardLayout';
import { createEvent, createSeatsEvent } from '@/store/slices/event'
import { getEventCategories, getSubCategoriesByCategory } from '@/store/slices/eventcategory'
import { getEventTypes } from '@/store/slices/eventtype'
import { getVenues } from '@/store/slices/venue';
import { SeatsioSeatingChart, SeatsioEventManager, SeatsioChartManager, SeatsioDesigner } from '@seatsio/seatsio-react';
import { DatePicker, TimePicker, Radio, Upload, Button, Select } from 'antd';
import { getTicketTypes } from '@/store/slices/tickettype';
import VenueRepeatField from '@/components/VenueRepeatField'
import TicketRepeatField from '@/components/TicketField';
import { protectRoute } from '@/components/protectRoute';
// import { getSubEventCategories, getSubEventCategory } from '@/store/slices/eventsubcategory';
import CustomTicketRepeatField from '@/components/TicketField/custom';
import CustomVenueRepeatField from '@/components/VenueRepeatField/custom';


const EventCreate = () => {
  let dispatch = useDispatch();
  let router = useRouter();
  
  //reudx store
  const eventtypes =  useSelector( state => state.eventtype.items );
  const eventcategories =  useSelector( state => state.eventcategory.items );
  const eventsubcategories =  useSelector( state => state.eventcategory.subcategory );
  const venues =  useSelector( state => state.venue.items );
  const tickettypes =  useSelector( state => state.tickettype.items );

  const chartkey =  useSelector( state => state.event.chartkey );

  // state 
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [venue, setVenue] = useState('')
  const [startdate, setStartdate] = useState('')
  const [enddate, setEnddate] = useState('')
  const [starttime, setStarttime] = useState('')
  const [endtime, setEndtime] = useState('')
  const [image, setImage] = useState(null);
  const [ chart, setChart ] = useState(null)
  const [ reserve, setReserve ] = useState(null)

  const [tickets, setTickets] = useState([{ ticket_type: '', ticket_name: '', ticket_price: '', ticket_qty: ''  }]);
  const [venuecategory, setVenuecategory] = useState([{ name: '', price: '', qty: '', fee: '' }]);


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

  const handleSubmit = (e) => {
    e.preventDefault();
   console.log(tickets);
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('image', image.originFileObj)
    formData.append('type_id', type)
    formData.append('category_id', category)
    formData.append('venue_id', venue)
    formData.append('startdate', startdate)
    formData.append('enddate', enddate)
    formData.append('starttime', starttime)
    formData.append('endtime', endtime)
    formData.append('tickets', JSON.stringify(tickets))
    formData.append('venuecategory', JSON.stringify(venuecategory) )
    formData.append('reserve', reserve)

    dispatch(createEvent(formData));
    // router.push('/dashboard/events')
  }

  function handleTicketeChange(i, event) {
    const values = [...tickets];
    values[i][event.target.name] = event.target.value;
    console.log(values);
    setTickets(values);
  }

  function handleTicketAddField() {
    const values = [...tickets];
    values.push({ ticket_type: '', ticket_name: '', ticket_price: '', ticket_qty: '' });
    setTickets(values);
  }

  function handleTicketRemoveField(i) {
    const values = [...tickets];
    values.splice(i, 1);
    setTickets(values);
  }

  const handleCreateEvent = (e) => {
    e.preventDefault();
    console.log('handle create event');
    dispatch( createSeatsEvent({
      name: name,
      chartkey: chartkey
    }))
  }

  return (
    <Layout> 
      <DashboardLayout>
        <h2> Events Create  </h2> 

      <form action='' method='post' onSubmit={handleSubmit}>
        
        <div className='row'>
          <div className="col-md-6">
            <div className="form-group mb-4">
              <label htmlFor="name" className='form-label'> Event Name </label>
              <input type="text" name="name" id="name" className="form-control " onChange={ (e) => setName(e.target.value) }  />
            </div>
          </div>
        </div>

        <div className='row'>
            <div className="col-md-4">
              <div className="form-group mb-4">
                <label htmlFor="type" className='form-label'> Event Type </label><br/>
                <Select
                  style={{ width: 320 }}
                  onChange={ (value ) => setType(value)}
                  options={ eventtypes.length > 0 ? eventtypes.map( item => {
                    return { value: item.id,label: item.name }
                  }) : [] }
                /> 
              </div>
            </div>
          
            <div className="col-md-4">
                <div className="form-group mb-4">
                  <label htmlFor="category" className='form-label'> Event Category </label> <br/>
                  <Select
                    style={{ width: 320 }}
                    onChange={ (value ) => setCategory(value)}
                    options={ eventcategories.length > 0 ? eventcategories.map( item => {
                      return { value: item.id,label: item.name }
                    }) : [] }
                  /> 
                </div>
            </div>

            <div className="col-md-4">
              <div className="form-group mb-4"> 
                  <label htmlFor="subcategory" className='form-label'> Event SubCategory </label> <br/>
                  <Select
                    style={{ width: 320 }}
                    onChange={ (value ) => setSubcategory(value)}
                    options={ eventsubcategories.length > 0 ? eventsubcategories.map( item => {
                      return { value: item.id,label: item.name }
                    }) : [] }
                  /> 
              </div>
            </div>
            
            <div className="col-md-4">
             <div className="form-group mb-4">
                <label htmlFor="event_venue" className='form-label'> Event Venue </label> <br/>
                <Select
                    style={{ width: 320 }}
                    onChange={ (value ) => setVenue(value)}
                    options={ venues.length > 0 ? venues.map( item => {
                      return { value: item.id,label: item.name }
                    }) : [] }
                  /> 
              </div> 
            </div>
      </div>
      
        <div className="form-group mb-4">
          <label htmlFor="description" className='form-label'> About Your Event </label>
          <textarea name="description" id="description" className="form-control mb-4" onChange={(e) => setDescription(e.target.value)}> 
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
  
        <div className='row'>
          <div className="col">
            <div className='form-group mb-4'>
              <label htmlFor='' className='form-label'> Start Date </label>
              <DatePicker className="form-control" onChange={ (date, dateString) => { setStartdate( dateString)  } }/>
            </div>
          </div>

          <div className="col">
            <div className='form-group mb-4'>
              <label htmlFor='' className='form-label'> End Date </label>
              <DatePicker className="form-control" onChange={ (date, dateString) => { setEnddate( dateString)  } }/>
            </div>
          </div>

          <div className="col">
            <div className='form-group mb-4'>
              <label htmlFor='' className='form-label'> Start Time </label>
              <TimePicker className="form-control" mode='time' onChange={ (time, timeString) => { setStarttime( timeString)  } }/>
            </div>
          </div>

          <div className="col">
            <div className='form-group mb-4'>
              <label htmlFor='' className='form-label'> End Time </label>
              <TimePicker className="form-control" mode='time' onChange={ (time, timeString) => { setEndtime( timeString)  } }/>
            </div>
          </div>
        </div>

        <div className='form-group mb-4'>
          <label htmlFor="" className='form-label'> IS THIS RESERVED SEATING? WHERE CUSTOMERS PICK THEIR OWN SEATS. </label>
          <Radio.Group onChange={ (e) => setReserve(e.target.value)} className='form-control'>
            <Radio value={1}>Yes</Radio>
            <Radio value={0}>No</Radio>
          </Radio.Group>
        </div>

        {
          reserve == 0 ? ( 
            <>
          <h2> Tickets </h2>
          <CustomTicketRepeatField 
            fields={tickets} 
            setFields={setTickets} 
            handleTicketeChange={handleTicketeChange} 
            handleTicketAddField={handleTicketAddField} 
            handleTicketRemoveField={handleTicketRemoveField} 
          />
        </>

          ) : '' }
        {
          reserve == 1 ? (
            <>
              <h2> Venue </h2>
              <CustomVenueRepeatField fields={venuecategory} setFields={setVenuecategory}/>
            </>
          ) : ''
        }

      {
        chartkey !== null ? (
        <div className="form-group" style={{ 'height': '500px' }}> 
          <SeatsioDesigner
            secretKey={process.env.Seatio_Secret}
            chartKey={chartkey}
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
        </div>
        ) : ''
      }
 
      <br/>

        {  chartkey !== null ? (
          <div className="form-group">
            <button className="btn btn-primary" onClick={handleCreateEvent}> Create Event </button>
          </div>
        ) : (
          <>
            <div className="form-group">
              <button className="btn btn-primary"> Submit </button>
            </div>
          </>
        ) }
      </form>

      </DashboardLayout>
    </Layout>
  )
}

export default protectRoute(EventCreate)