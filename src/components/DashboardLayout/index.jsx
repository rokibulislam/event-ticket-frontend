import React, { useEffect } from 'react'
import Link from 'next/link'
import { useSelector, useDispatch  } from 'react-redux';
import { logout } from  '../../store/slices/auth'
import auth from '../../services/authService'

import { useRouter } from 'next/navigation';
import { Menu } from 'antd';

const DashboardLayout = ( { children }) => {
  
  const router = useRouter();

  return (
    <div className="dashboard">
      
        <div className='dashnav'>

          <Menu
            onClick={ (item) => {
              router.push(item.key);
            }}
            items={[
              {
                label: 'Dashboard',
                key: '/dashboard'
              },
              {
                label: 'Users',
                key: '/dashboard/users'
              },
              {
                label: 'Roles',
                key: '/dashboard/roles'
              },
              {
                label: 'Permissions',
                key: '/dashboard/permissions'
              },
              {
                label: 'Events',
                key: '/dashboard/events'
              },
              {
                label: 'Venue',
                key: '/dashboard/venue'
              },
              {
                label: 'Category',
                key: '/dashboard/category'
              },
              {
                label: 'SubCategory',
                key: '/dashboard/subcategory'
              },
              {
                label: 'Type',
                key: '/dashboard/types'
              },
              {
                label: 'Times & Tickets',
                key: '/dashboard/tickets'
              },
              {
                label: 'Ticket Type',
                key: '/dashboard/tickettype'
              },
              {
                label: 'Orders',
                key: '/dashboard/orders'
              },
              {
                label: 'Attendae',
                key: '/dashboard/attendae'
              },
              {
                label: 'Reports',
                key: '/dashboard/reports'
              }
            ]}
          />
          {/* <ul className='nav'>
              <li className='nav-item'> <Link className='nav-link' href="/dashboard/"> Dashboard </Link> </li>
              <li className='nav-item'> <Link className='nav-link' href="/dashboard/users"> Users </Link> </li>
              <li className='nav-item'> <Link className='nav-link' href="/dashboard/events"> Events </Link> </li>
              <li className='nav-item'> <Link className='nav-link' href="/dashboard/venue"> Venue </Link> </li>
              <li className='nav-item'> <Link className='nav-link' href="/dashboard/category"> Category </Link> </li>
              <li className='nav-item'> <Link className='nav-link' href="/dashboard/types"> Type </Link> </li>
              <li className='nav-item'> <Link className='nav-link' href="/dashboard/tickets"> Times & Tickets </Link> </li>
              <li className='nav-item'> <Link className='nav-link' href="/dashboard/orders"> Orders </Link> </li>
              <li className='nav-item'> <Link className='nav-link' href="/dashboard/attendae"> Attendae </Link> </li>
              <li className='nav-item'> <Link className='nav-link' href="/dashboard/reports"> Reports </Link> </li>
          </ul> */}
        </div>

        <div className='dashcontent'>
            { children }
        </div>
    </div>
  )
}

export default DashboardLayout