import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { Table, Space } from 'antd'
import { getPermissions, deletePermission } from '@/store/slices/permission';

const Permissions = () => {
    const dispatch = useDispatch();
    const premissions =  useSelector( state => state.premission.items );
  
    useEffect( () => {
      dispatch(getPermissions())
    },[dispatch])

    const handleRemove = (e, id) => {
      e.preventDefault();
      dispatch(deletePermission(id))
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
              <button onClick={ (e) => handleRemove(e,item.id)} className='btn btn-danger'> Delete </button>
            </Space>
          ),
        },
    ];

    return (
        <Layout>
            <DashboardLayout>
                <h2> Permissions </h2>
                <Link href="/dashboard/permissions/create" className='btn btn-primary'> Create Permissions </Link>
                <Table columns={columns} dataSource={premissions}/>
            </DashboardLayout>
        </Layout>
    )
}

export default Permissions