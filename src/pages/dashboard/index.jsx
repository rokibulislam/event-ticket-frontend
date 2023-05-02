import Layout from '@/components/layout'
import React from 'react'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Card, Space, Statistic, Typography } from 'antd'
import { protectRoute } from '@/components/protectRoute';

const Dashboard = () => {
  return (
    <Layout>
      <DashboardLayout>
        <Typography.Title level={4}> Dashboard </Typography.Title>
        {/* <h2> Dashboard </h2> */}
      
        <Space direction='horizontal'>
            <DashboardCard icon={<ShoppingCartOutlined />} title="Orders" value={1200} />
            <DashboardCard icon={<UserOutlined />} title="Customers" value={1200} />
            <DashboardCard icon={<UserOutlined />} title="Revenue" value={1200} />
        </Space>
      
      </DashboardLayout>
    </Layout>
  )
}

function DashboardCard({icon, title, value}) {
  return (
    <Card style={{ width: 300 }}>
       <Space direction='horizontal'>
          {icon}
          <Statistic title={title} value={value} />
        </Space>
    </Card>
  )
}

export default protectRoute(Dashboard)