import React from 'react'
import { useSelector, useDispatch  } from 'react-redux';
import Link from 'next/link'
import { useRouter } from 'next/router'

import { logout } from  '../../store/slices/auth'
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';


const Navigation = () => {
    let user = useSelector( state => state.auth.user );
    let router = useRouter();
    const dispatch = useDispatch()

    return (
        <div>
            <Menu
                style={{
                    background: "none",
                    color: '#fff'
                }}
                mode="horizontal"
                onClick={ (item) => {
                    router.push(item.key);
                }}
                items={[
                    {
                        label: 'Home',
                        key: '/',
                    }, 
                    {
                        label: 'Events',
                        key: '/events'
                    }, 
                    {
                        label: 'Checkout',
                        key: '/checkout'
                    }, 
                ]}
            />
        </div>
    )
}

export default Navigation