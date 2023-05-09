import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { getEventTypes, deleteEventType } from '@/store/slices/eventtype'
import { Table, Space } from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
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
            <Link href={`/dashboard/types/${item.id}/edit`}> <EditOutlined /> </Link> 
            <Link href={`/dashboard/types/${item.id}/customedit`}> Custom Edit </Link> 
            <CloseOutlined onClick={ (e) => handleRemove(e,item.id)} className='btn btn-danger' />
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
        </DashboardLayout>
    </Layout>
  )
}

export default protectRoute(Types)