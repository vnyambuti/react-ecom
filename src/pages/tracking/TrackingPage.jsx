
import { HeaderComponent } from "../../components/HeaderComponent";
import './TrackingPage.css';
import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import days from "dayjs";

export function TrackingPage({ cart }) {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        const getOrderDetails = async () => {
            try {
                const response = await axios.get(`/api/orders/${id}?expand=products`);
                // Handle the response data as needed
                setOrderDetails(response.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };
        getOrderDetails();
    }, [id]);
    return (
        <>
            <title>Tracking</title>
            <HeaderComponent cart={cart} />
            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>
                    {orderDetails && (
                        <div className="tracking-order-id">
                            Order ID: {orderDetails.id}
                        </div>
                    )}
                    {orderDetails && (
                        <div className="tracking-order-date">
                            Order Placed: {days(orderDetails.orderTimeMs).format('dddd, MMMM D')}
                        </div>
                    )}
                    {orderDetails && (
                        <div className="delivery-date">
                            Arriving on Monday, June 13
                        </div>
                    )}

                    <div className="product-info">
                        Black and Gray Athletic Cotton Socks - 6 Pairs
                    </div>

                    <div className="product-info">
                        Quantity: 1
                    </div>

                    <img className="product-image" src="images/products/athletic-cotton-socks-6-pairs.jpg" />

                    <div className="progress-labels-container">
                        <div className="progress-label">
                            Preparing
                        </div>
                        <div className="progress-label current-status">
                            Shipped
                        </div>
                        <div className="progress-label">
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar"></div>
                    </div>
                </div>
            </div>
        </>
    )
}