import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { getEventCategories, deleteEventCategory } from '@/store/slices/eventcategory'
import { Table, Space } from 'antd';
import { protectRoute } from '@/components/protectRoute';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';

const Category = () => {

    const dispatch = useDispatch();

    const eventcategories =  useSelector( state => state.eventcategory.items );
    const status =  useSelector( state => state.eventcategory.status );
    const error  =  useSelector( state => state.eventcategory.error );
  
    useEffect( () => {
      dispatch(getEventCategories())
    },[dispatch])

    const handleRemove = (e, id) => {
      e.preventDefault();
      dispatch( deleteEventCategory(id) );
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
            <Link href={`/dashboard/category/${item.id}/edit`}> <EditOutlined /> </Link> 
            {/* <Link href={`/dashboard/category/${item.id}/customedit`}> Custom Edit </Link>  */}
            <CloseOutlined onClick={ (e) => handleRemove(e,item.id)} className='btn btn-danger' />
          </Space>
        ),
      },
    ];


  return (
    <Layout>
        <DashboardLayout>
        <h2> Category List  </h2> 
        <Link href="/dashboard/category/create" className='btn btn-create'> Create Category </Link>
        {/* <Link href="/dashboard/category/customcreate" className='btn btn-primary'> Create Custom Category </Link> */}
        <Table columns={columns} dataSource={eventcategories}/>
        </DashboardLayout>
    </Layout>
  )
}

export default protectRoute(Category)