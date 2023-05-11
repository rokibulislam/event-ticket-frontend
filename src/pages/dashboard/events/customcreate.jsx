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
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { protectRoute } from '@/components/protectRoute';
import { DatePicker, TimePicker, Radio, Upload, Button, Select } from 'antd';
import CustomTicketRepeatField from '@/components/TicketField/custom';
import CustomVenueRepeatField from '@/components/VenueRepeatField/custom';
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, date, InferType, mixed, array } from 'yup'; 
import { select } from 'antd'
import { getTicketTypes } from '@/store/slices/tickettype';
import CustomTickethook from '@/components/TicketField/customTickethook';
import { CloseOutlined, PlusCircleOutlined } from '@ant-design/icons';
import VenueModal , { ModalApp } from '@/components/venue/modal';
import CustomnestedVenueRepeatField from '@/components/VenueRepeatField/customnested';
import CustomVenuehook from '@/components/VenueRepeatField/customVenuehook';

import CustomSelect from '@/components/Form/select';
import CustomInput from '@/components/Form/input';
import CustomDatepicker from '@/components/Form/datepicker';
import CustomTimepicker from '@/components/Form/timepicker';
import CustomUploader from '@/components/Form/uploader';


let validationSchema = object({
  name: string().required('name is required').label("name"),
  tickets: array().of(
    object().shape({
      ticketName: string().required('Ticket Name is required'),
    })
  ),
  type: number().required("type is required").label("type"),
  category: number().required("category is requried").label("category"),
  venue: number().required("venue is required").label("venue"),
  // description: string().required("description is required").label('description'),
  // image: mixed().required("Image Required").label('image'),
  startdate: mixed().required("Start Date Required").label('startdate'),
  enddate: mixed().required("Start Date Required").label('enddate'),
  // starttime: mixed().required("Start Date Required").label('starttime'),
  // endtime: mixed().required("Start Date Required").label('endtime'),
  
});


