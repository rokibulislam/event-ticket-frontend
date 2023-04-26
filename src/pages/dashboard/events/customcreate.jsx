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

import { useForm } from "react-hook-form";

const EventCreate = () => {
  let dispatch = useDispatch();
  let router = useRouter();
  const [ chart, setChart ] = useState(null)

  const eventtypes =  useSelector( state => state.eventtype.items );
  const eventcategories =  useSelector( state => state.eventcategory.items );
  const venues =  useSelector( state => state.venue.items );

  const { register, handleSubmit, formState: { errors, isValid } } = useForm();

  useEffect( () => {
    dispatch(getEventCategories());
    dispatch(getEventTypes());
    dispatch(getVenues());
  }, [dispatch])

  const onSubmit = data => {

  }

  return (
    <Layout> 
      <DashboardLayout>
        <h2> Events Create  </h2> 

      <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-4">
          <label htmlFor="event_name" className='form-label'> Event Name </label>
          <input {...register('event_name', { required: true })} type="text" id="" className="form-control" />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="event_type" className='form-label'> Event Type </label>
          <select {...register('event_type', { required: true })}  className="form-control" id="event_type">
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

        <div className="form-group mb-4">
          <label htmlFor="event_category" className='form-label'> Event Category </label>
          <select {...register('event_category', { required: true })} className="form-control" id="event_category">
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

        <div className="form-group mb-4">
          <label htmlFor="event_venue" className='form-label'> Event Venue </label>
          <select {...register('event_category', { required: true })} className="form-control" id="event_venue">
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

        <div className="form-group mb-4">
          <label htmlFor="event_description" className='form-label'> About Your Event </label>
          <textarea {...register('event_description', { required: true })} id="event_description" className="form-control"> </textarea>
        </div>

        <div className="form-group">
          <button disabled={!isValid} className="btn btn-primary"> Submit </button>
        </div>
      </form>

      </DashboardLayout>
    </Layout>
  )
}

export default EventCreate