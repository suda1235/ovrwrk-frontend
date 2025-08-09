/**
 * ProductListPage.jsx
 *
 * Displays a list of products with optional search and category filtering.
 *
 * CURRENT FUNCTIONALITY:
 * - Reads "search" and "cat" query parameters from the URL.
 * - Fetches filtered products from backend.
 * - Handles loading, error, and empty results states.
 * - Renders products in a responsive grid using ProductCard.
 *
 * FUTURE ENHANCEMENTS:
 * - Add pagination or infinite scrolling.
 * - Implement sorting and advanced filters.
 * - Improve loading state with skeletons.
 *
 * IMPORTANT NOTES:
 * - Depends on backend API supporting `search` and `cat` query params.
 * - Uses CATEGORY_ID_TO_NAME map for friendly category labels.
 */

// ProductListPage.jsx
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

export default function ProductListPage() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const searchTerm = (query.get("search") || "").toLowerCase();
    const category = query.get("cat") || "";

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all products if no filters are set
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (category) params.set("cat", category);
        if (searchTerm) params.set("search", searchTerm);

        const url = `${BASE_URL}/api/products${params.toString() ? `?${params.toString()}` : ""}`;

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error("API error");
                return res.json();
            })
            .then((data) => setProducts(Array.isArray(data) ? data : []))
            .catch((err) => {
                setError("Failed to load products. " + err.message);
                setProducts([]);
            })
            .finally(() => setLoading(false));
    }, [searchTerm, category]);

    const prettyCat = CATEGORY_ID_TO_NAME[category] || category;

    return (
        <div className="container my-5">
            <h2 className="mb-4">
                {searchTerm
                    ? `Results for "${searchTerm}"${category ? ` in ${prettyCat}` : ""}`
                    : category
                        ? prettyCat
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
                        <div
                            className="col-12 col-sm-6 col-lg-4 col-xl-3"
                            key={prod.product_id || prod.id}
                        >
                            <ProductCard prod={prod} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
