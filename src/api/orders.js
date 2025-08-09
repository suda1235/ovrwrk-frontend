/**
 * orders.js
 *
 * API helper functions for interacting with backend order endpoints.
 *
 * CURRENT FUNCTIONALITY:
 * - createOrder: Sends POST request to create a new order with userId, items, and amount.
 * - getOrder: Fetches an existing order by its ID.
 * - Throws errors if the server responds with a non-OK status.
 *
 * FUTURE ENHANCEMENTS:
 * - Add authentication headers when backend requires secure endpoints.
 * - Improve error handling with more descriptive messages from server.
 * - Implement retry logic or better offline handling.
 *
 * IMPORTANT NOTES:
 * - Uses VITE_API_URL environment variable as API base.
 * - Functions are async and return parsed JSON responses.
 */

const API_BASE = import.meta.env.VITE_API_URL;

export async function createOrder({ userId, items, amount }) {
    const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, items, amount }),
    });
    if (!res.ok) throw new Error(`Create order failed: ${res.status}`);
    return res.json();
}

export async function getOrder(orderId) {
    const res = await fetch(`${API_BASE}/api/orders/${orderId}`);
    if (!res.ok) throw new Error(`Fetch order failed: ${res.status}`);
    return res.json();
}
