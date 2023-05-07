import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/httpService'


export const getOrderBySeller = createAsyncThunk('event/getOrderBySeller', async () => {
    try {
        let response  = await httpService.get('orders');
        return response.data;
    } catch (error) {
        return error.message
    }
    return response.data;
})

export const createOrder = createAsyncThunk('event/createOrder', async ({ name, chartkey}) => {
    try {
        let response  = await httpService.post('orders', {});
        return response.data;
    } catch (error) {
        return error.message
    }
    return response.data;
})


export const getOrders = createAsyncThunk('event/getOrders', async () => {
    try {
        let response  = await httpService.get('orders');
        return response.data;
    } catch (error) {
        return error.message
    }
})

export const getOrder = createAsyncThunk('event/getOrder', async (id) => {
    try {
        let response  = await httpService.get(`orders/${id}`);
        return response.data
    } catch (error) {
        return error.message
    }
})


export const updateOrder = createAsyncThunk('event/updateOrder', async ( { id }, thunkAPI) => {
    try {
        let response  = await httpService.put(`orders/${id}`, {});
        return response;   
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const deleteOrder = createAsyncThunk('event/deleteOrder', async (id) => {
    try {
        let response  = await httpService.delete(`orders/${id}`);
        return id;    
    } catch (error) {
        return error.message;
    }
})

const orderSlice = createSlice({
    name: "order",
    initialState: {
        items: [],
        item: {},
        status: "idle",
        loading : false,
        error: "",
    },

    reducers: {

    },

    extraReducers: {

    }
})


export default orderSlice.reducer