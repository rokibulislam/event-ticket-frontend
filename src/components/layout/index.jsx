import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector, useDispatch  } from 'react-redux';
import { logout } from  '../../store/slices/auth'
import auth, { getCurrentUser } from '../../services/authService'
import { Menu } from 'antd';

import { Layout as AntLayout, Header, Space, Row, Col, Container } from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';


const Layout = ( { children }) => {
    let user = useSelector( state => state.auth.user );
    let router = useRouter();

    const dispatch = useDispatch()

    useEffect(() => {
        // let user = getCurrentUser();
        // setUser(user);
    }, [])

    const handleLogout = (e) => {
        e.preventDefault();
        console.log('handle logout');
        dispatch(logout());
        auth.logout();
        router.push('/auth/login');
    }

    let menuitems = [];

    if( user ) {
         menuitems = [
            {
                label: 'Dashboard',
                key: '/dashboard'
            }, 
            {
                label: 'Logout',
                key: '/logout'
            }, 
        ];
    } else {
        menuitems = [
            {
                label: 'Login',
                key: '/auth/login'
            }, 
            {
                label: 'Register',
                key: '/auth/register'
            }, 
        ]
    }

    return (
    <>
        
        <AntLayout className='header'>
            <div className="container">
                <Row gutter={16}>
                    <Col span={4}>
                        <Link href="/" style={{ textDecoration: 'none' }}> Simple Logo </Link>
                    </Col>
                    
                    <Col span={8}>
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
                    </Col>
                    
                    <Col span={4}>
                        <Menu
                            style={{
                                background: "none",
                                color: '#fff'
                            }}
                            mode="horizontal"
                            onClick={ (item ) => {
                                if(item.key=="/logout") {
                                    handleLogout(item.domEvent);
                                } else{
                                    router.push(item.key);
                                }
                            }}
                            items={menuitems}
                        />   
                    </Col>             
                </Row>
            </div>
            
        </AntLayout>

        <Space />
        
        <div className='row'>
            <div className="container">
                { children }
            </div>
        </div>
    </>
  )
}

export default Layout