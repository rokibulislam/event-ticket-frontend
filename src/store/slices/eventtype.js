import httpService from '@/services/httpService'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getEventTypes = createAsyncThunk('event/getEventTypes', async () => {
   let response = await httpService.get('eventtypes');

   return response.data;
})

export const getEventType = createAsyncThunk('event/getEventType', async (id) => {
    let response = await httpService.get(`eventtypes/${id}`);
 
    return response.data;
 })

export const createEventType = createAsyncThunk('event/createEventType', async (name) => {
    let response = await httpService.post('eventtypes', {
        name: name 
    })

    return response;
})

export const updateEventType = createAsyncThunk('event/updateEventType', async ( { id, name } ) => {
    let response = await httpService.put(`eventtypes/${id}`, {
        name: name
    })

    return response;
})

export const deleteEventType = createAsyncThunk('event/deleteEventCategory', async (id) => {
    let response = await httpService.delete(`eventtypes/${id}`)

    return id;
})

const eventtypeSlice = createSlice({
    name: "eventtype",
    initialState: {
        items: []
    },

    reducers: {

    },

    extraReducers: {
        [getEventTypes.pending]: (state, action) => {

        },

        [getEventTypes.fulfilled]: (state, action) => {
            state.items = action.payload;
        },

        [getEventTypes.rejected]: (state, action) => {

        },

        [getEventType.pending]: (state, action) => {

        },

        [getEventType.fulfilled]: (state, action) => {
            state.item = action.payload;
        },

        [getEventType.rejected]: (state, action) => {

        },

        [createEventType.pending]: (state, action) => {

        },

        [createEventType.fulfilled]: (state, action) => {
            // Add a new event to the events array
            state.items.push(action.payload);
        },

        [createEventType.rejected]: (state, action) => {

        },

        [updateEventType.pending]: (state, action) => {

        },

        [updateEventType.fulfilled]: (state, action) => {
            // Update an event in the events array
            const { id, newData } = action.payload;
            const typeIndex = state.items.findIndex(item => item.id === id);
            if (typeIndex !== -1) {
                state.items[typeIndex] = { ...state.items[typeIndex], ...newData };
            }
        },

        [updateEventType.rejected]: (state, action) => {

        },


        [deleteEventType.pending]: (state, action) => {

        },

        [deleteEventType.fulfilled]: (state, action) => {
            // Remove an event from the events array
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
        },

        [deleteEventType.rejected]: (state, action) => {

        }
    }
})

export default eventtypeSlice.reducer