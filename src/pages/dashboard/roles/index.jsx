import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { getUsers, deleteUser } from '@/store/slices/user'

import { Table, Space } from 'antd'
import { getRoles, deleteRole } from '@/store/slices/role';

const Roles = () => {
    const dispatch = useDispatch();
    const roles =  useSelector( state => state.role.items );
  
    useEffect( () => {
      dispatch(getRoles())
    },[dispatch])

    const handleRemove = (e, id) => {
      e.preventDefault();
      dispatch(deleteRole(id))
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
              <Link href={`/dashboard/roles/${item.id}/edit`}> Edit </Link> 
              <button onClick={ (e) => handleRemove(e,item.id)} className='btn btn-danger'> Delete </button>
            </Space>
          ),
        },
    ];

    return (
        <Layout>
            <DashboardLayout>
                <h2> Roles </h2>
                <Link href="/dashboard/roles/create" className='btn btn-primary'> Create Role </Link>
                <Table columns={columns} dataSource={roles}/>
            </DashboardLayout>
        </Layout>
    )
}

export default Roles