/**
 * AboutPage.jsx
 *
 * Static informational page about the OVRWRK Streetwear brand.
 *
 * CURRENT FUNCTIONALITY:
 * - Displays a brief description of the brand’s philosophy and target audience.
 * - Uses Bootstrap container and spacing classes for layout.
 *
 * FUTURE ENHANCEMENTS:
 * - Add more detailed content such as brand history, mission, team bios.
 * - Include images, videos, or customer testimonials to enrich the page.
 * - Improve SEO with metadata and semantic HTML elements.
 * - Enhance accessibility and responsive design.
 *
 * IMPORTANT NOTES:
 * - A simple, mostly static page meant for informational purposes.
 */

import React from 'react';

function AboutPage() {
    return (
        <div className="container my-5">
            <h2>About OVRWRK</h2>
            <p>
                OVRWRK Streetwear is a modern clothing brand blending comfort, durability, and street style.
                Designed for creators, makers, and everyday grinders.
            </p>

        </div>
    );
}

export default AboutPage;
