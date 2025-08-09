/**
 * CheckoutPage.jsx
 *
 * Final review-and-pay screen for the shopping cart.
 *
 * CURRENT FUNCTIONALITY:
 * - Reads cart items and totals from CartContext.
 * - Calculates subtotal, tax (flat 13%), and grand total.
 * - Calls createOrder() with { userId, items, amount } and navigates to the confirmation page.
 * - Clears the cart after successful order creation.
 * - Displays an error message if order creation fails or cart is empty.
 *
 * FUTURE ENHANCEMENTS:
 * - Add shipping address/contact form with validation before order placement.
 * - Replace placeholder user ID with authenticated user data.
 * - Handle shipping, promo codes, and full price breakdown.
 * - Add loading skeletons while cart data loads.
 *
 * IMPORTANT NOTES:
 * - Uses FAKE_USER_ID = 1 until authentication is implemented.
 * - Expects backend to accept items as { productId, size, quantity }.
 * - Expects amount to be sent in dollars (two decimal places), not cents.
 * - Uses getProductImage() to normalize image URLs for thumbnails.
 */

import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../api/orders";
import { getProductImage } from "../utils/productImage";

const TAX_RATE = 0.13;
const FAKE_USER_ID = 1;

function centsToDollars(cents) {
    return Number(cents || 0) / 100;
}

export default function CheckoutPage() {
    const navigate = useNavigate();
    const { cartItems, totals, clearCart } = useCart();
    const [placing, setPlacing] = useState(false);
    const [error, setError] = useState("");

    const { subtotal, tax, grandTotal } = useMemo(() => {
        const computedSubtotal =
            typeof totals?.subtotalCents === "number"
                ? centsToDollars(totals.subtotalCents)
                : cartItems.reduce(
                    (sum, i) => sum + centsToDollars(i.unitPriceCents) * i.quantity,
                    0
                );

        const sub = +computedSubtotal.toFixed(2);
        const tx = +(sub * TAX_RATE).toFixed(2);
        const total = +(sub + tx).toFixed(2);
        return { subtotal: sub, tax: tx, grandTotal: total };
    }, [cartItems, totals]);

    const handlePayNow = async () => {
        setError("");

        if (!cartItems?.length) {
            setError("Your cart is empty.");
            return;
        }

        setPlacing(true);
        try {
            const items = cartItems.map((i) => ({
                productId: i.productId,
                size: i.size,
                quantity: i.quantity,
            }));

            const order = await createOrder({
                userId: FAKE_USER_ID,
                items,
                amount: grandTotal,
            });

            const orderId = order?.order_id ?? order?.id;
            if (!orderId) throw new Error("Order created, but no orderId returned.");

            clearCart();
            navigate(`/confirmation?orderId=${orderId}`);
        } catch (e) {
            setError(e?.message || "Failed to place order");
        } finally {
            setPlacing(false);
        }
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">Checkout</h1>
                <Link to="/cart" className="btn btn-outline-secondary">
                    Back to Cart
                </Link>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row g-4">
                <div className="col-md-8">
                    {!cartItems?.length ? (
                        <div className="text-muted">Your cart is empty.</div>
                    ) : (
                        <ul className="list-group">
                            {cartItems.map((item) => {
                                const lineTotal =
                                    centsToDollars(item.unitPriceCents) * item.quantity;
                                return (
                                    <li
                                        key={item.id ?? `${item.productId}-${item.size ?? "na"}`}
                                        className="list-group-item d-flex align-items-center"
                                    >
                                        <div
                                            style={{
                                                width: 72,
                                                height: 72,
                                                overflow: "hidden",
                                                borderRadius: 6,
                                                marginRight: 16,
                                                background: "#f2f2f2",
                                            }}
                                        >
                                            <img
                                                src={getProductImage(item, {
                                                    placeholder:
                                                        "https://via.placeholder.com/400x400?text=No+Image",
                                                })}
                                                alt={item.name || "Product"}
                                                className="img-fluid"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                }}
                                                onError={(e) => {
                                                    e.currentTarget.src =
                                                        "https://via.placeholder.com/400x400?text=No+Image";
                                                }}
                                            />
                                        </div>

                                        <div className="flex-grow-1">
                                            <div className="fw-semibold">{item.name}</div>
                                            {item.size && (
                                                <div className="text-muted small">Size: {item.size}</div>
                                            )}
                                            <div className="text-muted small">Qty: {item.quantity}</div>
                                        </div>

                                        <div className="ms-3">${lineTotal.toFixed(2)}</div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5>Order Summary</h5>
                            <div className="d-flex justify-content-between">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between fw-bold">
                                <span>Total</span>
                                <span>${grandTotal.toFixed(2)}</span>
                            </div>
                            <button
                                className="btn btn-success w-100 mt-3"
                                onClick={handlePayNow}
                                disabled={placing || !cartItems?.length}
                            >
                                {placing ? "Processing..." : "Pay Now"}
                            </button>
                            <div className="form-text mt-2">
                                This will simulate a payment and complete your order.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
