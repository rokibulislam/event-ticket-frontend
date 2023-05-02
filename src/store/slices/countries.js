import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/httpService'

export const getCountries = createAsyncThunk('event/getCountries', async () => {
    try {
        let response  = await httpService.get('countries');
        return response.data;  
    } catch (error) {
        return error.message
    }
})

export const getStates = createAsyncThunk('event/getStates', async (id) => {
    try {
        let response  = await httpService.get(`states/${id}`);
        return response.data;  
    } catch (error) {
        return error.message
    }
})

export const getCities = createAsyncThunk('event/getCities', async () => {
    try {
        let response  = await httpService.get('cities');
        return response.data;  
    } catch (error) {
        return error.message
    }
})

const countrySlice = createSlice({
    name: "countries",
    initialState: {
        countries: [],
        states: [],
        cities: [],
        status: "idle",
        error: ""
    },

    reducers: {

    },

    extraReducers: {
        [getCountries.pending]: (state, action) => {

        },

        [getCountries.fulfilled]: (state, action) => {
            state.countries = action.payload;
        },

        [getCountries.rejected]: (state, action) => {

        },

        [getStates.pending]: (state, action) => {

        },

        [getStates.fulfilled]: (state, action) => {
            state.states = action.payload;
        },

        [getStates.rejected]: (state, action) => {

        },

        [getCities.pending]: (state, action) => {

        },

        [getCities.fulfilled]: (state, action) => {
            state.countries = action.payload;
        },

        [getCities.rejected]: (state, action) => {

        },
    }
})

export default countrySlice.reducer