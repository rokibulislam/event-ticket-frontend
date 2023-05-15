import Layout from '@/components/layout'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import DashboardLayout from '@/components/DashboardLayout';
import { getEvent, updateEvent } from '@/store/slices/event';
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
import { select } from 'antd'

import CustomTickethook from '@/components/TicketField/customTickethook';
import CustomVenuehook from '@/components/VenueRepeatField/customVenuehook';


import { eventvalidationSchema } from '@/validation/event';
import CustomSelect from '@/components/Form/select';
import CustomDatepicker from '@/components/Form/datepicker';
import CustomTimepicker from '@/components/Form/timepicker';
import CustomRadio from '@/components/Form/radio';
import CustomInput from '@/components/Form/input';

const EditEvents = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch();

  const events =  useSelector( state => state.event.items );
  const eventtypes =  useSelector( state => state.eventtype.items );
  const eventcategories =  useSelector( state => state.eventcategory.items );
  const eventsubcategories =  useSelector( state => state.eventsubcategory.items );
  const venues =  useSelector( state => state.venue.items );
  // const chartkey =  useSelector( state => state.event.chartkey );

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState({});
  const [subcategory, setSubcategory] = useState({});
  const [venue, setVenue] = useState({});
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('')
  const [reserve, setReserve ] = useState(0)
  const [tickets, setTickets] = useState([]);
  const [venuecategory, setVenuecategory] = useState([{ name: '', price: '', qty: '', fee: '' }]);
  const [chartkey, setChartkey] = useState('');

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
      dispatch(getSubCategoriesByCategory(category.id))
    }
  }, [category])

  useEffect( () => {
    if( id !== 'undefined' ) {
      let event  = events.find( item => item.id == id );
      setName(event.name)
      setType(event?.type);
      setCategory(event?.category)
      setSubcategory(event?.subcategory)
      setVenue(event?.venue)
      setDescription(event.description)
      setImage(event.image)
      setReserve(event.isReserved)
      setTickets(event?.tickets)
      setChartkey(event.chartkey)
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
              <CustomInput register={register} label="Event Name" name="name" errors={errors}  />
              {/* <div className="form-group">
                <label htmlFor=""> Event Name </label>
                <input {...register('name')} type="text" name="name" id="" className="form-control mb-4" />
                {errors.name && <span style={{ color: 'red' }}> { errors.name?.message }  </span>}
              </div> */}
            </div>
          </div>

          <div className='row'>
            <div className="col-md-4">

              <CustomSelect 
                Controller={Controller} 
                control={control} 
                label="Event Type"
                name="type"
                options={eventtypes}
                errors={errors}
                value={ { 
                  value: type.id,
                  label: type.name,
                }}
              />
              {/* <div className="form-group">
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
              </div> */}
            </div>

            <div className="col-md-4">
              <CustomSelect 
                Controller={Controller} 
                control={control} 
                label="Event Category"
                name="category"
                options={eventcategories}
                errors={errors}
                value={ { 
                  value: category.id,
                  label: category.name,
                }}
              />
              {/* <div className="form-group">
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
                </div> */}
            </div>
           { event.subcategory != null && (
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
           )}     

          </div>

          <div className='row'>
              <div className="col-md-4">
                <CustomSelect 
                  Controller={Controller} 
                  control={control} 
                  label="Event Venue"
                  name="venue"
                  options={venues}
                  errors={errors}
                  value=""
                />
              </div>

                {/* <div className="form-group">
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
                </div>  */}

                <div className="col-md-4">
                  <div className="form-group">
                      <CustomSelect 
                        Controller={Controller} 
                        control={control} 
                        label="Event Status"
                        name="status"
                        options={[ { id: 0, name: 'Draft', id: 1, name: 'Active',  id: 2, name: 'Archived',  id: 3, name: 'Deleted',  }]}
                        errors={errors}
                        value=""
                      />
                    {/* <label htmlFor=""> Event Status </label> <br/>
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
                    /> */}
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
            <div className="col">
              <CustomDatepicker control={control} label="Start Date" name="startdate" errors={errors} />
              {/* <div className='form-group mb-4'>
                <label htmlFor='' className='form-label'> Start Date </label>
                <Controller
                  control={control}
                  name="startdate"
                  render={({ field }) => (
                    <DatePicker className="form-control" onChange={ (date, dateString) => field.onChange(dateString)} />
                  )}
                />
              </div> */}
            </div>

            <div className="col">
              <CustomDatepicker control={control} label="End Date" name="enddate" errors={errors} />
              {/* <div className='form-group mb-4'>
                <label htmlFor='' className='form-label'> End Date </label>
                <Controller
                  control={control}
                  name="enddate"
                  render={({ field }) => (
                    <DatePicker className="form-control" onChange={ (date, dateString) => field.onChange(dateString)} />
                  )}
                />
              </div> */}
            </div>

            <div className="col">
              <CustomTimepicker control={control} label="Start Time" name="starttime" errors={errors} />
              {/* <div className='form-group mb-4'>
                <label htmlFor='' className='form-label'> Start Time </label>
                <Controller
                  control={control}
                  name="starttime"
                  render={({ field }) => (
                    <DatePicker className="form-control" onChange={ (time, timeString) => field.onChange(dateString)} />
                  )}
                />
              </div> */}
            </div>

            <div className="col">
              <CustomTimepicker control={control} label="End Time" name="endtime" errors={errors} />
              {/* <div className='form-group mb-4'>
                <label htmlFor='' className='form-label'> End Time </label>
                <Controller
                  control={control}
                  name="endtime"
                  render={({ field }) => (
                    <DatePicker className="form-control" onChange={ (time, timeString) => field.onChange(dateString)} />
                  )}
                />
              </div> */}
            </div> 
          </div>

          <div className='form-group mb-4'>
            <CustomRadio control={control} errors={errors} options= {[ { value:1, label: 'Yes' }, { value: 0, label: 'No' }]} label="IS THIS RESERVED SEATING? WHERE CUSTOMERS PICK THEIR OWN SEATS." name="reserve"  />
            {/* <label htmlFor="" className='form-label'> IS THIS RESERVED SEATING? WHERE CUSTOMERS PICK THEIR OWN SEATS. </label>
            <Controller
              control={control}
              name="reserve"
              render={({ field }) => (
                <Radio.Group onChange={ (e) => field.onChange(e.target.value)} className='form-control' value={reserve}>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              )}
            /> */}
            {/* <Radio.Group onChange={ (e) => setReserve(e.target.value)} className='form-control'>
              <Radio value={1}>Yes</Radio>
              <Radio value={0}>No</Radio>
            </Radio.Group> */}
          </div>

          {/* <CustomTickethook Controller={Controller} name="tickets" control={control} register={register} setValue={setValue} watch={watch} errors={errors} 
          values={tickets} /> */}

      { reserve === 0 && ( <CustomTickethook Controller={Controller} name="tickets" control={control} register={register} setValue={setValue} watch={watch} errors={errors} /> ) }
      { reserve === 1 && ( <CustomVenuehook Controller={Controller} name="venuetickets" control={control} register={register} setValue={setValue} watch={watch} errors={errors} /> )}
  


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
          } */}
          { chartkey }
          { chartkey !== '' && (
            <div className="form-group" style={{ 'height': '500px' }}> 
              <SeatsioDesigner
                secretKey={process.env.Seatio_Secret}
                chartKey={chartkey}
                region="NA"
                onChartCreated={chart => {
                  console.log('created chart', chart)
                }}
                onChartUpdated={chart =>{
                  // setChart(chart);
                  console.log('updated chart', chart)
                }}
              />
            </div>
          )} 

          <div className="form-group">
              <button className="btn btn-primary"> Submit </button>
          </div>

        </form>

      </DashboardLayout>
    </Layout>
  )
}

export default protectRoute(EditEvents)