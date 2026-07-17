import { formatMoney } from "../../utils/money.js";

import days from "dayjs";

export function OrderPage({ deliveryOption, cart }) {
    return (
        <>
            <div className="order-summary">
                {deliveryOption.length > 0 && cart.map((item) => {
                    const selectedDeliveryOption = deliveryOption.find((option) => { return option.id === item.deliveryOptionId });
                    return (
                        <div key={item.id} className="cart-item-container">
                            <div className="delivery-date">
                                Delivery date: {days(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                            </div>

                            <div className="cart-item-details-grid">
                                <img className="product-image"
                                    src={item.product.image} />

                                <div className="cart-item-details">
                                    <div className="product-name">
                                        {item.product.name}
                                    </div>
                                    <div className="product-price">
                                        {formatMoney(item.product.priceCents)}
                                    </div>
                                    <div className="product-quantity">
                                        <span>
                                            Quantity: <span className="quantity-label">{item.quantity}</span>
                                        </span>
                                        <span className="update-quantity-link link-primary">
                                            Update
                                        </span>
                                        <span className="delete-quantity-link link-primary">
                                            Delete
                                        </span>
                                    </div>
                                </div>

                                <div className="delivery-options">
                                    <div className="delivery-options-title">
                                        Choose a delivery option:
                                    </div>
                                    {
                                        deliveryOption.map((option) => {
                                            let priceString = 'FREE SHIPPING';
                                            if (option.priceCents > 0) {
                                                priceString = `${formatMoney(option.priceCents)} - shipping`;
                                            }
                                            return (
                                                <div key={option.id} className="delivery-option">
                                                    <input type="radio" checked={option.id === item.deliveryOptionId}
                                                        className="delivery-option-input"
                                                        name={`delivery-option-${item.productId}`} />
                                                    <div>
                                                        <div className="delivery-option-date">
                                                            {days(option.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                                                        </div>
                                                        <div className="delivery-option-price">
                                                            {priceString}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}



                                </div>
                            </div>
                        </div>
                    )
                })}



            </div>
        </>
    )
}