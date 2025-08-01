import { createContext, useContext } from 'react';

export const CartContext = createContext({
    cartItems: [],
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {},
    clearCart: () => {},
});

export const useCart = () => useContext(CartContext);
