import Layout from '@/components/layout'
import { protectRoute } from '@/components/protectRoute'
import { getOrder } from '@/store/slices/order'
import { unwrapResult } from '@reduxjs/toolkit'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const CustomOrderdetails = () => {
  let router = useRouter();
  let { id } = router.query;
  let dispatch = useDispatch();
  // let orders = useSelector( state => state.orders.items )

  useEffect(() => {
    try {
      let resultAction = dispatch(getOrder(id));
      unwrapResult(resultAction);
    } catch (error) {
      console.log('err');
    }

  }, [dispatch])
  

  return (
    <Layout>
      <h2> Details </h2>
    </Layout>
  )
}

export default protectRoute(CustomOrderdetails)