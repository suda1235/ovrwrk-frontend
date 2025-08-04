/**
 * ProductCard.jsx
 *
 * Component representing an individual product card used in product listing pages.
 *
 * CURRENT FUNCTIONALITY:
 * - Displays product image, name, price, category, and total stock.
 * - Shows a "Quick Add" overlay on hover with size selection buttons.
 * - Allows users to select a size and add the product with the selected size to the cart.
 * - Navigates to product detail page on card click (excluding clicks on Quick Add buttons).
 * - Uses React Router's useNavigate for client-side navigation.
 * - Manages hover and selected size states locally.
 *
 * FUTURE ENHANCEMENTS:
 * - Add loading placeholders for images.
 * - Improve accessibility.
 * - Enhance Quick Add with quantity selection.
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function getFirstAvailable(sizes) {
    if (!sizes || !sizes.length) return "";
    const available = sizes.find(sz => sz.stock > 0);
    return available ? available.size : sizes[0].size;
}

function totalStock(sizes) {
    if (!Array.isArray(sizes)) return 0;
    return sizes.reduce((sum, sz) => sz.stock > 0 ? sum + sz.stock : sum, 0);
}

const ProductCard = ({ prod, onAddToCart }) => {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);

    const sizes = Array.isArray(prod.ProductSize)
        ? prod.ProductSize.map(ps => ({
            size: ps.Size?.size || '',
            stock: ps.stock ?? 0
        }))
        : [];

    const [selectedSize, setSelectedSize] = useState(() => getFirstAvailable(sizes));

    useEffect(() => {
        setSelectedSize(getFirstAvailable(sizes));
    }, [prod.product_id]);

    const handleAdd = (e) => {
        e.stopPropagation();
        if (onAddToCart && selectedSize) {
            onAddToCart(prod, 1, selectedSize);
            console.log("Add to Bag clicked, product:", prod.name, "size:", selectedSize);
        }
    };

    const handleSizeClick = (size, stock, e) => {
        e.stopPropagation();
        if (stock > 0) {
            setSelectedSize(size);
            console.log("Selected size changed to:", size);
        }
    };

    const handleCardClick = (e) => {
        if (e.target.closest(".card-quickadd")) return;
        navigate(`/product/${prod.product_id || prod.id}`);
    };

    const inStock = totalStock(sizes);

    return (
        <div
            className={`modern-card ${hovered ? "modern-card-hover" : ""}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            tabIndex={0}
            onClick={handleCardClick}
            style={{ cursor: "pointer" }}
        >
            <div className="modern-card-img-wrap">
                <img
                    src={prod.imageUrl || 'https://via.placeholder.com/400x400?text=No+Image'}
                    alt={prod.name}
                    className="modern-card-img"
                />

                {hovered && sizes.length > 0 && (
                    <div className="card-quickadd">
                        <div className="quickadd-label">Quick Add</div>
                        <div className="quickadd-sizes">
                            {sizes.map(({ size, stock }) => (
                                <button
                                    key={size}
                                    className={
                                        `btn btn-outline-secondary me-2 mb-2 quickadd-size-btn` +
                                        (selectedSize === size ? " active" : "") +
                                        (stock === 0 ? " disabled" : "")
                                    }
                                    type="button"
                                    onClick={e => handleSizeClick(size, stock, e)}
                                    disabled={stock === 0}
                                    style={{
                                        minWidth: 48,
                                        fontWeight: selectedSize === size ? "bold" : "normal"
                                    }}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        <button
                            className="quickadd-cart-btn btn btn-primary mt-2"
                            onClick={handleAdd}
                            type="button"
                            disabled={sizes.find(sz => sz.size === selectedSize)?.stock === 0}
                        >
                            Add to Bag
                        </button>
                    </div>
                )}
            </div>

            <div className="modern-card-info">
                <div className="modern-card-title">{prod.name}</div>
                <div className="modern-card-price">${prod.price.toFixed(2)}</div>
                <div className="modern-card-cat">
                    {prod.Category?.name || ""}
                </div>
                <div className="modern-card-stock">
                    {inStock > 0 ? `${inStock} in stock` : "Out of stock"}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
