/**
 * productImage.js
 *
 * Utility functions for normalizing and retrieving product image URLs.
 *
 * Current functionality:
 * - resolveImage: Takes any provided image source and returns a valid, loadable URL.
 *   Handles:
 *     - Empty or invalid values (falls back to placeholder).
 *     - Data URIs and Blob URLs.
 *     - Fully qualified HTTP/HTTPS URLs.
 *     - Protocol-relative URLs (e.g., //example.com/img.jpg).
 *     - Double-protocol errors (e.g., https://http://...).
 *     - Local/public asset paths (ensures leading slash).
 * - getProductImage: Attempts to find a product image from common object field names.
 *   Falls back to placeholder if none found. Can later be extended for size variants.
 *
 * Notes:
 * - Placeholder defaults to a 400x400 "No Image" placeholder if none provided.
 * - This is a defensive utility — it anticipates inconsistent API fields and formats.
 *
 * Future enhancements:
 * - Add support for thumbnail vs. full-size variants using the `thumb` flag.
 * - Integrate CDN-based resizing/cropping if backend supports it.
 * - Support webp or other optimized formats based on browser capabilities.
 */

// Normalizes whatever image field we get into a valid, loadable URL.
export function resolveImage(src, { placeholder } = {}) {
    const fallback = placeholder || 'https://via.placeholder.com/400x400?text=No+Image';
    if (!src || typeof src !== 'string') return fallback;

    let s = src.trim();

    // Already good (data URI or Blob URL)
    if (s.startsWith('data:') || s.startsWith('blob:')) return s;
    if (/^https?:\/\//i.test(s)) return s;

    // Protocol-relative -> prepend current page's protocol
    if (s.startsWith('//')) return window.location.protocol + s;

    // Guard against double protocol like 'https://http://...'
    s = s.replace(/^https?:\/\/https?:\/\//i, 'http://');

    // Ensure leading slash for public asset paths
    if (!s.startsWith('/')) s = '/' + s;

    return s;
}

export function getProductImage(obj, { placeholder, thumb = false } = {}) {
    // Try common keys — adjust if your API uses different field names
    const raw =
        obj?.imageUrl ??
        obj?.image_url ??
        obj?.image ??
        obj?.img ??
        obj?.imagePath ??
        obj?.image_path ??
        '';

    // If you ever add size-specific URLs, branch here based on `thumb`
    return resolveImage(raw, { placeholder });
}
