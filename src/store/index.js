import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

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

import countryReducer from './slices/countries'

const persistConfig = {
    key: 'auth',
    storage,
}

const rootReducer = combineReducers({
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
    coupon: couponReducer,
    country: countryReducer
});

  
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store  = configureStore({
    reducer: persistedReducer
})

const makeStore = () => store;

export const persistor = persistStore(store)

export const wrapper = createWrapper(makeStore);