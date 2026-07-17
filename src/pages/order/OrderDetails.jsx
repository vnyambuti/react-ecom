
import { Fragment } from 'react';
import days from 'dayjs';
import { Link } from "react-router";
export function OrderDetails({ orders }) {
    return (
        <>
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
                                <Link to={`/tracking/${orders.id}`} className="track-package-link">
                                    <button className="track-package-button button-secondary">
                                        Track package
                                    </button>
                                </Link>
                            </div>
                        </Fragment>
                    );
                })}



            </div>
        </>
    );
}