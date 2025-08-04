/**
 * ProductDetailPage.jsx
 *
 * Displays detailed information about a single product including images, description, price, and available sizes.
 *
 * CURRENT FUNCTIONALITY:
 * - Fetches product data from backend API based on product ID from URL params.
 * - Shows product image, name, price, and description.
 * - Displays size options with availability status.
 * - Allows users to select a size and add the product with the selected size to the cart.
 * - Disables the Add to Cart button if the selected size is out of stock or no size is selected.
 * - Uses React Context to access cart functionality.
 *
 * FUTURE ENHANCEMENTS:
 * - Add quantity selection.
 * - Improve error handling and loading states.
 * - Enhance accessibility.
 * - Include product reviews, ratings, or related products.
 *
 * IMPORTANT NOTES:
 * - Depends on CartContext to manage adding items to cart with selected size.
 */

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const BASE_URL = import.meta.env.VITE_API_URL;

export default function ProductDetailPage() {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const sizes = Array.isArray(product?.ProductSize)
        ? product.ProductSize.map(ps => ({
            size: ps.Size?.size || '',
            stock: ps.stock ?? 0
        }))
        : [];

    const getFirstAvailable = sizesArr => {
        if (!sizesArr || !sizesArr.length) return "";
        const available = sizesArr.find(sz => sz.stock > 0);
        return available ? available.size : sizesArr[0].size;
    };

    const [selectedSize, setSelectedSize] = useState(getFirstAvailable(sizes));

    useEffect(() => {
        setSelectedSize(getFirstAvailable(sizes));
    }, [product]);

    useEffect(() => {
        fetch(`${BASE_URL}/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="container py-5">Loading...</div>;
    if (!product) return <div className="container py-5">Product not found.</div>;

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
                        onClick={() => addToCart(product, 1, selectedSize)}
                        disabled={!selected || selected.stock === 0}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
