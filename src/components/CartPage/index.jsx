import { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Card, Modal, Alert } from 'react-bootstrap';
import { CartContext } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaTrash, FaBookmark, FaShoppingCart } from 'react-icons/fa';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [sectionsOpen, setSectionsOpen] = useState({
    coupon: false,
    orderNotes: false,
    shipping: false,
    payment: false,
  });

  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [orderNotes, setOrderNotes] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [savedItems, setSavedItems] = useState([]);    
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const validCoupons = {
    SAVE10: 0.10,
    WELCOME50: 0.50,
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/₹|,/g, '')) || 0;
    return acc + price * item.quantity;
  }, 0);

  const taxRate = 0.05;
  const tax = subtotal * taxRate;
  const total = subtotal - discount + tax;

  const toggleSection = (section) => {
    setSectionsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    if (couponApplied) {
      const couponKey = coupon.toUpperCase();
      if (validCoupons[couponKey]) {
        const discountAmount = subtotal * validCoupons[couponKey];
        setDiscount(discountAmount);
      } else {
        setDiscount(0);
      }
    }
  }, [subtotal, coupon, couponApplied]);

  const handleApplyCoupon = () => {
    const couponKey = coupon.toUpperCase();
    if (validCoupons[couponKey]) {
      const discountAmount = subtotal * validCoupons[couponKey];
      setDiscount(discountAmount);
      setCouponApplied(true);
      alert(`Coupon applied! You saved ₹${discountAmount.toFixed(2)}`);
    } else {
      alert('Invalid coupon code. Please try again.');
      setDiscount(0);
      setCouponApplied(false);
    }
  };

  const handleCheckout = () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method before proceeding.');
      return;
    }
    setShowModal(true);
  };

  const confirmCheckout = () => {
    setShowModal(false);
    navigate('/checkout', {
      state: { cartItems, total, orderNotes, selectedPaymentMethod, shippingAddress },
    });
  };

  const handleSaveForLater = (itemId) => {
    const itemToSave = cartItems.find((item) => item.id === itemId);
    if (itemToSave) {
      setSavedItems([...savedItems, itemToSave]);
      removeFromCart(itemId);
    }
  };

  const handleMoveToCart = (itemId) => {
    const itemToMove = savedItems.find((item) => item.id === itemId);
    if (itemToMove) {
      setSavedItems(savedItems.filter((item) => item.id !== itemId));
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container className="mt-4 text-center">
        <h1>Your Cart</h1>
        <hr />
        <img
          src="https://img.freepik.com/premium-psd/empty-cart-shopping-commerce-3d-illustration_66255-2017.jpg"
          alt="Empty Cart"
          className="img-fluid"
          style={{ maxWidth: '400px', margin: '20px auto' }}
        />
        <p>Your cart is empty.</p>
        <Button variant="primary" onClick={() => navigate('/products')}>
          Shop Now
        </Button>
      </Container>
    );
  }

  const SectionHeader = ({ title, isOpen, onToggle, icon }) => (
    <div
      className="d-flex justify-content-between align-items-center p-3 bg-light rounded cursor-pointer"
      onClick={onToggle}
      style={{ cursor: 'pointer' }}
    >
      <div className="d-flex align-items-center gap-2">
        {icon}
        <h5 className="mb-0">{title}</h5>
      </div>
      {isOpen ? <FaChevronUp /> : <FaChevronDown />}
    </div>
  );

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">
        Your Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)
      </h1>

      <Card className="mb-4">
        <Card.Body>
          {cartItems.map((item) => (
            <Row
              key={item.id}
              className="mb-3 align-items-center p-3 border-bottom"
            >
              <Col md={3} xs={4}>
                <img src={item.image} alt={item.name} className="img-fluid rounded" />
              </Col>
              <Col md={4} xs={8}>
                <h5>{item.name}</h5>
              </Col>
              <Col md={2}>
                <p className="mb-0 fw-bold">{item.price}</p>
              </Col>
              <Col md={2}>
                <Form.Control
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                  className="w-75"
                />
              </Col>
              <Col md={1} className="d-flex flex-column gap-2">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                  className="d-flex align-items-center gap-2"
                >
                  <FaTrash /> Remove
                </Button>
                <Button
                  variant="outline-warning"
                  size="sm"
                  onClick={() => handleSaveForLater(item.id)}
                  className="d-flex align-items-center gap-2"
                >
                  <FaBookmark /> Save for Later
                </Button>
              </Col>
            </Row>
          ))}
        </Card.Body>
      </Card>

      <div className="mb-4">
        <div className="mb-3">
          <SectionHeader
            title="Coupon Code"
            isOpen={sectionsOpen.coupon}
            onToggle={() => toggleSection('coupon')}
            icon={<span role="img" aria-label="coupon">🎟️</span>}
          />
          <div className={`collapse ${sectionsOpen.coupon ? 'show' : ''}`}>
            <Card className="border-top-0">
              <Card.Body>
                <Form.Group className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <Button onClick={handleApplyCoupon}>Apply</Button>
                </Form.Group>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="mb-3">
          <SectionHeader
            title="Order Notes"
            isOpen={sectionsOpen.orderNotes}
            onToggle={() => toggleSection('orderNotes')}
            icon={<span role="img" aria-label="notes">📝</span>}
          />
          <div className={`collapse ${sectionsOpen.orderNotes ? 'show' : ''}`}>
            <Card className="border-top-0">
              <Card.Body>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Add any special instructions for your order..."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                />
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="mb-3">
          <SectionHeader
            title="Shipping Address"
            isOpen={sectionsOpen.shipping}
            onToggle={() => toggleSection('shipping')}
            icon={<span role="img" aria-label="shipping">🏠</span>}
          />
          <div className={`collapse ${sectionsOpen.shipping ? 'show' : ''}`}>
            <Card className="border-top-0">
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    value={shippingAddress.name}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, name: e.target.value })
                    }
                    className="mb-2"
                  />
                  <Form.Control
                    type="text"
                    placeholder="Address Line 1"
                    value={shippingAddress.address1}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, address1: e.target.value })
                    }
                    className="mb-2"
                  />
                  <Form.Control
                    type="text"
                    placeholder="Address Line 2 (optional)"
                    value={shippingAddress.address2}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, address2: e.target.value })
                    }
                    className="mb-2"
                  />
                  <Row>
                    <Col md={6}>
                      <Form.Control
                        type="text"
                        placeholder="City"
                        value={shippingAddress.city}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, city: e.target.value })
                        }
                        className="mb-2"
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        type="text"
                        placeholder="State/Province"
                        value={shippingAddress.state}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, state: e.target.value })
                        }
                        className="mb-2"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Control
                        type="text"
                        placeholder="ZIP/Postal Code"
                        value={shippingAddress.zip}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, zip: e.target.value })
                        }
                        className="mb-2"
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        type="text"
                        placeholder="Country"
                        value={shippingAddress.country}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, country: e.target.value })
                        }
                        className="mb-2"
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="mb-3">
          <SectionHeader
            title="Payment Method"
            isOpen={sectionsOpen.payment}
            onToggle={() => toggleSection('payment')}
            icon={<span role="img" aria-label="payment">💳</span>}
          />
          <div className={`collapse ${sectionsOpen.payment ? 'show' : ''}`}>
            <Card className="border-top-0">
              <Card.Body>
                <Form.Check
                  type="radio"
                  label="Credit/Debit Card"
                  name="paymentMethod"
                  value="card"
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="mb-2"
                />
                <Form.Check
                  type="radio"
                  label="UPI"
                  name="paymentMethod"
                  value="upi"
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="mb-2"
                />
                <Form.Check
                  type="radio"
                  label="Wallet"
                  name="paymentMethod"
                  value="wallet"
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                />
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">Order Summary</h4>
        </Card.Header>
        <Card.Body>
          <Row className="mb-2">
            <Col>Subtotal:</Col>
            <Col className="text-end">₹{subtotal.toFixed(2)}</Col>
          </Row>
          <Row className="mb-2">
            <Col>Discount:</Col>
            <Col className="text-end text-danger">- ₹{discount.toFixed(2)}</Col>
          </Row>
          <Row className="mb-2">
            <Col>Tax (5%):</Col>
            <Col className="text-end">₹{tax.toFixed(2)}</Col>
          </Row>
          <hr />
          <Row className="fw-bold">
            <Col>Total:</Col>
            <Col className="text-end">₹{total.toFixed(2)}</Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-between mb-4">
        <Button variant="outline-danger" onClick={clearCart}>
          <FaTrash className="me-2" /> Clear Cart
        </Button>
        <Button variant="primary" onClick={handleCheckout}>
          <FaShoppingCart className="me-2" /> Proceed to Checkout
        </Button>
      </div>

      {savedItems.length > 0 && (
        <div className="mt-4">
          <h3>Saved for Later</h3>
          <Row>
            {savedItems.map((item) => (
              <Col key={item.id} md={4} className="mb-3">
                <Card>
                  <Card.Img variant="top" src={item.image} alt={item.name} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Button variant="primary" onClick={() => handleMoveToCart(item.id)}>
                      Move to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to proceed to checkout?</p>
          <p className="fw-bold">Total Amount: ₹{total.toFixed(2)}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmCheckout}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CartPage;
