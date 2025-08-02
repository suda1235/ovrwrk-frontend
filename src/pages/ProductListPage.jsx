import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import productsData from "../data/products.js";
import ProductCard from "../components/ProductCard";

const USE_API = false; // Set true when ready for backend

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ProductListPage = ({ onAddToCart }) => {
    const query = useQuery();
    const searchTerm = query.get("search")?.toLowerCase() || "";
    const category = query.get("cat")?.toLowerCase() || "";

    const [products, setProducts] = useState(USE_API ? [] : productsData);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!USE_API) return;
        setLoading(true);
        let url = "/api/products?";
        if (category) url += `cat=${encodeURIComponent(category)}&`;
        if (searchTerm) url += `search=${encodeURIComponent(searchTerm)}&`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch(() => setProducts([]))
            .finally(() => setLoading(false));
    }, [searchTerm, category]);

    let filtered = products;
    if (!USE_API) {
        if (category) {
            filtered = filtered.filter(
                (prod) =>
                    prod.categories &&
                    prod.categories.map((c) => c.toLowerCase()).includes(category)
            );
        }
        if (searchTerm) {
            filtered = filtered.filter(
                (prod) =>
                    prod.name.toLowerCase().includes(searchTerm) ||
                    prod.description.toLowerCase().includes(searchTerm)
            );
        }
    }

    return (
        <div className="container my-5">
            <h2 className="mb-4">
                {searchTerm
                    ? `Results for "${searchTerm}"${category ? ` in ${category}` : ""}`
                    : category
                        ? `${category.charAt(0).toUpperCase() + category.slice(1)}`
                        : "All Products"}
            </h2>
            {loading ? (
                <div>Loading...</div>
            ) : filtered.length === 0 ? (
                <div>No products found.</div>
            ) : (
                <div className="row g-4">
                    {filtered.map((prod) => (
                        <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={prod.id}>
                            <ProductCard prod={prod} onAddToCart={onAddToCart} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductListPage;
