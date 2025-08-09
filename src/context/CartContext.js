/**
 * CartContext.js
 *
 * Provides a React context for managing the shopping cart state across the app.
 *
 * CURRENT FUNCTIONALITY:
 * - Defines the CartContext with default null (to be supplied by CartProvider).
 * - Exports a custom hook `useCart` for convenient access to the cart context values.
 * - Acts as the shared interface between cart state/actions and the rest of the app.
 *
 * FUTURE ENHANCEMENTS:
 * - Provide a non-null default with safe no-op functions for easier testing.
 * - Integrate with a mock or dev cart provider for storybook/demo purposes.
 *
 * IMPORTANT NOTES:
 * - Must be used with a CartProvider that supplies the actual state and handlers.
 * - Keeps cart state management centralized and avoids prop-drilling.
 */

import { createContext, useContext } from 'react';

// Central cart context object — actual values are injected by CartProvider
export const CartContext = createContext(null);

// Hook to quickly access cart context from any component
export const useCart = () => useContext(CartContext);
