/**
 * ProductListPage.jsx
 *
 * Displays a list of products with optional filtering by search term and category.
 *
 * CURRENT FUNCTIONALITY:
 * - Reads search and category parameters from the URL query string.
 * - Fetches filtered product data from backend API.
 * - Shows loading, error, and empty states appropriately.
 * - Renders a responsive grid of ProductCard components for each product.
 * - Supports adding products to the cart via the `onAddToCart` callback prop.
 *
 * FUTURE ENHANCEMENTS:
 * - Add pagination or infinite scrolling for large product lists.
 * - Implement advanced filtering and sorting options.
 * - Improve error handling and retry mechanisms.
 * - Enhance UI/UX with loading skeletons and accessibility improvements.
 *
 * IMPORTANT NOTES:
 * - Relies on backend API to support `search` and `cat` query parameters.
 * - Category names are mapped from IDs in `CATEGORY_ID_TO_NAME`.
 */

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const BASE_URL = import.meta.env.VITE_API_URL;

const CATEGORY_ID_TO_NAME = {
    101: "T-Shirts",
    106: "Shoes",
    107: "Sweat Shirt",
    108: "Lowers",
    109: "Jacket",
    111: "Accessories",
};

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ProductListPage = ({ onAddToCart }) => {
    const query = useQuery();
    const searchTerm = query.get("search")?.toLowerCase() || "";
    const category = query.get("cat") || "";

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        let url = `${BASE_URL}/api/products?`;
        if (category) url += `cat=${encodeURIComponent(category)}&`;
        if (searchTerm) url += `search=${encodeURIComponent(searchTerm)}&`;

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error("API error");
                return res.json();
            })
            .then((data) => {
                setProducts(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                setError("Failed to load products. " + err.message);
                setProducts([]);
            })
            .finally(() => setLoading(false));
    }, [searchTerm, category]);

    return (
        <div className="container my-5">
            <h2 className="mb-4">
                {searchTerm
                    ? `Results for "${searchTerm}"${
                        category
                            ? ` in ${CATEGORY_ID_TO_NAME[category] || category}`
                            : ""
                    }`
                    : category
                        ? CATEGORY_ID_TO_NAME[category] || category
                        : "All Products"}
            </h2>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="text-danger">{error}</div>
            ) : products.length === 0 ? (
                <div>No products found.</div>
            ) : (
                <div className="row g-4">
                    {products.map((prod) => (
                        <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={prod.product_id || prod.id}>
                            <ProductCard prod={prod} onAddToCart={onAddToCart} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductListPage;
