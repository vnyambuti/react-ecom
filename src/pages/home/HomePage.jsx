
import { HeaderComponent } from '../../components/HeaderComponent.jsx';
import { useState } from 'react';
import { useEffect } from 'react';
import { ProductPage } from './product.jsx';
import axios from 'axios';
import './HomePage.css';
// import { products } from '../../starting-code/data/products.js'


export function HomePage({ cart }) {
    const [products, setProductsData] = useState([]);


    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProductsData(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        getProducts();

    }, []);


    return (
        <>
            <title>Home</title>
            <HeaderComponent cart={cart} />

            <div className="home-page">
                <ProductPage products={products} />
            </div>
        </>
    );
}