import Layout from '@/components/layout'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import DashboardLayout from '@/components/DashboardLayout';
import { getEvent, updateEvent } from '@/store/slices/event';
import { getEventCategories } from '@/store/slices/eventcategory'
import { getEventTypes } from '@/store/slices/eventtype'
import { getVenues } from '@/store/slices/venue';
import { useForm } from "react-hook-form";
import { protectRoute } from '@/components/protectRoute';
import { DatePicker, TimePicker, Radio, Upload, Button, Select } from 'antd';
import { SeatsioSeatingChart, SeatsioEventManager, SeatsioChartManager, SeatsioDesigner } from '@seatsio/seatsio-react';
import CustomTicketRepeatField from '@/components/TicketField/custom';
import CustomVenueRepeatField from '@/components/VenueRepeatField/custom';

const EditEvents = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch();

  const event =  useSelector( state => state.event.item );

  const eventtypes =  useSelector( state => state.eventtype.items );
  const eventcategories =  useSelector( state => state.eventcategory.items );
  const venues =  useSelector( state => state.venue.items );
  const chartkey =  useSelector( state => state.event.chartkey );
  
  const [reserve, setReserve ] = useState(null)
  const [tickets, setTickets] = useState([{ ticket_type: '', ticket_name: '', ticket_price: '', ticket_qty: ''  }]);
  const [venuecategory, setVenuecategory] = useState([{ name: '', price: '', qty: '', fee: '' }]);

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
    console.log('handle update event');
  }

  return (
    <Layout>
      <DashboardLayout>
        <h2> Edit Events </h2> 
        <form action='' method='post' onSubmit={handleSubmit}>
        
          <div className='row'>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor=""> Event Name </label>
                <input type="text" name="name" id="" className="form-control mb-4" value={event.name} onChange={handleChange}  />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor=""> Event Type </label>
                <select className="form-control mb-4" name="type" id="" onChange={handleChange} >
                  {
                    eventtypes.length > 0  ? (
                      eventtypes.map( ( item, i ) =>{
                        return (
                          <option key={item.id} value={item.id} >
                            { item.name }
                          </option>
                        )
                      })
                    ) : ''
                  }
                </select>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                  <label htmlFor=""> Event Category </label>
                  <select className="form-control mb-4" name="category" id="" onChange={handleChange} >
                  {
                      eventcategories.length > 0  ? (
                        eventcategories.map( ( item, i ) =>{
                          return (
                            <option key={item.id} value={item.id}>
                              { item.name }
                            </option>
                          )
                        })
                      ) : ''
                    }
                  </select>
                </div>
            </div>

            <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor=""> Event Venue </label>
                  <select className="form-control mb-4" name="venue" id="" onChange={handleChange} >
                    { 
                      venues.length > 0  ? (
                        venues.map( ( item, i ) =>{
                          return (
                            <option key={item.id} value={item.id}>
                              { item.name }
                            </option>
                          )
                        })
                      ) : ''
                    }
                  </select>
                </div> 
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description"> About Your Event </label>
            <textarea name="description" id="description" value={event.description} className="form-control mb-4" onChange={handleChange}>  </textarea>
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
                secretKey="6e51c7b0-a9ce-4425-9822-831137892ab5"
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
          ) : ''}

          <div className="form-group">
              <button className="btn btn-primary"> Submit </button>
          </div>

        </form>

      </DashboardLayout>
    </Layout>
  )
}

export default protectRoute(EditEvents)