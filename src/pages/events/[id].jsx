import Layout from '@/components/layout'
import { getEvent } from '@/store/slices/event'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const EventDetails = () => {
  let dispatch = useDispatch();
  let router = useRouter();
  const { id } = router.query

  useEffect( () => {
    dispatch(getEvent(id));
  }, [dispatch])
  
  const event =  useSelector( state => state.event.item );
  const loading =  useSelector( state => state.event.loading );

  if( loading ) {
    return "Loading";
  }

  console.log(id);

  return (
    <Layout>
      <div>
        <h2> EventDetails { event.id} {event.name} </h2>
      </div>
    </Layout>
  )
}

export default EventDetails