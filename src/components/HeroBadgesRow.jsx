import React from 'react';

const features = [
    { icon: "🧵", text: "Premium Materials" },
    { icon: "🇨🇦", text: "Made in Canada" },
    { icon: "⚡", text: "Fast Shipping" },
    { icon: "🔒", text: "Limited Drops" }
];

const HeroBadgesRow = () => (
    <div className="hero-badges-row bg-light border-top border-1 border-secondary">
        {features.map((f, i) => (
            <div className="feature-badge" key={i}>
                <span className="icon">{f.icon}</span>
                <span>{f.text}</span>
            </div>
        ))}
    </div>
);

export default HeroBadgesRow;
