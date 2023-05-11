import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSelector, useDispatch  } from 'react-redux';
import { logout } from  '../../store/slices/auth'
import auth from '../../services/authService'

import { useRouter } from 'next/navigation';
import { Menu } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const DashboardLayout = ( { children }) => {
  
  const router = useRouter();

  const user = useSelector( state => state.auth.user );
  const [current, setCurrent] = useState('/dashboard');

  // let roles = user?.roles;
  // let role = roles.find( item =>  item.name == 'Vendor' );
  // console.log(role);

  let Adminitems = [
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
      label: 'Ticket Type',
      key: '/dashboard/tickettype'
    }
  ];


  let items = [
    {
      label: 'Dashboard',
      key: '/dashboard'
    },
    {
      label: 'Events',
      key: '/dashboard/events'
    },
    {
      label: 'Times & Tickets',
      key: '/dashboard/tickets'
    },
    {
      label: 'Venue',
      key: '/dashboard/venue'
    },
    {
      label: 'Coupons',
      key: '/dashboard/coupons'
    },
    {
      label: 'Reports',
      key: '/dashboard/reports'
    },
    {
      label: 'Orders',
      key: '/dashboard/orders'
    },
    {
      label: 'Attendee',
      key: '/dashboard/attendae'
    },
    {
      label: 'Settings',
      key: '/dashboard/settings',
      icon: <SettingOutlined />
    }
  ];

  // if( role?.name == 'Adminstrator' ) {
    items = [...items, ...Adminitems ]
  // } 


  return (
    <div className="dashboard">
      
        <div className='dashnav'>
          <Menu
            onClick={ (item) => {
              setCurrent(item.key);
              router.push(item.key);
            }}
            items={items}
            selectedKeys={[current]}
          />
        </div>

        <div className='dashcontent'>
            { children }
        </div>
    </div>
  )
}

export default DashboardLayout