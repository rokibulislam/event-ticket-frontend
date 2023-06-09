import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '@/services/httpService';

export const login = createAsyncThunk('users/login', async ({  email, password  },thunkAPI) => { 
    try {
        let response  = await httpService.post('/auth/login/', {
            email: email,
            password: password
        });

        httpService.setTokenToLocalStorage(response.data.token);
        httpService.setAuthToken(response.data.token) 
        return response.data
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }   
})

export const register = createAsyncThunk('users/register', async ({ username, email, password  }, thunkAPI) => {
    try {
        let response  = await httpService.post('/auth/register/', {
            name: username,
            email: email,
            password: password
        });
        console.log(response);
        return response.data;

    } catch(error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        // roles: [],
        // permissions: [],
        loading: false,
        error: null
    },

    reducers: {
        logout: (state, action) => {
            state.user = null;
            state.loading = false;
            state.error = null;
        },

        setUSER:( state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: {
        [register.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
       
        [register.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.error = "register suceesfully";
        },
       
        [register.rejected]: (state, action) => {
            state.loading = false;
            state.error = action?.payload?.error ?? 'Failed to register';
        },

        [login.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            // state.roles = action.payload.roles;
            // state.permissions = action.payload.permissions;
            state.error = "login successfully";
        },
        [login.rejected]: (state, action) => {
            state.user = null;
            state.loading = false;
            state.error = action.payload.error ? action.payload.error : 'Failed to login';
        },
    },
})

export const { logout, setUSER } = authSlice.actions

export default authSlice.reducer