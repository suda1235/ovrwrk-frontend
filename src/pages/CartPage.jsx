/**
 * CartPage.jsx
 *
 * Page component displaying the user's shopping cart.
 *
 * CURRENT FUNCTIONALITY:
 * - Renders a list of items in the cart using CartItem component.
 * - Shows subtotal and a note about taxes/shipping.
 * - Allows clearing the cart or proceeding to checkout.
 * - Displays an empty-cart message with a link back to the shop.
 *
 * FUTURE ENHANCEMENTS:
 * - Add per-item discount display or promotions.
 * - Integrate with backend for persistent cart sync.
 * - Show estimated tax and shipping costs.
 *
 * IMPORTANT NOTES:
 * - Relies on useCart() from CartContext for state and actions.
 * - Subtotal is calculated in cents to avoid floating-point issues.
 */

import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { Link, useNavigate } from 'react-router-dom';

export default function CartPage() {
    const { cartItems, totals, updateQuantity, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();
    const empty = cartItems.length === 0;

    return (
        <div className="container my-5">
            <h2 className="mb-4">Your Cart</h2>

            {empty ? (
                <div className="alert alert-light">
                    Your cart is empty. <Link to="/shop">Continue shopping →</Link>
                </div>
            ) : (
                <>
                    {cartItems.map(item => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onQty={updateQuantity}
                            onRemove={removeFromCart}
                        />
                    ))}

                    <div className="d-flex justify-content-end mt-3">
                        <div style={{ minWidth: 280 }}>
                            <div className="d-flex justify-content-between">
                                <span className="fw-semibold">Subtotal</span>
                                <span className="fw-bold">${(totals.subtotalCents / 100).toFixed(2)}</span>
                            </div>
                            <div className="text-muted small">
                                Taxes and shipping calculated at checkout.
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button
                                    className="btn btn-dark"
                                    onClick={() => navigate('/checkout')}
                                >
                                    Checkout
                                </button>
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={clearCart}
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
