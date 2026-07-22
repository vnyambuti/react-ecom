
import axios from 'axios'
import days from "dayjs";
import { formatMoney } from "../../utils/money.js";
export function DeliveryOption({ item, deliveryOptions, LoadCartItems }) {

    return (
        <div className="delivery-options">
            <div className="delivery-options-title">
                Choose a delivery option:
            </div>
            {

                deliveryOptions.map((option) => {
                    let priceString = 'FREE SHIPPING';
                    if (option.priceCents > 0) {
                        priceString = `${formatMoney(option.priceCents)} - shipping`;
                    }
                    const UpdateDeliveryOption = async () => {

                        await axios.put(`/api/cart-items/${item.productId}`, { deliveryOptionId: option.id });
                        await LoadCartItems()
                    }
                    return (
                        <div key={option.id} className="delivery-option" onClick={UpdateDeliveryOption}>
                            <input type="radio" checked={option.id === item.deliveryOptionId} onChange={() => { }}
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
                    );

                })}



        </div>



    );
}