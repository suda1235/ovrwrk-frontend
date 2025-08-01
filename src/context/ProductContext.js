import { createContext, useContext } from 'react';

export const ProductContext = createContext({
    products: [],
});

export const useProducts = () => useContext(ProductContext);
