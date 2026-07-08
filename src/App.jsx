
import { HomePage } from './pages/HomePage'
import { OrderPage } from './pages/OrderPage'
import { TrackingPage } from './pages/TrackingPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { Routes, Route } from 'react-router'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    axios.get('/api/cart-items?expand=product')
      .then((response) => {
        // console.log('Cart data:', response);
        setCart(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cart:', error);
      });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="/orders" element={<OrderPage />} />
      <Route path="/tracking" element={<TrackingPage />} />
    </Routes>
  )
}

export default App
