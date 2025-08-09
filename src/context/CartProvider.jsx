/**
 * CartProvider.jsx
 *
 * React context provider responsible for managing shopping cart state
 * and exposing cart-related actions to the rest of the app.
 *
 * CURRENT FUNCTIONALITY:
 * - Initializes cart state from localStorage (with migration for older carts).
 * - Persists cart state to localStorage on changes.
 * - Provides actions to add, update, remove, and clear cart items.
 * - Calculates subtotal in cents to avoid floating-point rounding issues.
 * - Generates a checkout payload formatted for the backend /api/orders endpoint.
 *
 * FUTURE ENHANCEMENTS:
 * - Add discounts, tax, and shipping calculations.
 * - Sync cart with backend for authenticated users.
 * - Improve migration handling for legacy stored carts.
 *
 * IMPORTANT NOTES:
 * - Uses product_id + size as the unique cart line key.
 * - Always stores an image via getProductImage() to avoid broken thumbnails.
 * - Works with CartContext so any component can access cart state/actions.
 */

import React, { useEffect, useMemo, useState } from 'react';
import { CartContext } from './CartContext';
import { getProductImage } from '../utils/productImage';

const LS_KEY = 'ovrwrk_cart_v1';

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem(LS_KEY)) || [];
        } catch {
            return [];
        }
    });

    // Migration: ensure productId exists for all items (legacy carts may lack it)
    useEffect(() => {
        setCartItems(prev =>
            prev.map(item => ({
                ...item,
                productId: item.productId ?? parseInt(item.id?.split(':')[0], 10)
            }))
        );
    }, []);

    // Persist cart in localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    // Add a product to the cart
    const addToCart = (product, opts = { quantity: 1, size: null }) => {
        const { quantity = 1, size = null } = opts;

        // Unique ID for cart line: productId + size
        const id = `${product.product_id}:${size || ''}`;

        // Store price in cents to avoid float math issues
        const unitPriceCents = Math.round(Number(product.price || 0) * 100);

        // Ensure image is always set
        const imageUrl = getProductImage(product, {
            placeholder: 'https://via.placeholder.com/400x400?text=No+Image'
        });

        const productId = product.product_id;

        setCartItems(prev => {
            const existing = prev.find(i => i.id === id);
            if (existing) {
                return prev.map(i =>
                    i.id === id
                        ? { ...i, quantity: i.quantity + quantity }
                        : i
                );
            }
            return [
                ...prev,
                { id, productId, name: product.name, imageUrl, size, quantity, unitPriceCents }
            ];
        });
    };

    // Update quantity for a specific cart line
    const updateQuantity = (id, quantity) =>
        setCartItems(prev =>
            prev.map(i =>
                i.id === id
                    ? { ...i, quantity: Math.max(1, Number(quantity) || 1) }
                    : i
            )
        );

    // Remove a cart line
    const removeFromCart = (id) =>
        setCartItems(prev => prev.filter(i => i.id !== id));

    // Clear the entire cart
    const clearCart = () => setCartItems([]);

    // Calculate totals (currently subtotal only)
    const totals = useMemo(() => {
        const subtotalCents = cartItems.reduce(
            (s, i) => s + i.unitPriceCents * i.quantity,
            0
        );
        return { subtotalCents };
    }, [cartItems]);

    // Build payload for backend /api/orders
    const getCheckoutPayload = (userId) => ({
        userId,
        amount: totals.subtotalCents / 100,
        items: cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            size: item.size
        }))
    });

    return (
        <CartContext.Provider
            value={{
                cartItems,
                totals,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                getCheckoutPayload
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
