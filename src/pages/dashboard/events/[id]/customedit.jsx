import Layout from '@/components/layout'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import DashboardLayout from '@/components/DashboardLayout';
import event, { getEvent, updateEvent } from '@/store/slices/event';
import { getEventCategories, getSubCategoriesByCategory } from '@/store/slices/eventcategory'
import { getEventTypes } from '@/store/slices/eventtype'
import { getVenues } from '@/store/slices/venue';
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { protectRoute } from '@/components/protectRoute';

import { DatePicker, TimePicker, Radio, Upload, Button, Select } from 'antd';
import { SeatsioDesigner } from '@seatsio/seatsio-react';
import CustomTicketRepeatField from '@/components/TicketField/custom';
import CustomVenueRepeatField from '@/components/VenueRepeatField/custom';

import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, date, InferType, mixed } from 'yup'; 
import { select } from 'antd'

import CustomTickethook from '@/components/TicketField/customTickethook';
import { eventvalidationSchema } from '@/validation/event';

const EditEvents = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch();

  const events =  useSelector( state => state.event.items );
  const eventtypes =  useSelector( state => state.eventtype.items );
  const eventcategories =  useSelector( state => state.eventcategory.items );
  const eventsubcategories =  useSelector( state => state.eventsubcategory.items );
  const venues =  useSelector( state => state.venue.items );
  const chartkey =  useSelector( state => state.event.chartkey );

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [venue, setVenue] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('')
  const [reserve, setReserve ] = useState(0)
  const [tickets, setTickets] = useState([]);
  const [venuecategory, setVenuecategory] = useState([{ name: '', price: '', qty: '', fee: '' }]);

  const { control, register, handleSubmit, reset, setValue, watch, formState: { errors, isValid } } = useForm({ resolver: yupResolver(eventvalidationSchema) });

  useEffect( () => {
    // dispatch(getEvent(id))
    dispatch(getEventCategories());
    dispatch(getEventTypes());
    dispatch(getVenues());
  },[dispatch, router])

  useEffect( () => {
    console.log('calling subcategory');
    if( category !== '') {
      console.log('subcategory fetching');
      dispatch(getSubCategoriesByCategory(category))
    }
  }, [category])

  useEffect( () => {
    if( id !== 'undefined' ) {
      let event  = events.find( item => item.id == id );
      setName(event.name)
      setType(event.type?.id);
      setCategory(event.category?.id)
      setSubcategory(event.subcategory?.id)
      setVenue(event.venue?.id)
      setDescription(event.description)
      setImage(event.image)
      setReserve(event.isReserved)
      setTickets(event?.tickets)
    }
  },[dispatch, id])

  useEffect(() => {
      reset({
        name: name,
        type: type,
        category: category,
        venue: venue,
        description: description,
        subcategory: subcategory,
        image: image,
        tickets: tickets
      })
  }, [name, type, category, venue, description, tickets])
  
  const { fields, append, remove } = useFieldArray({ control, name: 'tickets' });

  const onSubmit = (data) => {
    console.log(data);
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
                <input {...register('name')} type="text" name="name" id="" className="form-control mb-4" />
                {errors.name && <span style={{ color: 'red' }}> { errors.name?.message }  </span>}
              </div>
            </div>
          </div>

          <div className='row'>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor=""> Event Type </label> <br/>
                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <Select
                      value={type}
                      style={{ width: 220 }}
                      onChange={ (value ) => field.onChange(value) }
                      options={
                        eventtypes.map( ( item, i ) =>{
                          return { value: item.id, label: item.name }
                        })}
                    />
                  )}
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                  <label htmlFor=""> Event Category </label> <br/>
                  <Controller
                    control={control}
                    name="category"
                    render={({ field }) => (
                      <Select
                        value={category}
                        style={{ width: 220 }}
                        onChange={ (value ) => field.onChange(value) }
                        options={
                          eventcategories.map( ( item, i ) =>{
                            return { value: item.id, label: item.name }
                          })}
                      />
                    )}
                  />
                </div>
            </div>

            <div className="col-md-4">
              <div className="form-group mb-4"> 
                  <label htmlFor="subcategory" className='form-label'> Event SubCategory </label> <br/>
                  <Controller
                    control={control}
                    name="subcategory"
                    value={subcategory}
                    render={({ field }) => (
                      <Select
                        value={type}
                        style={{ width: 220 }}
                        onChange={ (value ) => field.onChange(value) }
                        options={
                          eventsubcategories.map( ( item, i ) =>{
                            return { value: item.id, label: item.name }
                          })}
                      />
                    )}
                  />
              </div>
            </div>
          </div>

          <div className='row'>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor=""> Event Venue </label> <br/>
                  <Controller
                    control={control}
                    name="venue"
                    render={({ field }) => (
                      <Select
                        value={venue}
                        style={{ width: 220 }}
                        onChange={ (value ) => field.onChange(value) }
                        options={
                          venues.map( ( item, i ) =>{
                            return { value: item.id, label: item.name }
                          })}
                      />
                    )}
                  />
                </div> 
              </div>
          </div>

          <div className="form-group mb-5">
            <label htmlFor="description"> About Your Event </label>
            <textarea {...register('description')}  id="description" className="form-control mb-4">  </textarea>
          </div>

          <div className="form-group mb-5" style={{ 'height': "150px"}}>
            <Controller
                control={control}
                name="image"
                render={({ field }) => (
                <Upload.Dragger multiple={false} onChange= { info =>field.onChange(info.file) }>
                  {image ? (
                    <img src={image} alt="avatar" style={{ width: '200px', height: '200px' }} />
                  ) : (
                    <>
                    Drag files here OR <br/>
                    <Button> Click Upload </Button>
                    </>
                  )}

                </Upload.Dragger>
                )}
            />
          </div>


          <div className='row'>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor=""> Event Status </label> <br/>
                  <Controller
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <Select
                        value={venue}
                        style={{ width: 220 }}
                        onChange={ (value ) => field.onChange(value) }
                        options={[ { value: 0, label: 'Draft', value: 1, label: 'Active',  value: 2, label: 'Archived',  value: 3, label: 'Deleted',  }]}
                      />
                    )}
                  />
                </div> 
              </div>
          </div>

          <div className='row'>
            <div className="col">
              <div className='form-group mb-4'>
                <label htmlFor='' className='form-label'> Start Date </label>
                <Controller
                  control={control}
                  name="startdate"
                  render={({ field }) => (
                    <DatePicker className="form-control" onChange={ (date, dateString) => field.onChange(dateString)} />
                  )}
                />
                {/* <DatePicker className="form-control" onChange={ (date, dateString) => { setStartdate( dateString)  } }/> */}
              </div>
            </div>

            <div className="col">
              <div className='form-group mb-4'>
                <label htmlFor='' className='form-label'> End Date </label>
                <Controller
                  control={control}
                  name="enddate"
                  render={({ field }) => (
                    <DatePicker className="form-control" onChange={ (date, dateString) => field.onChange(dateString)} />
                  )}
                />
                {/* <DatePicker className="form-control" onChange={ (date, dateString) => { setEnddate( dateString)  } }/> */}
              </div>
            </div>

            <div className="col">
              <div className='form-group mb-4'>
                <label htmlFor='' className='form-label'> Start Time </label>
                <Controller
                  control={control}
                  name="starttime"
                  render={({ field }) => (
                    <DatePicker className="form-control" onChange={ (time, timeString) => field.onChange(dateString)} />
                  )}
                />
                {/* <TimePicker className="form-control" mode='time' onChange={ (time, timeString) => { setStarttime( timeString)  } }/> */}
              </div>
            </div>

            <div className="col">
              <div className='form-group mb-4'>
                <label htmlFor='' className='form-label'> End Time </label>
                <Controller
                  control={control}
                  name="endtime"
                  render={({ field }) => (
                    <DatePicker className="form-control" onChange={ (time, timeString) => field.onChange(dateString)} />
                  )}
                />
                {/* <TimePicker className="form-control" mode='time' onChange={ (time, timeString) => { setEndtime( timeString)  } }/> */}
              </div>
            </div>
          </div>

          <div className='form-group mb-4'>
            <label htmlFor="" className='form-label'> IS THIS RESERVED SEATING? WHERE CUSTOMERS PICK THEIR OWN SEATS. </label>
            <Controller
              control={control}
              name="reserve"
              render={({ field }) => (
                <Radio.Group onChange={ (e) => field.onChange(e.target.value)} className='form-control' value={reserve}>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              )}
            />
            {/* <Radio.Group onChange={ (e) => setReserve(e.target.value)} className='form-control'>
              <Radio value={1}>Yes</Radio>
              <Radio value={0}>No</Radio>
            </Radio.Group> */}
          </div>

          <CustomTickethook Controller={Controller} name="tickets" control={control} register={register} setValue={setValue} watch={watch} errors={errors} values={tickets} />



          {/* {
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
          ) : ''} */}

          <div className="form-group">
              <button className="btn btn-primary"> Submit </button>
          </div>

        </form>

      </DashboardLayout>
    </Layout>
  )
}

export default protectRoute(EditEvents)