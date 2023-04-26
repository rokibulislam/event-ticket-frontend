import Layout from '@/components/layout'
import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout';
import { getVenues, deleteVenue } from '../../../store/slices/venue'
import { Table, Space } from 'antd';

const Venue = () => {
  const dispatch = useDispatch();

  const venues =  useSelector( state => state.venue.items );
  const status =  useSelector( state => state.venue.status );
  const error  =  useSelector( state => state.venue.error );
  
  useEffect( () => {
    dispatch(getVenues())
  },[dispatch])

  const handleRemove = (e, id) => {
    e.preventDefault();
    dispatch(deleteVenue(id))
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

        <Table columns={columns} dataSource={venues}/>

        {/* <table className='table'>
          <thead>
            <tr>
              <th> Name </th>
              <th> Nick Name </th>
              <th> City </th>
              <th> Action </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
        { venues?.length > 0 ? (
            <>
                          {venues.map((item, i) => {
                return (
                  <tr key={item.id}>
                    <td>
                      {item.name}
                    </td>
                    <td>
                      {item.nickname}
                    </td>
                    <td>
                      {item.city}
                    </td>
                    <td> 
                      <Link href={`/dashboard/venue/${item.id}/edit`}> Edit </Link>  | 
                      <button onClick={ (e) => handleRemove(e,item.id)} className='btn btn-danger'> Delete </button>
                    </td>
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

export default Venue