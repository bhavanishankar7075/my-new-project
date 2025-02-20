import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import { CartProvider } from './components/CartContext';
import Root from './App.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

<ToastContainer position="top-right" />


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <CartProvider>
    <Root />
  </CartProvider>
</React.StrictMode>
)
