/**
 * ConfirmationPage.jsx
 *
 * Page component showing confirmation after a successful order.
 *
 * CURRENT FUNCTIONALITY:
 * - Reads orderId from query string.
 * - Fetches order details from backend using getOrder().
 * - Shows thank-you message and order summary (if available).
 * - Handles loading and error states.
 *
 * FUTURE ENHANCEMENTS:
 * - Add tracking links, estimated delivery date, and customer details.
 * - Support printing or downloading order summary.
 * - Restrict view to correct user once authentication is implemented.
 *
 * IMPORTANT NOTES:
 * - Depends on getOrder() API helper.
 * - Uses Bootstrap classes for layout and styling.
 */

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getOrder } from '../api/orders';
import { getProductImage } from '../utils/productImage';

function useQuery() {
    const { search } = useLocation();
    return new URLSearchParams(search);
}

export default function ConfirmationPage() {
    const navigate = useNavigate();
    const query = useQuery();
    const orderId = query.get('orderId');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [order, setOrder] = useState(null);

    useEffect(() => {
        let ok = true;
        (async () => {
            if (!orderId) {
                setError('No order ID provided.');
                setLoading(false);
                return;
            }
            try {
                const o = await getOrder(orderId);
                if (ok) setOrder(o);
            } catch (e) {
                if (ok) setError(e.message || 'Failed to fetch order.');
            } finally {
                if (ok) setLoading(false);
            }
        })();
        return () => { ok = false; };
    }, [orderId]);

    if (loading) {
        return <div className="container py-5">Loading order details...</div>;
    }

    if (error) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger">{error}</div>
                <button className="btn btn-outline-secondary" onClick={() => navigate('/shop')}>
                    Continue Shopping
                </button>
            </div>
        );
    }

    const items = order?.Cart?.CartItem || [];
    const amount = order?.amount ?? 0;

    return (
        <div className="container py-5">
            <h1>Thank you!</h1>
            <p className="mb-3">
                Order placed successfully. Your order ID is <strong>#{orderId}</strong>.
            </p>

            {items.length > 0 && (
                <div className="card mb-4">
                    <div className="card-header fw-bold">Order Summary</div>
                    <ul className="list-group list-group-flush">
                        {items.map((item) => (
                            <li
                                key={item.product_id}
                                className="list-group-item d-flex align-items-center"
                            >
                                <div
                                    style={{
                                        width: 60,
                                        height: 60,
                                        overflow: 'hidden',
                                        borderRadius: 6,
                                        marginRight: 12,
                                        background: '#f2f2f2',
                                    }}
                                >
                                    <img
                                        src={getProductImage(item.Product)}
                                        alt={item.Product?.name || 'Product'}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="flex-grow-1">
                                    <div>{item.Product?.name}</div>
                                    <div className="text-muted small">Qty: {item.quantity}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="card-footer d-flex justify-content-between fw-bold">
                        <span>Total</span>
                        <span>${Number(amount).toFixed(2)}</span>
                    </div>
                </div>
            )}

            <button
                className="btn btn-outline-secondary"
                onClick={() => navigate('/shop')}
            >
                Continue Shopping
            </button>
        </div>
    );
}
