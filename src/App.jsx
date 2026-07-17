
import { HomePage } from './pages/home/HomePage'
import { OrderPage } from './pages/order/OrderPage'
import { TrackingPage } from './pages/tracking/TrackingPage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { Routes, Route } from 'react-router'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const getCartItems = async () => {
      try {
        const response = await axios.get('/api/cart-items?expand=product');
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    getCartItems();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="/orders" element={<OrderPage cart={cart} />} />
      <Route path="/tracking/:id" element={<TrackingPage cart={cart} />} />
    </Routes>
  )
}

export default App
