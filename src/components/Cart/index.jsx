import { clearCart, removeCartItem, addCartItem } from '@/store/slices/cart';
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'


const Cart = () => {
    const dispatch = useDispatch();
    const carts = useSelector(state => state.cart);
    
    const handleAddToCart = item => {
        dispatch(addToCart(item));
    };

    const handleRemoveFromCart = item => {
        dispatch(removeCartItem(item));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div>
             <h2>Cart</h2>
            {carts.length === 0 && <p>Your cart is empty.</p>}

            {carts.map(item => (
                <div key={item.id}>
                    <p> {item.id} - Price:  {item.price} - Quantity: {item.quantity} </p> <button onClick={() => handleRemoveFromCart(item)}>-</button>
                </div>
            ))}

            { carts.length > 0 && (
                <>
                    <button onClick={handleClearCart}>Clear Cart</button>
                    <Link href={"/checkout"}> Checkout</Link>
                </>
            )}
        </div>
    )
}

export default Cart