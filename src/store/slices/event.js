import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/httpService'

export const getEventsbyuser = createAsyncThunk('event/getEventsbyuser', async () => {
    try {
        let response  = await httpService.get('eventsbyuser');
        return response.data;
    } catch (error) {
        return error.message
    }
    
    return response.data;
})

export const createSeatsEvent = createAsyncThunk('event/createSeatsEvent', async ({ name, chartkey}) => {
    try {
        let response  = await httpService.post('createSeatsEvents', {
            name,
            chartkey
        });
        return response.data;
    } catch (error) {
        return error.message
    }
    
    return response.data;
})


export const getEvents = createAsyncThunk('event/getEvents', async () => {
    try {
        let response  = await httpService.get('events');
        return response.data;
    } catch (error) {
        return error.message
    }
})

export const getEvent = createAsyncThunk('event/getEvent', async (id) => {
    try {
        let response  = await httpService.get(`events/${id}`);
        return response.data
    } catch (error) {
        return error.message
    }
})

export const createEvent = createAsyncThunk('event/createEvent', async ( formData, thunkAPI ) => {
    try {
        let response = await httpService.post('events', formData, {
            headers: { 'content-type': 'multipart/form-data' }
        })
        return response.data;   
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const updateEvent = createAsyncThunk('event/updateEvent', async ( { id, newData }, thunkAPI) => {
    try {
        let response  = await httpService.put(`events/${id}`, newData);
        return response;   
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const deleteEvent = createAsyncThunk('event/deleteEvent', async (id) => {
    try {
        let response  = await httpService.delete(`events/${id}`);
        return id;    
    } catch (error) {
        return error.message;
    }
})



const eventSlice = createSlice({
    name: "event",
    initialState: {
        items: [],
        item: {},
        status: "idle",
        loading : false,
        error: "",
        chartkey: null,
    },

    reducers: {

    },

    extraReducers: {
        [getEventsbyuser.pending]: (state, action) => {

        },

        [getEventsbyuser.fulfilled]: (state, action) => {
            state.items = action.payload;
        },

        [getEventsbyuser.rejected]: (state, action) => {

        },

        [getEvents.pending]: (state, action) => {

        },

        [getEvents.fulfilled]: (state, action) => {
            state.items = action.payload;
        },

        [getEvents.rejected]: (state, action) => {

        },

        [getEvent.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },

        [getEvent.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.loading = false;
            state.error = null;
            state.item = action.payload;
        },

        [getEvent.rejected]: (state, action) => {
            console.log(action.payload);
            state.loading = false;
            state.item = null;
            // state.error = action.payload.error ? action.payload.error : 'Failed to register';
        },

        [createEvent.pending]: (state, action) => {

        },

        [createEvent.fulfilled]: (state, action) => {
            if( action.payload?.data != undefined ) {
                console.log(action.payload.event);
                console.log(action.payload?.data);
                state.items.push({ ...action.payload.event, chartkey: action.payload.data.key });
            } else {
                state.items.push(action.payload.event);
            }
        },

        [createEvent.rejected]: (state, action) => {

        },

        [createSeatsEvent.pending]: (state, action) => {

        },

        [createSeatsEvent.fulfilled]: (state, action) => {

        },

        [createSeatsEvent.rejected]: (state, action) => {

        },

        [updateEvent.pending]: (state, action) => {

        },

        [updateEvent.fulfilled]: (state, action) => {
            // Update an event in the events array
            const { id, newData } = action.payload;
            const typeIndex = state.items.findIndex(item => item.id === id);
            if (typeIndex !== -1) {
                state.items[typeIndex] = { ...state.items[typeIndex], ...newData };
            }
        },

        [updateEvent.rejected]: (state, action) => {

        },

        [deleteEvent.pending]: (state, action) => {

        },

        [deleteEvent.fulfilled]: (state, action) => {
            // Remove an event from the events array
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
        },

        [deleteEvent.rejected]: (state, action) => {

        }
    }
})

export default eventSlice.reducer