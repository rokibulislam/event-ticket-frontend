import httpService from '@/services/httpService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getEventtimes = createAsyncThunk('event/getEventtimes', async () => {
    try {
        let response  = await httpService.get('eventtimes');
        return response.data;  
    } catch (error) {
        console.log(error);
        return error.message
    }
})

export const getEventtime = createAsyncThunk('event/getEventtimes', async (id) => {
    try {
        let response  = await httpService.get('eventtimes/${id}');
        return response.data;  
    } catch (error) {
        console.log(error);
        return error.message
    }
})

const  createEventtime = createAsyncThunk('eventtimes', async () => {
    try {
      let response = await httpService.post('eventtimes');
      return response
    } catch (error) {
        return error.message;
    }
})

export const updateEventtime = createAsyncThunk('event/updateEventtime', async ( { id, code, amount } , thunkAPI) => {
    try {
        let response  = await httpService.put(`eventtimes/${id}`, {});
        return response;   
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data) 
    }
})

export const deleteEventtime = createAsyncThunk('event/deleteEventtime', async (id) => {
    try {
        let response  = await httpService.delete(`eventtimes/${id}`);
        return id;   
    } catch (error) {
        return error.message 
    }
})


const eventtimeSlice = createSlice({
    name: "eventitme",
    initialState: {
        items: [],
        status: "idle",
        error: ""
    },

    reducers: {

    },

    extraReducers: {
        [getEventtimes.pending]: (state, action) => {

        },

        [getEventtimes.fulfilled]: (state, action) => {
            state.items = action.payload;
        },

        [getEventtimes.rejected]: (state, action) => {

        },

        [getEventtime.pending]: (state, action) => {

        },

        [getEventtime.fulfilled]: (state, action) => {
            // state.item = action.payload;
        },

        [getEventtime.rejected]: (state, action) => {

        },

        [createEventtime.pending]: (state, action) => {

        },

        [createEventtime.fulfilled]: (state, action) => {
            state.item = action.payload;
        },

        [createEventtime.rejected]: (state, action) => {

        },

        [updateEventtime.pending]: (state, action) => {

        },

        [updateEventtime.fulfilled]: (state, action) => {
            state.item = action.payload;
        },

        [updateEventtime.rejected]: (state, action) => {

        },

        [deleteEventtime.pending]: (state, action) => {

        },

        [deleteEventtime.fulfilled]: (state, action) => {
            state.item = action.payload;
        },

        [deleteEventtime.rejected]: (state, action) => {

        },
    }
})


export default eventtimeSlice.reducer