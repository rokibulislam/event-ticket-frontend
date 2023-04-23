import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector, useDispatch  } from 'react-redux';
import { logout } from  '../store/slices/auth'
import auth from '../services/authService'
import { Menu } from 'antd';

import { Layout as AntLayout, Header, Space, Row, Col, Container } from 'antd'

const Layout = ( { children }) => {

    let user = useSelector( state => state.auth.user );
    let router = useRouter();

    const dispatch = useDispatch()

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        auth.logout();
        router.push('/auth/login');
    }

    let menuitems = [];

    if( user ) {
        let menuitems = [
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
        let menuitems = [
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
    <div className="container">
        
        <AntLayout>

            <Row gutter={16}>
            
                <Col span={4}>
                    <Link href="/" className='logo'> Simple Logo </Link>
                </Col>
                
                <Col span={8}>
                    <Menu
                        style={{
                            background: "none"
                        }}
                        mode="horizontal"
                        onClick={ (item) => {
                        router.push(item.key);
                        }}
                        items={[
                            {
                                label: 'Home',
                                key: '/'
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
    {/* 
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link" href="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/events">Events</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href="/checkout">Checkout</Link>
                        </li>
                    </ul> */}
                </Col>
                
                <Col span={4}>
                    
                    {/* <ul className="nav"> */}

                        { user ? (
                            <>
                        
                                <Menu
                                    style={{
                                        background: "none"
                                    }}
                                    mode="horizontal"
                                    onClick={ (item) => {
                                        if(item.key=="logut") {
                                            handleLogout();
                                        } else{
                                            router.push(item.key);
                                        }
                                    }}
                                    items={[
                                        {
                                            label: 'Dashboard',
                                            key: '/dashboard'
                                        }, 
                                        {
                                            label: 'Logout',
                                            key: '/logout'
                                        }, 
                                    ]}
                                />

                                {/* <li className="nav-item">
                                    <Link className="nav-link" href="/dashboard">Dashboard</Link>
                                </li> 

                                <li className="nav-item">
                                    <Link  href="/logout" onClick={handleLogout} className="nav-link button button-danger"> Logout </Link>
                                </li>  */}
                            </>
                            ) : (
                                <>
                                
                                    <Menu
                                        style={{
                                            background: "none"
                                        }}
                                        mode="horizontal"
                                        onClick={ (item) => {
                                            if(item.key=="logut") {
                                                handleLogout();
                                            } else{
                                                router.push(item.key);
                                            }
                                        }}
                                        items={[
                                            {
                                                label: 'Login',
                                                key: '/auth/login'
                                            }, 
                                            {
                                                label: 'Register',
                                                key: '/auth/register'
                                            }, 
                                        ]}
                                    />
                                    {/* <li className="nav-item">
                                        <Link className="btn btn-outline-primary me-2" href="/auth/login"> Login </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="btn btn-primary" href="/auth/register"> Register </Link>
                                    </li> */}
                                </>
                        ) } 
                    {/* </ul> */}
                </Col>
            
            </Row>
        
        </AntLayout>

        <Space />
                            
        <div className='row'>
            { children }
        </div>
    </div>

    </>
  )
}

export default Layout