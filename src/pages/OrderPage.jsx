import { HeaderComponent } from "../components/HeaderComponent";
import { useState, useEffect, Fragment } from "react";
import days from "dayjs";
import { formatMoney } from "../utils/money.js";
import axios from "axios";
import './OrderPage.css';
// import { Link } from "react-router";

export function OrderPage({ cart }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('/api/orders?expand=products')
            .then((response) => {
                setOrders(response.data);

            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
            });
    }, []);

    return (
        <>
            <title>Orders</title>
            <HeaderComponent cart={cart} />
            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <div className="orders-grid">
                    {orders.map((orders) => {
                        return (
                            <div key={orders.id} className="order-container">

                                <div className="order-header">
                                    <div className="order-header-left-section">
                                        <div className="order-date">
                                            <div className="order-header-label">Order Placed:</div>
                                            <div>{days(orders.orderTimeMs).format('dddd, MMMM D')}</div>
                                        </div>
                                        <div className="order-total">
                                            <div className="order-header-label">Total:</div>
                                            <div>{formatMoney(orders.totalCostCents)}</div>
                                        </div>
                                    </div>

                                    <div className="order-header-right-section">
                                        <div className="order-header-label">Order ID:</div>
                                        <div>{orders.id}</div>
                                    </div>
                                </div>

                                <div className="order-details-grid">
                                    {orders.products && orders.products.map((orderProducts) => {
                                        return (
                                            <Fragment key={orderProducts.id}>
                                                <div className="product-image-container">
                                                    <img src={orderProducts.product.image} alt={orderProducts.name} />
                                                </div>

                                                <div className="product-details">
                                                    <div className="product-name">
                                                        {orderProducts.product.name}
                                                    </div>
                                                    <div className="product-delivery-date">
                                                        Arriving on: {days(orderProducts.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                                                    </div>
                                                    <div className="product-quantity">
                                                        Quantity: {orderProducts.quantity} {orderProducts.quantity > 1 && 'items'}
                                                    </div>
                                                    <button className="buy-again-button button-primary">
                                                        <img className="buy-again-icon" src="images/icons/buy-again.png" />
                                                        <span className="buy-again-message">Add to Cart</span>
                                                    </button>
                                                </div>

                                                <div className="product-actions">
                                                    <a href="tracking.html">
                                                        <button className="track-package-button button-secondary">
                                                            Track package
                                                        </button>
                                                    </a>
                                                </div>
                                            </Fragment>
                                        );
                                    })}



                                </div>
                            </div>
                        );
                    })}



                </div>
            </div>
        </>
    )
}