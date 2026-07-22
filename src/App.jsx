
import { HomePage } from './pages/home/HomePage'
import { OrderPage } from './pages/order/OrderPage'
import { TrackingPage } from './pages/tracking/TrackingPage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { Routes, Route } from 'react-router'
import { useState } from 'react';
import { useEffect, useCallback } from 'react';
import axios from 'axios';

function App() {
  const [cart, setCart] = useState([]);
  const LoadCartItems = useCallback(async () => {
    try {
      const response = await axios.get('/api/cart-items?expand=product');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }, []);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- known false positive, see facebook/react#34743
    LoadCartItems();
  }, [LoadCartItems]);
  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} LoadCartItems={LoadCartItems} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} LoadCartItems={LoadCartItems} />} />
      <Route path="/orders" element={<OrderPage cart={cart} />} />
      <Route path="/tracking/:id" element={<TrackingPage cart={cart} />} />
    </Routes>
  )
}

export default App
