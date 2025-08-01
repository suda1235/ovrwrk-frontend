import React, { useState } from 'react';
import { CartContext } from './CartContext';

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, quantity = 1) => {
        setCartItems(prev => {
            const found = prev.find(item => item.product.id === product.id);
            if (found) {
                return prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { product, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.product.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        setCartItems(prev =>
            prev.map(item =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
