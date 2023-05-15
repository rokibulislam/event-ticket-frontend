import httpService from '@/services/httpService'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getTicketsbyEvents = createAsyncThunk('event/getTicketsbyEvents', async (eventId, thunkAPI) => {
    try {
        let response = await httpService.get(`events/${eventId}/tickets/`);
        return response.data   
    } catch (error) {
        return error.message
    }
})


export const createTicketByEvents = createAsyncThunk('event/createTicketByEvents', async (eventId, thunkAPI) => {
    try {
        let response = await httpService.post(`events/${eventId}/tickets/`, {})
        return response;   
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})


const ticketSlice = createSlice({
    name: "tickets",
    initialState: {
        items: [],
        status: "idle",
        error: ""
    },
    reducers: {

    },

    extraReducers: {
        [getTicketsbyEvents.pending]: (state, action) => {

        },

        [getTicketsbyEvents.fulfilled]: (state, action) => {
            state.items = action.payload
        },

        [getTicketsbyEvents.rejected]: (state, action) => {

        },
        
        [createTicketByEvents.pending]: (state, action) => {

        },

        [createTicketByEvents.fulfilled]: (state, action) => {
            state.items.push(action.payload)
        },

        [createTicketByEvents.rejected]: (state, action) => {

        }
    }
})

export default ticketSlice.reducer