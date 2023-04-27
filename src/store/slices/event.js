import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/httpService'


export const getEvents = createAsyncThunk('event/getEvents', async () => {
    try {
        let response  = await httpService.get('events');
        return response.data;
    } catch (error) {
        return error.message
    }
    
    return response.data;
})

export const getEvent = createAsyncThunk('event/getEvent', async (id) => {
    try {
        let response  = await httpService.get(`events/${id}`);
    } catch (error) {
        return error.message
    }
    
    return response.data;
})

export const createEvent = createAsyncThunk('event/createEvent', async ( { name , description, type_id,  category_id, venue_id }, thunkAPI ) => {
    try {
        let response  = await httpService.post('events', {
            name: name,
            description: description,
            type_id: type_id,
            category_id: category_id,
            venue_id: venue_id
            // chart: chart
        });
        console.log(response);
        return response;   
    } catch (error) {
        console.log(error);
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
        error: ""
    },

    reducers: {

    },

    extraReducers: {
        [getEvents.pending]: (state, action) => {

        },

        [getEvents.fulfilled]: (state, action) => {
            state.items = action.payload;
        },

        [getEvents.rejected]: (state, action) => {

        },

        [getEvent.pending]: (state, action) => {

        },

        [getEvent.fulfilled]: (state, action) => {
            state.item = action.payload;
        },

        [getEvent.rejected]: (state, action) => {

        },

        [createEvent.pending]: (state, action) => {

        },

        [createEvent.fulfilled]: (state, action) => {
            state.items.push(action.payload)
        },

        [createEvent.rejected]: (state, action) => {

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