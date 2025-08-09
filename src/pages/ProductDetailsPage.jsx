/**
 * ProductDetailPage.jsx
 *
 * Displays detailed information for a single product and allows adding it to the cart.
 *
 * CURRENT FUNCTIONALITY:
 * - Fetches product data from backend using the product ID from URL params.
 * - Displays product image, name, price, description, and available sizes.
 * - Preselects the first available size.
 * - Allows selecting a size and adding to cart (disabled if out of stock).
 *
 * FUTURE ENHANCEMENTS:
 * - Add quantity selection.
 * - Improve error/loading states with skeletons or better messaging.
 * - Include product reviews, ratings, and related products.
 * - Enhance accessibility for keyboard navigation.
 *
 * IMPORTANT NOTES:
 * - Depends on CartContext for adding to cart.
 * - Uses getFirstAvailable() to improve UX when loading product sizes.
 */

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const BASE_URL = import.meta.env.VITE_API_URL;

function getFirstAvailable(sizesArr) {
    if (!sizesArr || !sizesArr.length) return "";
    const available = sizesArr.find(sz => sz.stock > 0);
    return available ? available.size : sizesArr[0].size;
}

export default function ProductDetailPage() {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/products/${id}`);
                const data = await res.json();
                setProduct(data);

                if (Array.isArray(data?.ProductSize)) {
                    const sizeList = data.ProductSize.map(ps => ({
                        size: ps.Size?.size || "",
                        stock: ps.stock ?? 0
                    }));
                    setSelectedSize(getFirstAvailable(sizeList));
                }
            } catch (err) {
                console.error("Failed to load product:", err);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    if (loading) return <div className="container py-5">Loading...</div>;
    if (!product) return <div className="container py-5">Product not found.</div>;

    const sizes = Array.isArray(product.ProductSize)
        ? product.ProductSize.map(ps => ({
            size: ps.Size?.size || "",
            stock: ps.stock ?? 0
        }))
        : [];

    const selected = sizes.find(sz => sz.size === selectedSize);

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={product.imageUrl || 'https://via.placeholder.com/500x500?text=No+Image'}
                        alt={product.name}
                        className="img-fluid rounded shadow"
                    />
                </div>
                <div className="col-md-6">
                    <h1>{product.name}</h1>
                    <p className="lead">${Number(product.price).toFixed(2)}</p>
                    <p>{product.description}</p>

                    {sizes.length > 0 && (
                        <div className="mb-3">
                            <strong>Available Sizes:</strong>
                            <div>
                                {sizes.map(sz => (
                                    <button
                                        key={sz.size}
                                        className={`btn btn-outline-secondary me-2 mb-2 quickadd-size-btn${selectedSize === sz.size ? " selected active" : ""}`}
                                        onClick={() => setSelectedSize(sz.size)}
                                        disabled={sz.stock === 0}
                                        style={{ minWidth: 48 }}
                                    >
                                        {sz.size}
                                        {sz.stock === 0 && <span className="text-danger ms-1">(Out)</span>}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        className="btn btn-dark mt-3"
                        onClick={() => {
                            if (selectedSize) {
                                addToCart(product, { size: selectedSize, quantity: 1 });
                            }
                        }}
                        disabled={!selected || selected.stock === 0}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
