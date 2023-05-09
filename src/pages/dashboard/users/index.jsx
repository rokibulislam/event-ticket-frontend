import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { getUsers, deleteUser } from '@/store/slices/user'
import { Table, Space } from 'antd'
import { protectRoute } from '@/components/protectRoute';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';

const Users = () => {

    const dispatch = useDispatch();

    const users =  useSelector( state => state.user.items );
    const status =  useSelector( state => state.user.status );
    const error  =  useSelector( state => state.user.error );
  
    useEffect( () => {
      dispatch(getUsers())
    },[dispatch])

    const handleRemove = (e, id) => {
      e.preventDefault();
      dispatch(deleteUser(id))
    }

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, item) => (
          <Space size="middle">
            <Link href={`/dashboard/users/${item.id}/edit`}> <EditOutlined /> </Link> 
            <Link href={`/dashboard/users/${item.id}/customedit`}> <EditOutlined /> </Link> 
            <CloseOutlined onClick={ (e) => handleRemove(e,item.id)} className='btn btn-danger' />
          </Space>
        ),
      },
    ];

  return (
    <Layout>
        <DashboardLayout>
        <h2> User List  </h2> 
        <Link href="/dashboard/users/create" className='btn btn-create'> Create User </Link>
        <Link href="/dashboard/users/customcreate" className='btn btn-primary'> Custom Create User </Link>
        <Table columns={columns} dataSource={users}/>
        </DashboardLayout>
    </Layout>
  )
}

export default protectRoute(Users)