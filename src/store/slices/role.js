import httpService from '@/services/httpService'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getRoles = createAsyncThunk('event/getRoles', async () => {
    try {
        let response = await httpService.get('roles');
        return response.data   
    } catch (error) {
        return error.message
    }
})


export const getRole = createAsyncThunk('event/getRole', async (id) => {
    try {
        let response = await httpService.get(`roles/${id}`);
        return response.data   
    } catch (error) {
        return error.message
    }
})

export const createRole = createAsyncThunk('event/createRole', async (name, thunkAPI) => {
    try {
        let response = await httpService.post('roles', {
            name: name
        })
        return response;   
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const updateRole = createAsyncThunk('event/updateRole', async ( { id, name }, thunkAPI) => {
    try {
        let response = await httpService.put(`roles/${id}`, {
            name: name
        })
    
        return response;   
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const deleteRole = createAsyncThunk('event/deleteRole', async (id) => {
    try {
        let response = await httpService.delete(`roles/${id}`)
        return id;   
    } catch (error) {
        return error.message
    }
})

const roleSlice = createSlice({
    name: "role",
    initialState: {
        items: [],
        item: {},
        status: "idle",
        error: ""
    },
    reducers: {

    },

    extraReducers: {
        [getRoles.pending]: (state, action) => {

        },

        [getRoles.fulfilled]: (state, action) => {
            state.items = action.payload
        },

        [getRoles.rejected]: (state, action) => {

        },

        [getRole.pending]: (state, action) => {

        },

        [getRole.fulfilled]: (state, action) => {
            state.item = action.payload
        },

        [getRole.rejected]: (state, action) => {

        },

        [createRole.pending]: (state, action) => {

        },

        [createRole.fulfilled]: (state, action) => {
            state.items.push(action.payload)
        },

        [createRole.rejected]: (state, action) => {

        },

        [updateRole.pending]: (state, action) => {

        },

        [updateRole.fulfilled]: (state, action) => {
            // Update an event in the events array
            const { id, newData } = action.payload;
            const typeIndex = state.items.findIndex(item => item.id === id);
            if (typeIndex !== -1) {
                state.items[typeIndex] = { ...state.items[typeIndex], ...newData };
            }
        },

        [updateRole.rejected]: (state, action) => {

        },

        [deleteRole.pending]: (state, action) => {

        },

        [deleteRole.fulfilled]: (state, action) => {
            // Remove an event from the events array
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
        },

        [deleteRole.rejected]: (state, action) => {

        },
    }
})

export default roleSlice.reducer