import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import authReducer from './slices/auth'
import venueReducer from './slices/venue'
import eventReducer from './slices/event'
import eventtypeReducer from './slices/eventtype'
import eventcategoryReducer from './slices/eventcategory'
import userReducer from './slices/user'

export const store  = configureStore({
    reducer: {
        auth: authReducer,
        venue: venueReducer,
        event: eventReducer,
        eventtype: eventtypeReducer,
        eventcategory: eventcategoryReducer,
        user: userReducer
    }
})

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);