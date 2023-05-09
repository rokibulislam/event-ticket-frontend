import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { Table, Space } from 'antd'
import { getCoupons, deleteCoupon } from '@/store/slices/coupon'
import { protectRoute } from '@/components/protectRoute'
import { CloseOutlined, EditOutlined } from '@ant-design/icons';

const Coupons = () => {
  const dispatch = useDispatch();
  const coupons =  useSelector( state => state.coupon.items );

  useEffect( () => {
    dispatch(getCoupons())
  },[dispatch])

  const handleCreate = (e) => {
    e.preventDefault();
  }

  const handleRemove = (e, id) => {
    e.preventDefault();
    dispatch(deleteCoupon(id));
  }

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Discount Amount',
      dataIndex: 'discount_amount',
      key: 'discount_amount',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, item) => (
        <Space size="middle">
          <Link href={`/dashboard/coupons/${item.id}/edit`}> <EditOutlined />  </Link> 
          <Link href={`/dashboard/coupons/${item.id}/customedit`}> Custom Edit </Link> 
          <CloseOutlined onClick={ (e) => handleRemove(e,item.id)} className='btn btn-danger' />
        </Space>
      ),
    },
  ];

  
  return (
    <Layout>
        <DashboardLayout>
            <h2> Coupons </h2> 
            <Link href="/dashboard/coupons/create" className="btn btn-primary"> Create Coupon </Link>
            <Link href="/dashboard/coupons/customcreate" className="btn btn-primary"> Create Custom Coupon </Link>
            <Table columns={columns} dataSource={coupons}/>
        </DashboardLayout>
    </Layout>
  )
}

export default protectRoute(Coupons)