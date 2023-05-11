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
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        }
    ];

    return (
        <Layout>
            <DashboardLayout>
                <h2> EventTimes </h2>
                <EventTimeList />
                { details.startdate }
                { details.starttime }
                { details.enddate }
                { details.endtime }
                { details.startdate }
                {/* <select name='mode' onChange={ (e) => setMode(e.target.value) }>
                    <option value="manageCategories"> Manage Category </option>
                    <option value="manageTableBooking"> Manage Table Booking </option>
                    <option value="manageForSaleConfig"> Manage For Sale </option>
                </select>

                <div style={{ 'height': '500px' }}>
                      <SeatsioEventManager
                        secretKey={process.env.Seatio_Secret}
                        event={name}
                        mode={mode}
                        region="NA"
                      />
                </div> */}
            </DashboardLayout>
        </Layout>
    )
}

export default EventTimes