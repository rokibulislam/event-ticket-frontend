import Layout from '@/components/layout'
import React from 'react'
import DashboardLayout from '@/components/DashboardLayout';
import { protectRoute } from '@/components/protectRoute';


const OrderDetails = () => {
  return (
    <Layout>
        <DashboardLayout>
            <h2> OrderDetails </h2> 
        </DashboardLayout>
    </Layout>
  )
}

export default protectRoute(OrderDetails)