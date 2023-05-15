import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { Table, Space } from 'antd';
import { getSubEventCategories, deleteSubEventCategory } from '@/store/slices/eventsubcategory';
import { protectRoute } from '@/components/protectRoute';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';

const SubCategory = () => {
  const dispatch = useDispatch();
  const eventsubcategories =  useSelector( state => state.eventsubcategory.items );
  const status =  useSelector( state => state.eventsubcategory.status );
  const error  =  useSelector( state => state.eventsubcategory.error );

  useEffect( () => {
    try {
      let resultAction  = dispatch(getSubEventCategories())
      unwrapResult( resultAction );
    } catch (error) {
      console.log(error)
    }
  },[dispatch])

  const handleRemove = (e, id) => {
    e.preventDefault();
    try {
      let resultAction  = dispatch( deleteSubEventCategory(id) );
      unwrapResult( resultAction );
    } catch (error) {
      console.log(error)
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (item) => item?.name
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, item) => (
        <Space size="middle">
          <Link href={`/dashboard/subcategory/${item.id}/edit`}> <EditOutlined /> </Link> 
          <Link href={`/dashboard/subcategory/${item.id}/customedit`}> Custom Edit </Link> 
          <CloseOutlined onClick={ (e) => handleRemove(e,item.id)} className='btn btn-danger' />
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <DashboardLayout>
        <h2> SubCategory List </h2>
        <Link href="/dashboard/subcategory/create" className='btn btn-primary'> Create SubCategory </Link>
        <Link href="/dashboard/subcategory/customcreate" className='btn btn-primary'> Custom Create SubCategory </Link>
        <Table columns={columns} dataSource={eventsubcategories}/>
      </DashboardLayout>
    </Layout>
  )
}

export default protectRoute(SubCategory)