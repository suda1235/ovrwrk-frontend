/**
 * App.jsx
 *
 * Main application entry point and router configuration.
 *
 * CURRENT FUNCTIONALITY:
 * - Wraps the app in CartProvider for global cart state.
 * - Configures routing for all main pages using react-router-dom.
 * - Displays Header and Footer on all pages.
 * - Integrates SearchOverlay for global product search.
 *
 * FUTURE ENHANCEMENTS:
 * - Add protected routes for account or admin pages.
 * - Implement lazy-loading for route-based code splitting.
 * - Include global error handling or 404/500 pages.
 *
 * IMPORTANT NOTES:
 * - SearchOverlay triggers navigation to /shop with `search` query param.
 * - CartProvider must wrap Router so all routes have cart access.
 */

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import CartProvider from './context/CartProvider.jsx';

import LandingPage from './pages/LandingPage.jsx';
import ProductListPage from './pages/ProductListPage.jsx';
import ProductDetailsPage from './pages/ProductDetailsPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import ConfirmationPage from './pages/ConfirmationPage.jsx';
import AboutPage from './pages/AboutPage.jsx';

import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import SearchOverlay from "./components/SearchOverlay.jsx";

import './App.css';

function AppInner() {
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (query) => {
        const q = query.trim();
        navigate(q ? `/shop?search=${encodeURIComponent(q)}` : '/shop');
    };

    return (
        <>
            <Header
                showSearch={showSearch}
                onSearchClick={() => setShowSearch(prev => !prev)}
            />

            <SearchOverlay
                open={showSearch}
                onClose={() => setShowSearch(false)}
                onSubmit={handleSearch}
            />

            <main className="flex-shrink-0">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/shop" element={<ProductListPage />} />
                    <Route path="/product/:id" element={<ProductDetailsPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/confirmation" element={<ConfirmationPage />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </main>

            <Footer />
        </>
    );
}

export default function App() {
    return (
        <CartProvider>
            <Router>
                <AppInner />
            </Router>
        </CartProvider>
    );
}
