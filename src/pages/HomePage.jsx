
import { HeaderComponent } from '../components/HeaderComponent';
import { useState } from 'react';
import { useEffect } from 'react';
import { formatMoney } from '../utils/money.js';
import axios from 'axios';
import './HomePage.css';
// import { products } from '../../starting-code/data/products.js'


export function HomePage({ cart }) {
    const [products, setProductsData] = useState([]);


    useEffect(() => {
        axios.get('/api/products')
            .then((response) => {
                setProductsData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });

    }, []);


    return (
        <>
            <title>Home</title>
            <HeaderComponent cart={cart} />

            <div className="home-page">
                <div className="products-grid">
                    {products.map((product) => {
                        return (
                            <div className="product-container" key={product.id}>
                                <div className="product-image-container">
                                    <img className="product-image"
                                        src={product.image} />
                                </div>

                                <div className="product-name limit-text-to-2-lines">
                                    {product.name}
                                </div>

                                <div className="product-rating-container">
                                    <img className="product-rating-stars"
                                        src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
                                    <div className="product-rating-count link-primary">
                                        {product.rating.count}
                                    </div>
                                </div>

                                <div className="product-price">
                                    {formatMoney(product.priceCents)}
                                </div>

                                <div className="product-quantity-container">
                                    <select>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>

                                <div className="product-spacer"></div>

                                <div className="added-to-cart">
                                    <img src="images/icons/checkmark.png" />
                                    Added
                                </div>

                                <button className="add-to-cart-button button-primary">
                                    Add to Cart
                                </button>
                            </div>
                        );
                    })}


                </div>
            </div>
        </>
    );
}