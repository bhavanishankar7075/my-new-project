import React, { useState } from 'react';
import './index.css'
const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);

  const handleTrackOrder = () => {
    // Simulating an order tracking response
    const mockOrders = {
      '12345': { status: 'Shipped', expectedDelivery: '2025-02-20' },
      '67890': { status: 'Delivered', deliveredOn: '2025-02-14' },
      '11111': { status: 'Processing', expectedDelivery: '2025-02-25' },
    };

    const order = mockOrders[orderId];
    if (order) {
      setOrderStatus(order);
    } else {
      setOrderStatus({ error: 'Order not found. Please check your Order ID.' });
    }
  };

  return (
    <div className="order-tracking">
      <h3>📦 Track Your Order</h3>
      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        className="order-input"
      />
      <button onClick={handleTrackOrder} className="track-btn">Track Order 🚚</button>

      {orderStatus && (
        <div className="order-status">
          {orderStatus.error ? (
            <p className="text-danger">{orderStatus.error}</p>
          ) : (
            <div>
              <p><strong>Status:</strong> {orderStatus.status}</p>
              {orderStatus.deliveredOn ? (
                <p><strong>Delivered On:</strong> {orderStatus.deliveredOn}</p>
              ) : (
                <p><strong>Expected Delivery:</strong> {orderStatus.expectedDelivery}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
