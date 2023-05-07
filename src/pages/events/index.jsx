import Layout from '@/components/layout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { getEvents } from '../../store/slices/event'

import EventsList from '@/components/EventsList'

const Events = () => {
  const dispatch = useDispatch();
  // const events =  useSelector( state => state.event.items );
  // const status =  useSelector( state => state.event.status );
  // const error =  useSelector( state => state.event.error );

  useEffect( () => {
    dispatch(getEvents())
  },[dispatch])


  return (
    <Layout>
      <div>
        <h2> Events </h2>
        <EventsList />
      </div>
    </Layout>
  )
}

export default Events