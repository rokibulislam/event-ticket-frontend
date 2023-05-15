import Layout from '@/components/layout'
import { protectRoute } from '@/components/protectRoute'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const CustomerOrders = () => {
    let dispatch = useDispatch();
    // let orders = useSelector( state => state.order.items )

    useEffect(() => {
        // try {
        //     let resultAction = dispatch(getOrders());
        //     unwrapResult(resultAction);
        // } catch (error) {
        //     console.log('err');
        // }

    }, [dispatch])
    return (
        <Layout>
            <div className='container'>
                <h2> CustomerOrders </h2>
            </div>
        </Layout>
    )
}

export default protectRoute(CustomerOrders)