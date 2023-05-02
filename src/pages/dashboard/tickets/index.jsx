import Layout from '@/components/layout'
import React from 'react'
import DashboardLayout from '@/components/DashboardLayout';
import { protectRoute } from '@/components/protectRoute';

const Tickets = () => {
  return (
  <Layout>
    <DashboardLayout>
      <h2> Tickets </h2>
    </DashboardLayout>
  </Layout>
  )
}

export default protectRoute(Tickets)