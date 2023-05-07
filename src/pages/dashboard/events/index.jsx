import Layout from '@/components/layout';
import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout';
import { getEvents, deleteEvent, getEventsbyuser } from '@/store/slices/event';
import { Table, Space } from 'antd'
import { protectRoute } from '@/components/protectRoute';
import { object } from 'yup';

const Events = () => {

  const dispatch = useDispatch();

  const events =  useSelector( state => state.event.items );
  const status =  useSelector( state => state.event.status );
  const error  =  useSelector( state => state.event.error );

  useEffect( () => {
    // dispatch(getEvents())
    dispatch(getEventsbyuser())
  },[dispatch])

  const handleCreate = (e) => {
    e.preventDefault();
  }

  const handleRemove = (e, id) => {
    e.preventDefault();
    dispatch(deleteEvent(id));
  }

  const handleUpdate = (e) => {
    e.preventDefault();
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (item) => item.name
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (item) => item.name
    },
    {
      title: 'Venue',
      dataIndex: 'venue',
      key: 'venue',
      render: (item) => item
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, item) => (
        <Space size="middle">
          <Link href={`/dashboard/events/${item.id}/edit`}> Edit </Link> 
          <Link href={`/dashboard/events/${item.id}/times`}> Event Times </Link> 
          <Link href={`/dashboard/events/${item.id}/orders`}> Event Orders </Link> 
          <Link href={`/dashboard/events/${item.id}/attendae`}> Event Attendae </Link> 
          <Link href={`/dashboard/events/${item.id}/manager`}> Event Manager </Link> 
          {/* <Link href={`/dashboard/events/${item.id}/customedit`}> CustomEdit </Link>  */}
          <button onClick={ (e) => handleRemove(e,item.id)} className='btn btn-danger'> Delete </button>
        </Space>
      ),
    },
  ];

  return (
    <Layout> 
      <DashboardLayout>
        <h2> Events List  </h2> 
        <Link href="/dashboard/events/create" className="btn btn-primary"> Create Events </Link>
        {/* <Link href="/dashboard/events/customcreate" className="btn btn-primary"> Custom Create Events </Link> */}
        <Table columns={columns} dataSource={events}/>
      </DashboardLayout>
    </Layout>
  )
}

export default protectRoute(Events)