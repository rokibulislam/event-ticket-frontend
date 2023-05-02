import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { getEventTypes, deleteEventType } from '@/store/slices/eventtype'
import { Table, Space } from 'antd';
import { protectRoute } from '@/components/protectRoute';

const Types = () => {

    const dispatch = useDispatch();

    const types  =  useSelector( state => state.eventtype.items );
    const status =  useSelector( state => state.eventtype.status );
    const error  =  useSelector( state => state.eventtype.error );
  
    useEffect( () => {
      dispatch(getEventTypes())
    },[dispatch])

    const handleRemove = (e, id) => {
      e.preventDefault();
      dispatch( deleteEventType(id) );
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
            <Link href={`/dashboard/types/${item.id}/edit`}> Edit </Link> 
            <Link href={`/dashboard/types/${item.id}/customedit`}> Custom Edit </Link> 
            <button onClick={ (e) => handleRemove(e,item.id)} className='btn btn-danger'> Delete </button>
          </Space>
        ),
      },
    ];

  return (
    <Layout>
        <DashboardLayout>
        <h2> Type List  </h2> 
        <Link href="/dashboard/types/create" className='btn btn-primary'> Create Type </Link>
        <Link href="/dashboard/types/customcreate" className='btn btn-primary'> Create Custom Type </Link>
        <Table columns={columns} dataSource={types}/>
        {/* <table className='table'>
          <thead>
            <tr>
              <th> Type Name </th>
              <th> Action </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
        { types.length > 0 ? (
            <>
              {types.map((item, i) => {
                return (
                  <tr key={item.id}>
                    <td>
                      {item.name}
                    </td>
                    <td> <Link href={`/dashboard/types/${item.id}/edit`}> Edit </Link> | 
                    <button onClick={ (e) => handleRemove(e,item.id)} className='btn btn-danger'> Delete </button>  </td>
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

export default protectRoute(Types)