import DashboardLayout from '@/components/DashboardLayout'
import OrdersList from '@/components/OrdersList'
import Layout from '@/components/layout'
import { Table } from 'antd'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const EventOrders = () => {
  const dispatch = useDispatch();

  useEffect(() => {

  })

  return (
    <Layout>
      <DashboardLayout>
        <h2> EventOrders </h2>
        <OrdersList/>
      </DashboardLayout> 
    </Layout>
  )
}

export default EventOrders