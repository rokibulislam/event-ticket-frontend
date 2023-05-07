import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { Table } from 'antd'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const EventAttendae = () => {
  const dispatch = useDispatch();

  useEffect(() => {

  })

  return (
    <Layout>
      <DashboardLayout>
        <h2> EventAttendae </h2>
      </DashboardLayout> 
    </Layout>
  )
}

export default EventAttendae