import Layout from '@/components/layout'
import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout';
import { getVenues, deleteVenue } from '../../../store/slices/venue'
import { Table, Space } from 'antd';
import { protectRoute } from '@/components/protectRoute';
import { unwrapResult } from '@reduxjs/toolkit';

const Venue = () => {
  const dispatch = useDispatch();

  const venues =  useSelector( state => state.venue.items );
  const status =  useSelector( state => state.venue.status );
  const error  =  useSelector( state => state.venue.error );
  
  useEffect( () => {
    try {
      let resultAction = dispatch(getVenues())
      unwrapResult(resultAction)
    } catch (error) {
      console.log(error);
    }
  },[dispatch])

  const handleRemove = (e, id) => {
    e.preventDefault();
    try {
      let resultAction = dispatch(deleteVenue(id))
      unwrapResult(resultAction)
    } catch (error) {
      console.log(error);
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Nickname',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Postcode',
      dataIndex: 'postcode',
      key: 'postcode',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, item) => (
        <Space size="middle">
          <Link href={`/dashboard/venue/${item.id}/edit`}> Edit </Link> 
          {/* { item?.events.length > 0 && ( <Link href={`/dashboard/venue-seatchart/${item.id}`}> Edit Seat </Link>)} */}
          <Link href={`/dashboard/venue/${item.id}/customedit`}> Custom Edit </Link> 
          <button onClick={ (e) => handleRemove(e,item.id)} className='btn btn-danger'> Delete </button>
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <DashboardLayout>
        <h2> Venue List  </h2> 
        <Link href="/dashboard/venue/create" className='btn btn-primary'> Create Venue </Link>
        <Link href="/dashboard/venue/customcreate" className='btn btn-primary'> Custom Create Venue </Link>
        <Table columns={columns} dataSource={venues}/>
      </DashboardLayout>
    </Layout>
  )
}

export default protectRoute(Venue)