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
