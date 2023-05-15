import EventsCard from '@/components/EventsList'
import Layout from '@/components/layout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEvents } from '@/store/slices/event';

const Events = () => {
  const dispatch =  useDispatch()
  const events =  useSelector( state => state.event.items );

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch])
  
  return (
    <Layout>
      <div className='container'>
        <h2> Events </h2>
        <EventsCard />
      </div>
    </Layout>
  )
}

export default Events