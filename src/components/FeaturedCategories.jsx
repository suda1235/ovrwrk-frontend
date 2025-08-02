import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedCategoriesSection = ({ categories }) => (
    <section className="featured-categories-section py-4">
        <div className="container-fluid">
            <div className="row gx-4 gy-4">
                {categories.map((cat, idx) => (
                    <div className="col-12 col-md-4" key={idx}>
                        <Link to={cat.link} className="category-card-link">
                            <div className="category-card">
                                <img src={cat.img} alt={cat.title} className="category-card-img" />
                                <div className="category-card-overlay">
                                    <h3>{cat.title}</h3>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default FeaturedCategoriesSection;
