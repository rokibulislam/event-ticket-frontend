import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import authReducer from './slices/auth'
import venueReducer from './slices/venue'
import eventReducer from './slices/event'
import eventtypeReducer from './slices/eventtype'
import eventcategoryReducer from './slices/eventcategory'
import eventsubcategoryReducer from './slices/eventsubcategory'
import userReducer from './slices/user'
import tickettypeReducer from './slices/tickettype'

import roleReducer from './slices/role'
import permissionReducer from './slices/permission'
import couponReducer from './slices/coupon'

export const store  = configureStore({
    reducer: {
        auth: authReducer,
        venue: venueReducer,
        event: eventReducer,
        eventtype: eventtypeReducer,
        eventcategory: eventcategoryReducer,
        eventsubcategory: eventsubcategoryReducer,
        user: userReducer,
        tickettype: tickettypeReducer,
        role:roleReducer,   
        premission: permissionReducer,
        coupon: couponReducer
    }
})

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);