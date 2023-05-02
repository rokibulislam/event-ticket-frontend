import Layout from '@/components/layout';
import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout';
import { getEvents, deleteEvent } from '@/store/slices/event';
import { Table, Space } from 'antd'
import { protectRoute } from '@/components/protectRoute';

const Events = () => {

  const dispatch = useDispatch();

  const events =  useSelector( state => state.event.items );
  const status =  useSelector( state => state.event.status );
  const error  =  useSelector( state => state.event.error );

  useEffect( () => {
    dispatch(getEvents())
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
      title: 'Action',
      key: 'action',
      render: (_, item) => (
        <Space size="middle">
          <Link href={`/dashboard/events/${item.id}/edit`}> Edit </Link> 
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
        <Link href="/dashboard/events/customcreate" className="btn btn-primary"> Custom Create Events </Link>
        <Table columns={columns} dataSource={events}/>
        {/* <table className='table'>
          <thead>
            <tr>
              <th> Event Name </th>
              <th> Action </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
        { events.length > 0 ? (
            <>
              {events.map((item, i) => {
                return (
                  <tr key={item.id}>
                    <td>
                      {item.name}
                    </td>
                    <td> <Link href={`/dashboard/events/${item.id}/edit`}> Edit </Link> | 
                    <button onClick={ (e) => handleRemove(e,item.id)} className='btn btn-danger'> Delete </button> </td>
                  </tr>
                );
              })}
            </>
        ) : '' }
        </tbody>
        </table> */}
      </DashboardLayout>
    </Layout>
  )
}

export default protectRoute(Events)