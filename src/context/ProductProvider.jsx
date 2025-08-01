import React from 'react';
import { ProductContext } from './ProductContext';
import products from '../data/Products';

export const ProductProvider = ({ children }) => (
    <ProductContext.Provider value={{ products }}>
        {children}
    </ProductContext.Provider>
);
