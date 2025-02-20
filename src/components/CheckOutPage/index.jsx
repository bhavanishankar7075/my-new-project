import  { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import './index.css';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const [amount, setAmount] = useState(500); // Base price in INR
  const [email, setEmail] = useState('');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');

  // Handle coupon code
  const applyCoupon = () => {
    if (coupon === 'SAVE10') {
      setDiscount(0.1 * amount);
      alert('Coupon applied! 10% discount.');
    } else {
      setDiscount(0);
      alert('Invalid coupon code.');
    }
  };

  // Handle payment
  const handlePayment = async () => {
    const stripe = await stripePromise;

    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: 'price_1QsIz8L4Eh51qnT6tJ3OCELo', // Replace with your one-time price_id
          quantity: 1,
        },
      ],
      mode: 'payment',
      customerEmail: email,
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`,
    });

    if (error) {
      console.error('Payment Error:', error.message);
    }
  };

  // Calculate final price
  const finalPrice = amount - discount;

  return (
    <div className="checkout-container">
      <h2>🛒 Checkout</h2>

      {/* Order Summary */}
      <div className="order-summary">
        <p><strong>Product:</strong> Sample Product</p>
        <p><strong>Price:</strong> ₹{amount}</p>
        <p><strong>Discount:</strong> ₹{discount}</p>
        <p className="final-price"><strong>Total:</strong> ₹{finalPrice}</p>
      </div>

      {/* Coupon Code */}
      <div className="coupon-section">
        <input
          type="text"
          placeholder="Enter coupon code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="input-field"
        />
        <button className="apply-btn" onClick={applyCoupon}>Apply Coupon</button>
      </div>

      {/* Email Input */}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="input-field"
      />

      {/* Payment Method Selection */}
      <div className="payment-methods">
        <h4>Select Payment Method:</h4>
        <div className="payment-options">
          <label className={selectedPaymentMethod === 'card' ? 'selected' : ''}>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={selectedPaymentMethod === 'card'}
              onChange={() => setSelectedPaymentMethod('card')}
            />
            <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Card" /> Card
          </label>

          <label className={selectedPaymentMethod === 'upi' ? 'selected' : ''}>
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={selectedPaymentMethod === 'upi'}
              onChange={() => setSelectedPaymentMethod('upi')}
            />
            <img src="https://th.bing.com/th/id/OIP.v4Rn2MaaCCLG4L__7CTCzgHaCn?rs=1&pid=ImgDetMain" alt="UPI" /> UPI
          </label>

          <label className={selectedPaymentMethod === 'wallet' ? 'selected' : ''}>
            <input
              type="radio"
              name="paymentMethod"
              value="wallet"
              checked={selectedPaymentMethod === 'wallet'}
              onChange={() => setSelectedPaymentMethod('wallet')}
            />
            <img src="https://img.icons8.com/color/48/000000/wallet.png" alt="Wallet" /> Wallet
          </label>
        </div>
      </div>

      {/* Pay Now Button */}
      <button className="pay-now-btn" onClick={handlePayment}>
        Pay Now 💳
      </button>
    </div>
  );
};

export default CheckoutPage;
