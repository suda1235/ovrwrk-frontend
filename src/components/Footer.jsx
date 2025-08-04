/**
 * Footer.jsx
 *
 * Simple footer component displayed at the bottom of the page.
 *
 * CURRENT FUNCTIONALITY:
 * - Shows a copyright notice with the current year.
 * - Includes the brand name “OVRWRK Streetwear”.
 * - Styled with Bootstrap utility classes for spacing and text alignment.
 *
 * FUTURE ENHANCEMENTS:
 * - Add links to privacy policy, terms of service, social media, or contact info.
 * - Make footer dynamic to show different messages or seasonal content.
 * - Improve accessibility with landmarks or ARIA roles.
 *
 * IMPORTANT NOTES:
 * - Meant to be included site-wide, typically once per page layout.
 * - Lightweight and stateless.
 */

import React from 'react';

const Footer = () => (
    <footer className="text-center py-4 mt-5">
        <small>
            &copy; {new Date().getFullYear()} OVRWRK Streetwear &mdash; All Rights Reserved.
        </small>
    </footer>
);

export default Footer;
