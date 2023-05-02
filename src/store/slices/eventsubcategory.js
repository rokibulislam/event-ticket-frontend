import httpService from '@/services/httpService'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const getSubEventCategories = createAsyncThunk('event/getSubEventCategories', async () => {
    try {
        let response = await httpService.get('subeventcategory');
        return response.data   
    } catch (error) {
        return error.message
    }
})


export const getSubEventCategory = createAsyncThunk('event/getSubEventCategory', async (id) => {
    try {
        let response = await httpService.get(`subeventcategory/${id}`);
        return response.data   
    } catch (error) {
        return error.message
    }
})

export const createSubEventCategory = createAsyncThunk('event/createSubEventCategory', async ({ name, category_id }, thunkAPI) => {
    try {
        let response = await httpService.post('subeventcategory', {
            name: name,
            category_id: category_id
        })
        return response;   
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const updateSubEventCategory = createAsyncThunk('event/updateSubEventCategory', async ( { id, name, category_id }, thunkAPI) => {
    try {
        let response = await httpService.put(`subeventcategory/${id}`, {
            name: name,
            category_id: category_id
        })
    
        return response;   
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const deleteSubEventCategory = createAsyncThunk('event/deleteSubEventCategory', async (id) => {
    try {
        let response = await httpService.delete(`subeventcategory/${id}`)
        return id;   
    } catch (error) {
        return error.message
    }
})

const eventcategorySlice = createSlice({
    name: "subeventcategory",
    initialState: {
        items: [],
        item: {},
        status: "idle",
        error: ""
    },
    reducers: {

    },

    extraReducers: {
        [getSubEventCategories.pending]: (state, action) => {

        },

        [getSubEventCategories.fulfilled]: (state, action) => {
            state.items = action.payload
        },

        [getSubEventCategories.rejected]: (state, action) => {

        },

        [getSubEventCategory.pending]: (state, action) => {

        },

        [getSubEventCategory.fulfilled]: (state, action) => {
            state.item = action.payload
        },

        [getSubEventCategory.rejected]: (state, action) => {

        },

        [createSubEventCategory.pending]: (state, action) => {

        },

        [createSubEventCategory.fulfilled]: (state, action) => {
            state.items.push(action.payload)
        },

        [createSubEventCategory.rejected]: (state, action) => {

        },

        [updateSubEventCategory.pending]: (state, action) => {

        },

        [updateSubEventCategory.fulfilled]: (state, action) => {
            // Update an event in the events array
            const { id, newData } = action.payload;
            const typeIndex = state.items.findIndex(item => item.id === id);
            if (typeIndex !== -1) {
                state.items[typeIndex] = { ...state.items[typeIndex], ...newData };
            }
        },

        [updateSubEventCategory.rejected]: (state, action) => {

        },

        [deleteSubEventCategory.pending]: (state, action) => {

        },

        [deleteSubEventCategory.fulfilled]: (state, action) => {
            // Remove an event from the events array
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
        },

        [deleteSubEventCategory.rejected]: (state, action) => {

        },
    }
})

export default eventcategorySlice.reducer