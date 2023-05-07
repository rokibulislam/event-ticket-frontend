import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: "cart",
    initialState: [],

    reducers: {
        addCartItem: (state, action) => {
            state.push(action.payload);
        },

        removeCartItem: (state, action) => {

        },
        
        clearCart: state => {
            return [];
        }
    },
})


export const { getCartsItems, addCartItem, updateCartItem, removeCartItem, clearCart } = cartSlice.actions

export default cartSlice.reducer;