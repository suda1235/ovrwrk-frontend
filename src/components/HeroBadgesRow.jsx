/**
 * HeroBadgesRow.jsx
 *
 * A simple component that displays a horizontal row of feature badges.
 *
 * CURRENT FUNCTIONALITY:
 * - Renders a set of badges highlighting key brand features such as material quality, origin, shipping speed, and limited releases.
 * - Each badge consists of an emoji icon and descriptive text.
 * - Uses Bootstrap and custom CSS classes for styling.
 *
 * FUTURE ENHANCEMENTS:
 * - Make badges configurable via props or fetched from backend.
 * - Add animations or interactive tooltips for enhanced user experience.
 * - Improve accessibility with ARIA labels or better semantic markup.
 *
 * IMPORTANT NOTES:
 * - The list of features is currently hardcoded within the component.
 * - Designed to be placed prominently on the homepage or landing sections.
 */

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
