import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { Table, Space } from 'antd'
import { getCoupons, deleteCoupon } from '@/store/slices/coupon'
import { protectRoute } from '@/components/protectRoute'
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { unwrapResult } from '@reduxjs/toolkit'

const Coupons = () => {
  const dispatch = useDispatch();
  const coupons =  useSelector( state => state.coupon.items );

  useEffect( () => {
    try {
      let resultAction = dispatch(getCoupons())
      unwrapResult(resultAction)
    } catch (error) {
      console.log(error)
    }
  },[dispatch])
  
  const handleRemove = (e, id) => {
    e.preventDefault();
    try {
      let resultAction  = dispatch(deleteCoupon(id));
      unwrapResult(resultAction)
    } catch (error) {
      console.log(error)
    }
  }

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Discount Amount',
      dataIndex: 'amount',
      key: 'amount',
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