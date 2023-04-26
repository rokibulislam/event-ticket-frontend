import httpService from '@/services/httpService'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getEventCategories = createAsyncThunk('event/getEventCategories', async () => {
    try {
        let response = await httpService.get('eventcategory');
        return response.data   
    } catch (error) {
        return error.message
    }
})


export const getEventCategory = createAsyncThunk('event/getEventCategory', async (id) => {
    try {
        let response = await httpService.get(`eventcategory/${id}`);
        return response.data   
    } catch (error) {
        return error.message
    }
})

export const createEventCategory = createAsyncThunk('event/createEventCategory', async (name, thunkAPI) => {
    try {
        let response = await httpService.post('eventcategory', {
            name: name
        })
        return response;   
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const updateEventCategory = createAsyncThunk('event/updateEventCategory', async ( { id, name }, thunkAPI) => {
    try {
        let response = await httpService.put(`eventcategory/${id}`, {
            name: name
        })
    
        return response;   
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const deleteEventCategory = createAsyncThunk('event/deleteEventCategory', async (id) => {
    try {
        let response = await httpService.delete(`eventcategory/${id}`)
        return id;   
    } catch (error) {
        return error.message
    }
})

const eventcategorySlice = createSlice({
    name: "eventcategory",
    initialState: {
        items: [],
        item: {},
        status: "idle",
        error: ""
    },
    reducers: {

    },

    extraReducers: {
        [getEventCategories.pending]: (state, action) => {

        },

        [getEventCategories.fulfilled]: (state, action) => {
            state.items = action.payload
        },

        [getEventCategories.rejected]: (state, action) => {

        },

        [getEventCategory.pending]: (state, action) => {

        },

        [getEventCategory.fulfilled]: (state, action) => {
            state.item = action.payload
        },

        [getEventCategory.rejected]: (state, action) => {

        },

        [createEventCategory.pending]: (state, action) => {

        },

        [createEventCategory.fulfilled]: (state, action) => {
            state.items.push(action.payload)
        },

        [createEventCategory.rejected]: (state, action) => {

        },

        [updateEventCategory.pending]: (state, action) => {

        },

        [updateEventCategory.fulfilled]: (state, action) => {
            // Update an event in the events array
            const { id, newData } = action.payload;
            const typeIndex = state.items.findIndex(item => item.id === id);
            if (typeIndex !== -1) {
                state.items[typeIndex] = { ...state.items[typeIndex], ...newData };
            }
        },

        [updateEventCategory.rejected]: (state, action) => {

        },

        [deleteEventCategory.pending]: (state, action) => {

        },

        [deleteEventCategory.fulfilled]: (state, action) => {
            // Remove an event from the events array
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
        },

        [deleteEventCategory.rejected]: (state, action) => {

        },
    }
})

export default eventcategorySlice.reducer