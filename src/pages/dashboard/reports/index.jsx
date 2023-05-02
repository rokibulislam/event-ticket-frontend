import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { protectRoute } from '@/components/protectRoute'
import React from 'react'

const DashboardReports = () => {
  return (
    <Layout>
        <DashboardLayout>
            DashboardReports
        </DashboardLayout>
    </Layout>
  )
}

export default protectRoute(DashboardReports)