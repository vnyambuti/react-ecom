
import './checkout-header.css'
import './checkoutPage.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { OrderPage } from './Order.jsx';
import { PaymentPage } from './Payment.jsx';
import { Link } from 'react-router'
export function CheckoutPage({ cart }) {
    const [deliveryOption, setDeliveryOption] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {
        const getDeliveryOptions = async () => {
            try {
                let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
                setDeliveryOption(response.data);
                response = await axios.get('/api/payment-summary');
                setPaymentSummary(response.data);

            } catch (error) {
                console.error('Error fetching delivery options:', error);
            }
        }

        getDeliveryOptions();
    }, []);

    return (
        <>
            <title>Checkout</title>
            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <Link to="/">
                            <img className="logo" src="images/logo.png" />
                            <img className="mobile-logo" src="images/mobile-logo.png" />
                        </Link>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<Link className="return-to-home-link"
                            to="/">3 items</Link>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderPage deliveryOption={deliveryOption} cart={cart} />
                    {paymentSummary && (
                        <>
                            <PaymentPage paymentSummary={paymentSummary} />
                        </>
                    )}

                </div>
            </div>
        </>
    )
}

