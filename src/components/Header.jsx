import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Header = () => {
    const { cartItems } = useContext(CartContext);
    const location = useLocation();
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 border-bottom border-1 border-secondary" style={{ overflow: 'visible', minHeight: '48px' }}>
            <Link
                className="navbar-brand d-flex align-items-center"
                to="/"
                style={{
                    height: "48px",
                    overflow: "visible",
                    paddingTop: 0,
                    paddingBottom: 0,
                }}
            >
                <img
                    src="/logo.png"
                    alt="OVRWRK Logo"
                    height="128"
                    style={{
                        marginTop: "-40px",
                        marginBottom: "-40px",
                        marginRight: "0.65em",
                        display: "block"
                    }}
                />
            </Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className={`nav-link${location.pathname === '/shop' ? ' active' : ''}`} to="/shop">
                            Shop
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link${location.pathname === '/about' ? ' active' : ''}`} to="/about">
                            About
                        </Link>
                    </li>
                </ul>
                <Link to="/cart" className="btn btn-outline-dark position-relative">
                    <i className="bi bi-bag text-dark" style={{ fontSize: "1.2em", marginRight: "0.5em" }}></i>
                    Cart
                    {cartCount > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                            {cartCount}
                        </span>
                    )}
                </Link>
            </div>
        </nav>
    );
};

export default Header;
