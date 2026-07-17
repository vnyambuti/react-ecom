import { HeaderComponent } from "../../components/HeaderComponent.jsx";
import { useState, useEffect } from "react";
import days from "dayjs";
import { formatMoney } from "../../utils/money.js";
import { OrderDetails } from './OrderDetails.jsx';
import axios from "axios";
import './OrderPage.css';


export function OrderPage({ cart }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await axios.get('/api/orders?expand=products');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        getOrders();
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
                                <OrderDetails orders={orders} />

                            </div>
                        );
                    })}



                </div>
            </div>
        </>
    )
}