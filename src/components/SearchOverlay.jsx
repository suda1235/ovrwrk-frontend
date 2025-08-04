/**
 * SearchOverlay.jsx
 *
 * A modal overlay component that provides a full-screen search input.
 *
 * CURRENT FUNCTIONALITY:
 * - Displays a search input box when the `open` prop is true.
 * - Automatically focuses the input field when opened.
 * - Closes when button is clicked a second time
 * - The UI and interaction are fully implemented.
 *
 * FUTURE ENHANCEMENTS:
 * - Integrate search input with backend API to perform real-time product filtering.
 * - Add search suggestions or autocomplete.
 * - Enhance accessibility,
 */

import React, { useRef, useEffect, useState } from 'react';

const SearchOverlay = ({ open, onClose, onSubmit }) => {
    const inputRef = useRef(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open]);

    useEffect(() => {
        const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
        if (open) document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="search-overlay" onClick={onClose}>
            <form
                className="search-overlay-form"
                onClick={e => e.stopPropagation()}
                onSubmit={e => { e.preventDefault(); onSubmit(search); onClose(); }}
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
