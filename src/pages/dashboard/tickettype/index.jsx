import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { getTicketTypes, deleteTicketType } from '@/store/slices/tickettype'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { Table, Space } from 'antd'
import { protectRoute } from '@/components/protectRoute'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'

const TicketType = () => {
  const dispatch = useDispatch();

  const tickettypes =  useSelector( state => state.tickettype.items );

  useEffect( () => {
    dispatch(getTicketTypes())
  },[dispatch])

  const handleCreate = (e) => {
    e.preventDefault();
  }

  const handleRemove = (e, id) => {
    e.preventDefault();
    dispatch(deleteTicketType(id));
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
          <Link href={`/dashboard/tickettype/${item.id}/edit`}> <EditOutlined /> </Link> 
          <CloseOutlined onClick={ (e) => handleRemove(e,item.id)} className='btn btn-danger' />
        </Space>
      ),
    },
  ];
  return (
    <Layout>
        <DashboardLayout>
            <h2> TicketType  </h2>
            <Link href="/dashboard/tickettype/create" className="btn btn-create"> Create Ticket Type </Link>
            <Table columns={columns} dataSource={tickettypes}/>
        </DashboardLayout>
    </Layout>
  )
}

export default protectRoute(TicketType)