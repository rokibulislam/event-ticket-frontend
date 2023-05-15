import DashboardLayout from '@/components/DashboardLayout'
import EventTimeList from '@/components/EventTimeList'
import Layout from '@/components/layout'
import { Table } from 'antd'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SeatsioEventManager } from '@seatsio/seatsio-react';
import { useRouter } from 'next/router'


const EventManager = () => {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [mode, setMode] = useState('manageCategories')

    //redux store
    const events =  useSelector( state => state.event.items );

    useEffect( () => {
        if( id !== 'undefined' ) {
          let event  = events.find( item => item.id == id );
          setName(event.name)
        }
      },[dispatch, id])

    return (
        <Layout>
            <DashboardLayout>
                <h2> EventManager </h2>
                <select name='mode' onChange={ (e) => setMode(e.target.value) }>
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
                </div>
            </DashboardLayout>
        </Layout>
    )
}

export default EventManager