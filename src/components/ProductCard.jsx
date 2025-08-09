/**
 * ProductCard.jsx
 *
 * Component representing an individual product card for use on product listing pages.
 *
 * CURRENT FUNCTIONALITY:
 * - Displays product image, name, price, category, and total stock.
 * - Shows a "Quick Add" overlay on hover with available size buttons.
 * - Allows selecting a size and adding the product directly to the cart.
 * - Navigates to the product detail page when the card is clicked
 *   (excluding clicks on Quick Add UI elements).
 * - Uses React Router's useNavigate for client-side navigation.
 *
 * FUTURE ENHANCEMENTS:
 * - Add image loading placeholders or skeleton loaders.
 * - Improve keyboard accessibility and focus states.
 * - Enhance Quick Add with quantity selection.
 * - Support wishlists or “save for later” actions.
 *
 * IMPORTANT NOTES:
 * - Relies on CartContext for adding items to the cart.
 * - getFirstAvailable() pre-selects the first in-stock size for faster Quick Add.
 * - totalStock() sums stock counts across all size variants.
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getProductImage } from "../utils/productImage";

// Returns the first available size, preferring one with stock > 0
function getFirstAvailable(sizes) {
    if (!sizes || !sizes.length) return "";
    const available = sizes.find(sz => sz.stock > 0);
    return available ? available.size : sizes[0].size;
}

// Calculates total stock across all size variants
function totalStock(sizes) {
    if (!Array.isArray(sizes)) return 0;
    return sizes.reduce((sum, sz) => (sz.stock > 0 ? sum + sz.stock : sum), 0);
}

const ProductCard = ({ prod }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [hovered, setHovered] = useState(false);

    const sizes = Array.isArray(prod.ProductSize)
        ? prod.ProductSize.map(ps => ({
            size: ps.Size?.size || "",
            stock: ps.stock ?? 0
        }))
        : [];

    const [selectedSize, setSelectedSize] = useState(() => getFirstAvailable(sizes));

    // Reset selected size when product changes
    useEffect(() => {
        setSelectedSize(getFirstAvailable(sizes));
    }, [prod.product_id, prod.ProductSize]);

    // Add selected size to cart
    const handleAdd = (e) => {
        e.stopPropagation();
        if (!selectedSize) return;
        addToCart(prod, { size: selectedSize, quantity: 1 });
    };

    // Change selected size on button click
    const handleSizeClick = (size, stock, e) => {
        e.stopPropagation();
        if (stock > 0) setSelectedSize(size);
    };

    // Navigate to product detail page unless clicking Quick Add
    const handleCardClick = (e) => {
        if (e.target.closest(".card-quickadd")) return;
        navigate(`/product/${prod.product_id || prod.id}`);
    };

    const inStock = totalStock(sizes);
    const imgSrc = getProductImage(prod) || "https://via.placeholder.com/400x400?text=No+Image";

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
                    src={imgSrc}
                    alt={prod.name}
                    className="modern-card-img"
                    loading="lazy"
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
                                    onClick={(e) => handleSizeClick(size, stock, e)}
                                    disabled={stock === 0}
                                    style={{
                                        minWidth: 48,
                                        fontWeight: selectedSize === size ? "bold" : "normal",
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
                            disabled={!selectedSize || sizes.find((sz) => sz.size === selectedSize)?.stock === 0}
                        >
                            Add to Bag
                        </button>
                    </div>
                )}
            </div>

            <div className="modern-card-info">
                <div className="modern-card-title">{prod.name}</div>
                <div className="modern-card-price">${Number(prod.price).toFixed(2)}</div>
                <div className="modern-card-cat">{prod.Category?.name || ""}</div>
                <div className="modern-card-stock">
                    {inStock > 0 ? `${inStock} in stock` : "Out of stock"}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
