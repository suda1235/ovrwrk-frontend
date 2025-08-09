/**
 * SearchOverlay.jsx
 *
 * A modal overlay component that provides a full-screen search input.
 *
 * CURRENT FUNCTIONALITY:
 * - Displays a search input box when the `open` prop is true.
 * - Automatically focuses the input field when opened.
 * - Closes when clicking outside the input or pressing the Escape key.
 * - Calls `onSubmit` with the entered search term, then closes.
 *
 * FUTURE ENHANCEMENTS:
 * - Integrate with backend API for live search results.
 * - Add search suggestions or autocomplete dropdown.
 * - Improve accessibility (ARIA attributes, focus trapping).
 *
 * IMPORTANT NOTES:
 * - The click handler on the outer div closes the overlay unless the click is on the form.
 * - `onSubmit` should handle empty search terms if needed.
 */

import React, { useRef, useEffect, useState } from 'react';

const SearchOverlay = ({ open, onClose, onSubmit }) => {
    const inputRef = useRef(null);
    const [search, setSearch] = useState('');

    // Focus the input when overlay is opened
    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open]);

    // Close overlay on Escape key press
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        if (open) document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="search-overlay" onClick={onClose}>
            <form
                className="search-overlay-form"
                onClick={e => e.stopPropagation()} // prevent closing when clicking inside form
                onSubmit={e => {
                    e.preventDefault();
                    onSubmit(search);
                    onClose();
                }}
            >
                <input
                    ref={inputRef}
                    type="text"
                    className="form-control"
                    placeholder="Search products..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </form>
        </div>
    );
};

export default SearchOverlay;
