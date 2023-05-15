import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { Table, Space } from 'antd'
import { getPermissions, deletePermission } from '@/store/slices/permission';
import { protectRoute } from '@/components/protectRoute';
import { CloseOutlined } from '@ant-design/icons';
import { unwrapResult } from '@reduxjs/toolkit';

const Permissions = () => {
    const dispatch = useDispatch();
    const premissions =  useSelector( state => state.premission.items );
  
    useEffect( () => {
      try {
        let resultAction = dispatch(getPermissions())
        unwrapResult(resultAction)
      } catch (error) {
        console.log(error);
      }
    },[dispatch])

    const handleRemove = (e, id) => {
      e.preventDefault();
      try {
        let resultAction = dispatch(deletePermission(id))
        unwrapResult(resultAction)
      } catch (error) {
        console.log(error);
      }
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
              <CloseOutlined onClick={ (e) => handleRemove(e,item.id)} className='btn btn-danger' />
            </Space>
          ),
        },
    ];

    return (
        <Layout>
            <DashboardLayout>
                <h2> Permissions </h2>
                <Link href="/dashboard/permissions/create" className='btn btn-create'> Create Permissions </Link>
                {/* <Link href="/dashboard/permissions/customcreate" className='btn btn-primary'> Custom Create Permissions </Link> */}
                <Table columns={columns} dataSource={premissions}/>
            </DashboardLayout>
        </Layout>
    )
}

export default protectRoute(Permissions)