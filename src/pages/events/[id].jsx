import Layout from '@/components/layout'
import { getEvent } from '@/store/slices/event'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const EventDetails = () => {
  
  let dispatch = useDispatch();
  
  let router = useRouter();
  const { id } = router.query
  
  const event =  useSelector( state => state.event.item );

  useEffect( () => {
    dispatch(getEvent(id));
  }, [dispatch])

  return (
    <Layout>
      <div>
        <h2> EventDetails { event.id} {event.name} </h2>
      </div>
    </Layout>
  )
}

export default EventDetails