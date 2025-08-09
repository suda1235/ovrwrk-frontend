/**
 * CartItem.jsx
 *
 * Component representing a single item in the shopping cart.
 *
 * CURRENT FUNCTIONALITY:
 * - Displays product image, name, size (if applicable), quantity, and total price.
 * - Shows unit price.
 * - Allows updating quantity via a number input.
 * - Provides a remove button to delete the item from the cart.
 *
 * FUTURE ENHANCEMENTS:
 * - Improve accessibility (keyboard and ARIA attributes).
 * - Add responsive styling for smaller screens.
 * - Show stock warnings or limit quantity if stock is low.
 *
 * IMPORTANT NOTES:
 * - Designed to be used inside CartPage.
 * - Expects `item` prop with at least: id, name, size, quantity, unitPriceCents.
 * - Relies on `onQty` and `onRemove` callback props for cart manipulation.
 */

import React from 'react';
import { getProductImage } from '../utils/productImage';

export default function CartItem({ item, onQty, onRemove }) {
    const total = ((item.unitPriceCents * item.quantity) / 100).toFixed(2);
    const unit = (item.unitPriceCents / 100).toFixed(2);

    // Ensure a valid image URL, falling back to a placeholder
    const img = getProductImage(item, {
        placeholder: 'https://via.placeholder.com/64?text=No+Img',
        thumb: true
    });

    return (
        <div className="d-flex align-items-center gap-3 border-bottom py-3">
            <img
                src={img}
                alt={item.name}
                width={64}
                height={64}
                onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/64?text=No+Img';
                }}
                style={{ objectFit: 'cover', borderRadius: 8 }}
            />
            <div className="flex-grow-1">
                <div className="fw-semibold">
                    {item.name} {item.size ? `· ${item.size}` : ''}
                </div>
                <div className="text-muted small">${unit} each</div>
                <div className="d-flex align-items-center gap-2 mt-2">
                    <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={e => onQty(item.id, e.target.value)}
                        className="form-control"
                        style={{ width: 80 }}
                    />
                    <button
                        className="btn btn-link text-danger"
                        onClick={() => onRemove(item.id)}
                    >
                        Remove
                    </button>
                </div>
            </div>
            <div className="fw-semibold">${total}</div>
        </div>
    );
}


