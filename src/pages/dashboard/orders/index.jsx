import Layout from '@/components/layout'
import React from 'react'
import DashboardLayout from '@/components/DashboardLayout';
import { Table  } from "antd";
import { protectRoute } from '@/components/protectRoute';

const Orders = () => {
  return (
  <Layout>
    <DashboardLayout>
      <h2> Orders </h2>
    </DashboardLayout>
  </Layout>
  )
}

export default protectRoute(Orders)