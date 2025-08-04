/**
 * HeroSection.jsx
 *
 * A prominent hero/banner section component typically used on the homepage.
 *
 * CURRENT FUNCTIONALITY:
 * - Displays a large title, subtitle, and a call-to-action button.
 * - Shows a featured image alongside the text content.
 * - Uses Bootstrap grid classes for responsive layout.
 * - Supports customization via props: title, subtitle, button text/link, image source, and alt text.
 *
 * FUTURE ENHANCEMENTS:
 * - Add support for multiple hero variants or dynamic content fetched from backend.
 * - Implement accessibility improvements.
 */

import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = ({
                         title = "NEW ARRIVAL",
                         subtitle = "Streetwear essentials. Modern fits. Built for the everyday grind.",
                         buttonText = "Shop Now",
                         buttonLink = "/shop",
                         image = '/img/tee1.jpg',
                         imageAlt = "Featured"
                     }) => (
    <section className="hero-fullvw">
        <div className="container">
            <div className="row" style={{ minHeight: "600px" }}>
                <div className="col-md-6 d-flex flex-column justify-content-center" style={{ minHeight: '600px' }}>
                    <div>
                        <h1 className="display-3 hero-title mb-3">{title}</h1>
                        <p className="lead mb-4">{subtitle}</p>
                        <Link to={buttonLink} className="btn btn-dark btn-lg">
                            {buttonText}
                        </Link>
                    </div>
                </div>

                <div className="col-md-6 d-none d-md-block"></div>
            </div>
        </div>

        <div className="hero-img-bleed">
            <img src={image} alt={imageAlt} className="hero-img-main" />
        </div>
    </section>
);

export default HeroSection;
