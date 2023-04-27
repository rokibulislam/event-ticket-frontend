import httpService from '@/services/httpService'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getPermissions = createAsyncThunk('event/getPermissions', async () => {
    try {
        let response = await httpService.get('permissions');
        return response.data   
    } catch (error) {
        return error.message
    }
})


export const getPermission = createAsyncThunk('event/getPermission', async (id) => {
    try {
        let response = await httpService.get(`permissions/${id}`);
        return response.data   
    } catch (error) {
        return error.message
    }
})

export const createPermission = createAsyncThunk('event/createRole', async (name, thunkAPI) => {
    try {
        let response = await httpService.post('permissions', {
            name: name
        })
        return response;   
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const updatePermission = createAsyncThunk('event/updateRole', async ( { id, name }, thunkAPI) => {
    try {
        let response = await httpService.put(`permissions/${id}`, {
            name: name
        })
    
        return response;   
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const deletePermission = createAsyncThunk('event/deleteRole', async (id) => {
    try {
        let response = await httpService.delete(`permissions/${id}`)
        return id;   
    } catch (error) {
        return error.message
    }
})

const permissionSlice = createSlice({
    name: "permission",
    initialState: {
        items: [],
        item: {},
        status: "idle",
        error: ""
    },
    reducers: {

    },

    extraReducers: {
        [getPermissions.pending]: (state, action) => {

        },

        [getPermissions.fulfilled]: (state, action) => {
            state.items = action.payload
        },

        [getPermissions.rejected]: (state, action) => {

        },

        [getPermission.pending]: (state, action) => {

        },

        [getPermission.fulfilled]: (state, action) => {
            state.item = action.payload
        },

        [getPermission.rejected]: (state, action) => {

        },

        [createPermission.pending]: (state, action) => {

        },

        [createPermission.fulfilled]: (state, action) => {
            state.items.push(action.payload)
        },

        [createPermission.rejected]: (state, action) => {

        },

        [updatePermission.pending]: (state, action) => {

        },

        [updatePermission.fulfilled]: (state, action) => {
            // Update an event in the events array
            const { id, newData } = action.payload;
            const typeIndex = state.items.findIndex(item => item.id === id);
            if (typeIndex !== -1) {
                state.items[typeIndex] = { ...state.items[typeIndex], ...newData };
            }
        },

        [updatePermission.rejected]: (state, action) => {

        },

        [deletePermission.pending]: (state, action) => {

        },

        [deletePermission.fulfilled]: (state, action) => {
            // Remove an event from the events array
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
        },

        [deletePermission.rejected]: (state, action) => {

        },
    }
})

export default permissionSlice.reducer