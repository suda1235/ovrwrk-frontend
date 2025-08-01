import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';

function ProductListPage() {
    const { products } = useContext(ProductContext);

    return (
        <div className="container my-5">
            <h2>Shop All Products</h2>
            <div className="row">
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <div className="card h-100">
                                <img src={product.imageUrl} alt={product.name} className="card-img-top" />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="fw-bold">${product.price}</p>
                                    <Link to={`/product/${product.id}`} className="btn btn-outline-dark mt-auto">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
}

export default ProductListPage;
