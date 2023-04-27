import httpService from '@/services/httpService'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getTicketTypes = createAsyncThunk('event/getTicketTypes', async () => {
    try {
        let response = await httpService.get('tickettypes');
        return response.data   
    } catch (error) {
        return error.message
    }
})


export const getTicketType = createAsyncThunk('event/getTicketType', async (id) => {
    try {
        let response = await httpService.get(`tickettypes/${id}`);
        return response.data   
    } catch (error) {
        return error.message
    }
})

export const createTicketType = createAsyncThunk('event/createTicketType', async (name, thunkAPI) => {
    try {
        let response = await httpService.post('tickettypes', {
            name: name
        })
        return response;   
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const updateTicketType = createAsyncThunk('event/updateTicketType', async ( { id, name }, thunkAPI) => {
    try {
        let response = await httpService.put(`tickettypes/${id}`, {
            name: name
        })
    
        return response;   
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const deleteTicketType = createAsyncThunk('event/deleteTicketType', async (id) => {
    try {
        let response = await httpService.delete(`tickettypes/${id}`)
        return id;   
    } catch (error) {
        return error.message
    }
})

const tickettypeSlice = createSlice({
    name: "tickettype",
    initialState: {
        items: [],
        item: {},
        status: "idle",
        error: ""
    },
    reducers: {

    },

    extraReducers: {
        [getTicketTypes.pending]: (state, action) => {

        },

        [getTicketTypes.fulfilled]: (state, action) => {
            state.items = action.payload
        },

        [getTicketTypes.rejected]: (state, action) => {

        },

        [getTicketType.pending]: (state, action) => {

        },

        [getTicketType.fulfilled]: (state, action) => {
            state.item = action.payload
        },

        [getTicketType.rejected]: (state, action) => {

        },

        [createTicketType.pending]: (state, action) => {

        },

        [createTicketType.fulfilled]: (state, action) => {
            state.items.push(action.payload)
        },

        [createTicketType.rejected]: (state, action) => {

        },

        [updateTicketType.pending]: (state, action) => {

        },

        [updateTicketType.fulfilled]: (state, action) => {
            // Update an event in the events array
            const { id, newData } = action.payload;
            const typeIndex = state.items.findIndex(item => item.id === id);
            if (typeIndex !== -1) {
                state.items[typeIndex] = { ...state.items[typeIndex], ...newData };
            }
        },

        [updateTicketType.rejected]: (state, action) => {

        },

        [deleteTicketType.pending]: (state, action) => {

        },

        [deleteTicketType.fulfilled]: (state, action) => {
            // Remove an event from the events array
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
        },

        [deleteTicketType.rejected]: (state, action) => {

        },
    }
})

export default tickettypeSlice.reducer