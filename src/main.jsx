import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ProductProvider } from './context/ProductProvider.jsx';
import { CartProvider } from './context/CartProvider.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
