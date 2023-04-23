import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '@/services/httpService';

export const login = createAsyncThunk('users/login', async ({  email, password  }) => {

    let response  = await httpService.post('/auth/login/', {
        email: email,
        password: password
    });

    return response
})

export const register = createAsyncThunk('users/register', async ({ username, email, password  }) => {
    
    let response  = await httpService.post('/auth/register/', {
        username: username,
        email: email,
        password: password
    });

    return response;
    
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null
    },

    reducers: {
        logout: (state, action) => {
            state.user = null;
        },

        setUSER:( state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: {
        [register.pending]: (state, action) => {
            // state.loading = true;
        },
       
        [register.fulfilled]: (state, action) => {
            // state.loading = false;
            state.user = action.payload.data.user;
           // httpService.setTokenToLocalStorage(action.payload.data.token)
           // httpService.setAuthToken(action.payload.data.token)
        },
       
        [register.rejected]: (state, action) => {
            // state.loading = false;
            // state.error = action.error.message;
        },

        [login.pending]: (state, action) => {
            // state.loading = true;
        },
        [login.fulfilled]: (state, action) => {
            // state.loading = false;
            state.user = action.payload.data.user;
            httpService.setTokenToLocalStorage(action.payload.data.token);
            httpService.setAuthToken(action.payload.data.token)
        },
        [login.rejected]: (state, action) => {
            // state.loading = false;
            // state.error = action.error.message;
        },
    },
})

export const { logout, setUSER } = authSlice.actions

export default authSlice.reducer