import Layout from '@/components/layout'
import React from 'react'
import DashboardLayout from '@/components/DashboardLayout';
import { protectRoute } from '@/components/protectRoute';

const Attendae = () => {
  return (
    <Layout>
        <DashboardLayout>
            <h2> Attendae </h2>
        </DashboardLayout>
    </Layout>
  )
}

export default protectRoute(Attendae)