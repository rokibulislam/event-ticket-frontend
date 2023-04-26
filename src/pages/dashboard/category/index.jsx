import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { getEventCategories, deleteEventCategory } from '@/store/slices/eventcategory'
import { Table, Space } from 'antd';

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
            <Link href={`/dashboard/category/${item.id}/edit`}> Edit </Link> 
            <button onClick={ (e) => handleRemove(e,item.id)} className='btn btn-danger'> Delete </button>
          </Space>
        ),
      },
    ];


  return (
    <Layout>
        <DashboardLayout>
        <h2> Category List  </h2> 
        <Link href="/dashboard/category/create" className='btn btn-primary'> Create Category </Link>
        <Table columns={columns} dataSource={eventcategories}/>

        {/* <table className='table'>
          <thead>
            <tr>
              <th> Category Name </th>
              <th> Action </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
        { eventcategories.length > 0 ? (
            <>
              {eventcategories.map((item, i) => {
                return (
                  <tr key={item.id}>
                    <td>
                      {item.name}
                    </td>
                    <td> <Link href={`/dashboard/category/${item.id}/edit`}> Edit </Link> | 
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

export default Category