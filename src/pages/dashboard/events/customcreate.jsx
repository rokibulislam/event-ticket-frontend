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
import CustomRadio from '@/components/Form/radio';

import { eventvalidationSchema } from '@/validation/event';

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
    resolver: yupResolver(eventvalidationSchema)
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
            <Select
              defaultValue={{
                value: 32,
                label: 'Auto, Boat & Air',
              }} 
              // value={category}
              style={{ width: 220 }}
              onChange={ (value ) => field.onChange(value) }
              options={
                eventcategories.map( ( item, i ) =>{
                  return { value: item.id, label: item.name }
                })}
            />
                 {/* defaultValue={{
                value: 32,
                label: 'Auto, Boat & Air',
              }} */}

          </div>

          { category !== undefined && (
            <div className="col-md-4">
                <CustomSelect 
                  Controller={Controller} 
                  control={control} 
                  label="Event SubCategory"
                  name="subcategory"
                  options={eventsubcategories}
                  errors={errors}
                  value=""
                />
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
        
        <div className='row'>
          <div className="col">
            <CustomDatepicker control={control} label="Start Date" name="startdate" errors={errors} />
          </div>

          <div className="col">
            <CustomDatepicker control={control} label="End Date" name="enddate" errors={errors} />
          </div>

          <div className="col">
            <CustomTimepicker control={control} label="Start Time" name="starttime" errors={errors} />
          </div>

          <div className="col">
            <CustomTimepicker control={control} label="End Time" name="endtime" errors={errors} />
          </div>
        </div>
        
        <div className='form-group mb-4'>
          <CustomRadio control={control} errors={errors} options= {[ { value:1, label: 'Yes' }, { value: 0, label: 'No' }]} label="IS THIS RESERVED SEATING? WHERE CUSTOMERS PICK THEIR OWN SEATS." name="reserve"  />
          {/* <label htmlFor="" className='form-label'> IS THIS RESERVED SEATING? WHERE CUSTOMERS PICK THEIR OWN SEATS. </label>
          <Controller
            control={control}
            name="reserve"
            render={({ field }) => (
              <Radio.Group onChange={ (e) => field.onChange(e.target.value)} className='form-control'>
                <Radio value={1}>Yes</Radio>
                <Radio value={0}>No</Radio>
              </Radio.Group>
            )}
          /> */}
        </div>

      {/* <CustomnestedVenueRepeatField fields={venuenestedcategory} setFields={setNestedvenuecategory} /> */}  
      { reserve === 0 && ( <CustomTickethook Controller={Controller} name="tickets" control={control} register={register} setValue={setValue} watch={watch} errors={errors} /> ) }
      { reserve === 1 && ( <CustomVenuehook Controller={Controller} name="venuetickets" control={control} register={register} setValue={setValue} watch={watch} errors={errors} /> )}
  
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