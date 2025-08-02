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
    const sizes = Array.isArray(prod.sizes) ? prod.sizes : [];
    const [selectedSize, setSelectedSize] = useState(getFirstAvailable(sizes));

    useEffect(() => {
        setSelectedSize(getFirstAvailable(sizes));
    }, [prod, sizes]);


    const handleAdd = (e) => {
        e.stopPropagation();
        if (onAddToCart && selectedSize) onAddToCart(prod, selectedSize);
    };


    const handleCardClick = (e) => {
        if (e.target.closest(".card-quickadd")) return;
        navigate(`/product/${prod.id}`);
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
                <img src={prod.image} alt={prod.name} className="modern-card-img" />

                {hovered && sizes.length > 0 && (
                    <div className="card-quickadd">
                        <div className="quickadd-label">Quick Add</div>
                        <div className="quickadd-sizes">
                            {sizes.map(({ size, stock }) => (
                                <button
                                    key={size}
                                    className={`quickadd-size-btn${stock === 0 ? " disabled" : ""}${selectedSize === size ? " selected" : ""}`}
                                    type="button"
                                    onClick={e => {
                                        e.stopPropagation();
                                        if (stock > 0) setSelectedSize(size);
                                    }}
                                    disabled={stock === 0}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        <button
                            className="quickadd-cart-btn"
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
                <div className="modern-card-cat">{prod.categories.join(", ")}</div>
                <div className="modern-card-stock">
                    {inStock > 0 ? `${inStock} in stock` : "Out of stock"}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
