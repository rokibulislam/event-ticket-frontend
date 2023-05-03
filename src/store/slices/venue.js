import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '@/services/httpService'

export const getVenues = createAsyncThunk('event/getVenues', async () => {
    try {
        let response = await httpService.get('venue');
        
        return response.data;    
    } catch (error) {
        return error.message 
    }
})

export const getVenue = createAsyncThunk('event/getEvent', async (id) => {
    try {
        let response  = await httpService.get(`venue/${id}`);
        return response.data;
    } catch (error) {
        return error.message
    }
})

export const createVenue = createAsyncThunk('event/createVenue', async ({ name, nickname, city, country, state, postcode }, thunkAPI ) => {
    try {
        let response = await httpService.post('venue', {
            name: name, 
            nickname: nickname, 
            city: city, 
            country: country, 
            state: state, 
            postcode: postcode
        });
        
        return response;   
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data) 
    }
})

export const updateVenue = createAsyncThunk('event/updateVenue', async ({ id, name, nickname, city, country, state, postcode }, thunkAPI) => {
    try {
        let response = await httpService.put(`venue/${id}`, {
            'name' : name,
            'nickname' : nickname,
            'city': city,
            'country': country,
            'state': state,
            'postcode': postcode
        });
        
        return response;   
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)    
    }
})

export const deleteVenue = createAsyncThunk('event/deleteVenue', async (id) => {
    try {
        let response = httpService.delete(`venue/${id}`);
        return id;   
    } catch (error) {
        return error.message
    }
})

const venueSlice = createSlice({
    name: "venue",
    initialState: {
        items: [],
        item: {},
        status: "idle",
        error: ""
    },

    reducers: {

    },

    extraReducers: {
        [getVenues.pending]: (state, action) => {

        },

        [getVenues.fulfilled]: (state, action) => {
            state.items = action.payload;
        },

        [getVenues.rejected]: (state, action) => {

        },

        [getVenue.pending]: (state, action) => {

        },

        [getVenue.fulfilled]: (state, action) => {
            state.item = action.payload;
        },

        [getVenue.rejected]: (state, action) => {

        },

        [createVenue.pending]: (state, action) => {

        },

        [createVenue.fulfilled]: (state, action) => {
            // Add a new event to the events array
            state.items.push(action.payload);
        },

        [createVenue.rejected]: (state, action) => {

        },

        [updateVenue.pending]: (state, action) => {

        },

        [updateVenue.fulfilled]: (state, action) => {
            // Update an event in the events array
            const { id, newData } = action.payload.data;
            const typeIndex = state.items.findIndex(item => item.id === id);
            if (typeIndex !== -1) {
                state.items[typeIndex] = { ...state.items[typeIndex], ...newData };
            }
        },

        [updateVenue.rejected]: (state, action) => {

        },

        [deleteVenue.pending]: (state, action) => {

        },

        [deleteVenue.fulfilled]: (state, action) => {
            // Remove an event from the events array
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
        },

        [deleteVenue.rejected]: (state, action) => {

        }

    }
})

export default venueSlice.reducer