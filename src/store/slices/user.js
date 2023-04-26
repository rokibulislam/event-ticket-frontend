import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/httpService'

export const getUsers = createAsyncThunk('user/getUsers', async () => {
    try {
        let response  = await httpService.get('users');
        return response.data;  
    } catch (error) {
        return error.message
    }
})

export const getUser = createAsyncThunk('user/getUser', async (id) => {
    try {
        let response  = await httpService.get(`users/${id}`);
    
        return response.data;  
    } catch (error) {
        return error.message
    }
})

export const createUser = createAsyncThunk('user/createUser', async (input, thunkAPI) => {
    try {
        let response  = await httpService.post('users', {
            ...input
        });
    
        return response;   
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }

})

export const updateUser = createAsyncThunk('user/updateUser', async ( { id, newData } , thunkAPI) => {
    try {
        let response  = await httpService.put(`users/${id}`, newData);

        return response;   
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data) 
    }

})

export const deleteUser = createAsyncThunk('user/deleteUser', async (id) => {
    try {
        let response  = await httpService.delete(`users/${id}`);
        return id;   
    } catch (error) {
        return error.message 
    }

})



const eventSlice = createSlice({
    name: "user",
    initialState: {
        items: [],
        item: {},
        status: "idle",
        error: ""
    },

    reducers: {

    },

    extraReducers: {
        [getUsers.pending]: (state, action) => {

        },

        [getUsers.fulfilled]: (state, action) => {
            state.items = action.payload;
        },

        [getUsers.rejected]: (state, action) => {

        },

        [getUser.pending]: (state, action) => {

        },

        [getUser.fulfilled]: (state, action) => {
            state.item = action.payload;
        },

        [getUser.rejected]: (state, action) => {

        },

        [createUser.pending]: (state, action) => {

        },

        [createUser.fulfilled]: (state, action) => {
            state.items.push(action.payload)
        },

        [createUser.rejected]: (state, action) => {

        },

        [updateUser.pending]: (state, action) => {

        },

        [updateUser.fulfilled]: (state, action) => {
            // Update an event in the events array
            const { id, newData } = action.payload;
            const typeIndex = state.items.findIndex(item => item.id === id);
            if (typeIndex !== -1) {
                state.items[typeIndex] = { ...state.items[typeIndex], ...newData };
            }
        },

        [updateUser.rejected]: (state, action) => {

        },

        [deleteUser.pending]: (state, action) => {

        },

        [deleteUser.fulfilled]: (state, action) => {
            // Remove an event from the events array
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
        },

        [deleteUser.rejected]: (state, action) => {

        }
    }
})

export default eventSlice.reducer