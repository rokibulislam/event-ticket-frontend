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

      {/* <table className='table'>
        <thead>
          <th>
            <td>Order Number</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Total Tickets</td>
            <td>Buy Date</td>
            <td>Original Total</td>
            <td>Refund</td>
            <td>Payment</td>
            <td>Source</td>
          </th>
        </thead>
      </table> */}
    </DashboardLayout>
  </Layout>
  )
}

export default protectRoute(Orders)