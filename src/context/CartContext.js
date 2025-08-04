/**
 * CartContext.js
 *
 * Provides a React context for managing the shopping cart state across the app.
 *
 * CURRENT FUNCTIONALITY:
 * - Defines the CartContext with default empty state and no-op functions.
 * - Exports a custom hook `useCart` for convenient access to cart context values.
 * - Acts as a centralized store for cart data and actions.
 *
 * FUTURE ENHANCEMENTS:
 * - Expand default values with meaningful initial state or persistence.
 * - Integrate middleware (e.g., syncing with localStorage or backend).
 *
 * IMPORTANT NOTES:
 * - Must be used together with a CartProvider component that supplies actual state and handlers.
 * - Ensures consistent access to cart data and modification functions throughout the component tree.
 */

import { createContext, useContext } from 'react';

export const CartContext = createContext({
    cartItems: [],
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {},
    clearCart: () => {},
});

export const useCart = () => useContext(CartContext);
