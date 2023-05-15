import DashboardLayout from '@/components/DashboardLayout'
import EventTimeList from '@/components/EventTimeList'
import Layout from '@/components/layout'
import { Table } from 'antd'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SeatsioEventManager } from '@seatsio/seatsio-react';
import { useRouter } from 'next/router'


const EventTimes = () => {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useDispatch();

    const [details, setDetails] = useState('')
    const [mode, setMode] = useState('manageCategories')

    //redux store
    const events =  useSelector( state => state.event.items );

    useEffect( () => {
        if( id !== 'undefined' ) {
          let event  = events.find( item => item.id == id );
          setDetails(event.event_details)
        }
      },[dispatch, id])
    
      const columns = [
        {
          title: 'Startdate',
          dataIndex: 'startdate',
          key: 'startdate',
        },
        {
          title: 'Starttime',
          dataIndex: 'starttime',
          key: 'starttime'
        },
      ];

    return (
        <Layout>
            <DashboardLayout>
                <h2> EventTimes </h2>
                <EventTimeList />
                { details?.startdate }
                { details?.starttime }
                { details?.enddate }
                { details?.endtime } 
            </DashboardLayout>
        </Layout>
    )
}

export default EventTimes