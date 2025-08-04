/**
 * App.jsx
 *
 * Root component that sets up routing and common layout for the OVRWRK Streetwear frontend app.
 *
 * CURRENT FUNCTIONALITY:
 * - Uses React Router to define routes for main pages: Landing, Shop, Product Details, Cart, Checkout, Payment, Confirmation, and About.
 * - Maintains state to control visibility of a full-page search overlay.
 * - Provides handlers for toggling and submitting search queries.
 * - Includes persistent Header and Footer components rendered on every page.
 * - Handles navigation via route elements and React Router’s <Routes> and <Route>.
 *
 * FUTURE ENHANCEMENTS:
 * - Add user authentication and protected routes.
 * - Implement global state management for shared data beyond search and cart.
 * - Optimize routing with code splitting and lazy loading.
 * - Add error boundaries or fallback UI for routing errors.
 * - Improve accessibility.
 *
 * IMPORTANT NOTES:
 * - Search overlay submission currently navigates to the Shop page with query parameters.
 * - Header and Footer are always visible to provide consistent navigation and branding.
 * - All imported page components must handle their own data fetching and state.
 */
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import ProductListPage from './pages/ProductListPage.jsx';
import ProductDetailsPage from './pages/ProductDetailsPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import ConfirmationPage from './pages/ConfirmationPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import SearchOverlay from "./components/SearchOverlay.jsx";
import './App.css';

function App() {
    const [showSearch, setShowSearch] = useState(false);

    const handleSearch = (query) => {
        if (query.trim()) {
            window.location.href = `/shop?search=${encodeURIComponent(query)}`;
        }
    };

    return (
        <Router>
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
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/confirmation" element={<ConfirmationPage />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
