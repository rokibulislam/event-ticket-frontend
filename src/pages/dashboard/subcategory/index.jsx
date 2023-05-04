import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { Table, Space } from 'antd';
import { getSubEventCategories, deleteSubEventCategory } from '@/store/slices/eventsubcategory';
import { protectRoute } from '@/components/protectRoute';

const SubCategory = () => {
  const dispatch = useDispatch();
  const eventsubcategories =  useSelector( state => state.eventsubcategory.items );
  const status =  useSelector( state => state.eventsubcategory.status );
  const error  =  useSelector( state => state.eventsubcategory.error );

  useEffect( () => {
    dispatch(getSubEventCategories())
  },[dispatch])

  const handleRemove = (e, id) => {
    e.preventDefault();
    dispatch( deleteSubEventCategory(id) );
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category.name',
      key: 'category.name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, item) => (
        <Space size="middle">
          <Link href={`/dashboard/subcategory/${item.id}/edit`}> Edit </Link> 
          {/* <Link href={`/dashboard/subcategory/${item.id}/customedit`}> Custom Edit </Link>  */}
          <button onClick={ (e) => handleRemove(e,item.id)} className='btn btn-danger'> Delete </button>
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <DashboardLayout>
        <h2> SubCategory List </h2>
        <Link href="/dashboard/subcategory/create" className='btn btn-primary'> Create SubCategory </Link>
        {/* <Link href="/dashboard/subcategory/customcreate" className='btn btn-primary'> Custom Create SubCategory </Link> */}
        <Table columns={columns} dataSource={eventsubcategories}/>
      </DashboardLayout>
    </Layout>
  )
}

export default protectRoute(SubCategory)