const EventCreate = () => {
  let dispatch = useDispatch();
  let router = useRouter();

  // redux store
  const eventtypes =  useSelector( state => state.eventtype.items );
  const eventcategories =  useSelector( state => state.eventcategory.items );
  const eventsubcategories =  useSelector( state => state.eventcategory.subcategory );
  const venues =  useSelector( state => state.venue.items );
  const tickettypes =  useSelector( state => state.tickettype.items );
  const chartkey =  useSelector( state => state.event.chartkey );

  // react hook form
  const { control, setValue, register, handleSubmit, watch, trigger, formState: { errors, isValid } } = useForm({
    defaultValues: {
      reserve: 0,
      tickets: { ticketName: '', ticketPrice: '', ticketQty: '', showSettings: false, settings: {
        canbepurchase: 0,
        description: '',
        minimumticketperorder: 0,
        maximumticketperorder: 0,
        serviceFee: 0,
      }  },
      venuetickets: { 
        name: '',
        price: '',
        fee: '',
        showSubPrice: false,
        subprices: [
          { name: '', price: '', fee: '' }
        ]
      }
      // people: [{ firstName: '', lastName: '' }],
    },
    resolver: yupResolver(validationSchema)
  });
  
  const { fields, append, remove } = useFieldArray({ control, name: 'tickets' });

  //watch
  const category = watch('category');
  const reserve = watch('reserve');


  // use state
  // const [tickets, setTickets] = useState([{ ticket_type: '', ticket_name: '', ticket_price: '', ticket_qty: ''  }]);
  const [venuecategory, setVenuecategory] = useState([{ name: '', price: '', qty: '', fee: '' }]);
  const [venuenestedcategory, setNestedvenuecategory] = useState([
    { 
      name: '',
      price: '',
      fee: '',
      showSubPrice: false,
      subprices: [
        { name: '', price: '', fee: '' }
      ]
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(errors);
  
  useEffect( () => {
    dispatch(getEventCategories());
    dispatch(getEventTypes());
    dispatch(getVenues());
    dispatch(getTicketTypes())
  }, [dispatch])

  useEffect( () => {
    if( category !== undefined ) {
      console.log('subcategory fetching', category);
      dispatch(getSubCategoriesByCategory(category))
    }
  }, [category])

  const onSubmit = data => {
    console.log(data);
    // dispatch(createEvent({
    //   name: data.name,
    //   description: data.event_description,
    //   type_id: data.event_type,
    //   category_id: data.event_category,
    //   venue_id: data.event_venue
    // }));

    // router.push('/dashboard/events')
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('image', data.image?.originFileObj)
    formData.append('type_id', data.type)
    formData.append('category_id', data.category)
    if( data.subcategory != undefined) {
      formData.append('subcategory_id', data.subcategory)
    }
    formData.append('venue_id', data.venue)
    formData.append('startdate', data.startdate)
    formData.append('enddate', data.enddate)
    formData.append('starttime', data.starttime)
    formData.append('endtime', data.endtime)
    formData.append('tickets', JSON.stringify(data.tickets))
    // formData.append('venuecategory', JSON.stringify(venuecategory) )
    formData.append('venuecategory', JSON.stringify(data.venuenestedcategory) )
    formData.append('reserve', data.reserve)

    dispatch(createEvent(formData));
  
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

      <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
        
        <div className='row'>
          <div className="col-md-6">
            {/* <CustomInput register={register} label="Event Name" name="name" errors={errors}  /> */}
            <div className="form-group mb-4">
              <label htmlFor="name" className='form-label'> Event Name </label>
              <input {...register('name')} type="text" id="name" className="form-control" />
              {errors.name && <span style={{ color: 'red' }}> { errors.name?.message }  </span>}
            </div>
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
              value=""
            />
            {/* <div className="form-group mb-4">
              <label htmlFor="type" className='form-label'> Event Type </label> <br/>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select
                    style={{ width: 220 }}
                    onChange={ (value ) => field.onChange(value) }
                    options={
                      eventtypes.map( ( item, i ) =>{
                        return { value: item.id, label: item.name }
                      })}
                  />
                )}
              />
              {errors.type && <span style={{ color: 'red' }}> { errors.type?.message }  </span>}
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
              value=""
            />
            {/* <div className="form-group mb-4">
              <label htmlFor="category" className='form-label'> Event Category </label> <br/>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select
                    style={{ width: 220 }}
                    onChange={ (value ) => field.onChange(value) }
                    options={
                      eventcategories.length > 0 && ( eventcategories.map( ( item, i ) =>{
                        return { value: item.id, label: item.name }
                      })) } 
                  />
                )}
              />
              {errors.category && <span style={{ color: 'red' }}> { errors.category?.message }  </span>}
            </div> */}
          </div>

          {/* { category !== undefined && (
            <div className="col-md-4">
            <div className="form-group mb-4"> 
                <label htmlFor="subcategory" className='form-label'> Event SubCategory </label> <br/>
                <Controller
                control={control}
                name="subcategory"
                render={({ field }) => (
                  <Select
                    style={{ width: 220 }}
                    onChange={ (value ) => field.onChange(value) }
                    options={
                      eventsubcategories.length > 0 && ( eventsubcategories.map( ( item, i ) =>{
                        return { value: item.id, label: item.name }
                      })) }
                  />
                )}
              />
            </div>
          </div>

          )} */}

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
              {/* <div className="form-group mb-4">
                <label htmlFor="venue" className='form-label'> Event Venue </label> <br/>
                <Controller
                  control={control}
                  name="venue"
                  render={({ field }) => (
                    <Select
                      style={{ width: 220 }}
                      onChange={ (value ) => field.onChange(value) }
                      options={
                        venues.map( ( item, i ) =>{
                          return { value: item.id, label: item.name }
                        })}
                    />
                  )}
                />
                {errors.venue && <span style={{ color: 'red' }}> { errors.venue?.message }  </span>}
              </div>  */}
            </div>

            <div className="col-md-4">
                  <button className='btn' onClick={ (e) => { e.preventDefault();
                    setIsModalOpen(true);
                  }}> <PlusCircleOutlined /> New Venue </button>
                  <VenueModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            </div>
        </div>
      
        <div className="form-group mb-4">
          <label htmlFor="description" className='form-label'> About Your Event </label>
          <textarea {...register('description')} id="description" className="form-control"> </textarea>
          {errors.description && <span style={{ color: 'red' }}> { errors.description?.message }  </span>}
        </div>
          
        <CustomUploader control={control} label="Event Image" name="image" errors={errors} />
        
        {/* <div className="form-group mb-5" style={{ 'height': "150px"}}>
              <Controller
                control={control}
                name="image"
                render={({ field }) => (
                <Upload.Dragger 
                  multiple={false}
                  onChange= { info =>field.onChange(info.file) }
                >
                    Drag files here OR <br/>
                    <Button> Click Upload </Button>
                </Upload.Dragger>
                )}
              />
            {errors.image && <span style={{ color: 'red' }}> { errors.image?.message }  </span>}
        </div> */}

        <div className='row'>
          <div className="col">
            <CustomDatepicker control={control} label="Start Date" name="startdate" errors={errors} />
            {/* <div className='form-group mb-4'>
              <label htmlFor='startdate' className='form-label'> Start Date </label>
              <Controller
                control={control}
                name="startdate"
                render={({ field }) => (
                  <DatePicker className="form-control" onChange={ (date, dateString) => field.onChange(dateString)} />
                )}
              />
              {errors.startdate && <span style={{ color: 'red' }}> { errors.startdate?.message }  </span>}
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
              {errors.enddate && <span style={{ color: 'red' }}> { errors.enddate?.message }  </span>}
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
                  <TimePicker className="form-control" mode='time' onChange={ (time, timeString) => field.onChange(timeString)} />
                )}
              />
              {errors.starttime && <span style={{ color: 'red' }}> { errors.starttime?.message }  </span>}
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
                  <TimePicker className="form-control" mode='time' onChange={ (time, timeString) => field.onChange(timeString)} />
                )}
              />
              {errors.endtime && <span style={{ color: 'red' }}> { errors.endtime?.message }  </span>}
            </div> */}
          </div>
        </div>
        
        <div className='form-group mb-4'>
          <label htmlFor="" className='form-label'> IS THIS RESERVED SEATING? WHERE CUSTOMERS PICK THEIR OWN SEATS. </label>
          <Controller
            control={control}
            name="reserve"
            render={({ field }) => (
              <Radio.Group onChange={ (e) => field.onChange(e.target.value)} className='form-control'>
                <Radio value={1}>Yes</Radio>
                <Radio value={0}>No</Radio>
              </Radio.Group>
            )}
          />
        </div>

      {/* <CustomnestedVenueRepeatField fields={venuenestedcategory} setFields={setNestedvenuecategory} /> */}
      
      <CustomTickethook Controller={Controller} name="tickets" control={control} register={register} setValue={setValue} watch={watch} errors={errors} />

      <CustomVenuehook Controller={Controller} name="venuetickets" control={control} register={register} setValue={setValue} watch={watch} />
  
    {/*
        {
          reserve == 0 ? ( 
            <>
          <h2> Tickets </h2>
          <CustomTicketRepeatField 
            fields={tickets} 
            setFields={setTickets} 
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
              console.log('updated chart', chart)
            }}
          />
        </div>
        ) : ''}
 
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
        ) } */}

          <div className="form-group">
            <button className="btn btn-create"> Submit </button>
          </div>
      </form>

      </DashboardLayout>
    </Layout>
  )
}

export default protectRoute(EventCreate)