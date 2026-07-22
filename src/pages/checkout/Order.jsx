import { formatMoney } from "../../utils/money.js";
import axios from 'axios'
import days from "dayjs";
import { DeliveryOption } from "./DeliveryOption.jsx";

export function OrderPage({ deliveryOptions, cart, LoadCartItems }) {

    return (
        <>
            <div className="order-summary">
                {deliveryOptions.length > 0 && cart.map((item) => {
                    const selectedDeliveryOption = deliveryOptions.find((option) => { return option.id === item.deliveryOptionId });

                    const deleteProduct = async () => {
                        await axios.delete(`/api/cart-items/${item.productId}`);
                        await LoadCartItems()
                    }
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
                                        <span className="delete-quantity-link link-primary" onClick={deleteProduct}>
                                            Delete
                                        </span>
                                    </div>
                                </div>

                                <DeliveryOption item={item} deliveryOptions={deliveryOptions} LoadCartItems={LoadCartItems} />
                            </div>
                        </div>
                    )
                })}



            </div>
        </>
    )
}