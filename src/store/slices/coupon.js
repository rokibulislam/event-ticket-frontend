import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/httpService'
import axios from 'axios';

export const getCoupons = createAsyncThunk('event/getCoupons', async () => {
    try {
        let response  = await httpService.get('coupons');
        return response.data;  
    } catch (error) {
        console.log(error);
        return error.message
    }
})

export const getCoupon = createAsyncThunk('event/getCoupon', async (id) => {
    try {
        let response  = await httpService.get(`coupons/${id}`);
    
        return response.data;  
    } catch (error) {
        return error.message
    }
})

export const createCoupon = createAsyncThunk('event/createCoupon', async ({ code, amount, discount_type, description, minimum_amount, usage_limit, usage_limit_per_user }, thunkAPI) => {
    try {
        console.log('create coupon');
        let response  = await httpService.post('coupons', {
            code: code,
            discount_amount: amount,
            // discount_type: discount_type,
            // description: description,
            // minimum_amount: minimum_amount,
            // usage_limit: usage_limit,
            // usage_limit_per_user: usage_limit_per_user
        });
        console.log(response);
        // return response;   
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }

})

export const updateCoupon = createAsyncThunk('event/updateCoupon', async ( { id, code, amount } , thunkAPI) => {
    try {
        let response  = await httpService.put(`coupons/${id}`, {
            code: code,
            discount_amount: amount
        });

        return response;   
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data) 
    }

})

export const deleteCoupon = createAsyncThunk('event/deleteCoupon', async (id) => {
    try {
        let response  = await httpService.delete(`coupons/${id}`);
        return id;   
    } catch (error) {
        return error.message 
    }
})

const eventSlice = createSlice({
    name: "coupon",
    initialState: {
        items: [],
        item: {},
        status: "idle",
        error: ""
    },

    reducers: {

    },

    extraReducers: {
        [getCoupons.pending]: (state, action) => {

        },

        [getCoupons.fulfilled]: (state, action) => {
            state.items = action.payload;
        },

        [getCoupons.rejected]: (state, action) => {

        },

        [getCoupon.pending]: (state, action) => {

        },

        [getCoupon.fulfilled]: (state, action) => {
            state.item = action.payload;
        },

        [getCoupon.rejected]: (state, action) => {

        },

        [createCoupon.pending]: (state, action) => {

        },

        [createCoupon.fulfilled]: (state, action) => {
            state.items.push(action.payload)
        },

        [createCoupon.rejected]: (state, action) => {

        },

        [updateCoupon.pending]: (state, action) => {

        },

        [updateCoupon.fulfilled]: (state, action) => {
            // Update an event in the events array
            const { id, newData } = action.payload;
            const typeIndex = state.items.findIndex(item => item.id === id);
            if (typeIndex !== -1) {
                state.items[typeIndex] = { ...state.items[typeIndex], ...newData };
            }
        },

        [updateCoupon.rejected]: (state, action) => {

        },

        [deleteCoupon.pending]: (state, action) => {

        },

        [deleteCoupon.fulfilled]: (state, action) => {
            // Remove an event from the events array
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
        },

        [deleteCoupon.rejected]: (state, action) => {

        }
    }
})

export default eventSlice.reducer