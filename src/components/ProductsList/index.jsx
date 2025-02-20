import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { CartContext } from '../CartContext';
import PropTypes from 'prop-types';

import './index.css';

const productsData = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "₹999.99",
    category: "Electronics",
    image:
      "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHBob25lfGVufDB8fDB8fHww",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "₹1490.99",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1617625802912-cde586faf331?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnR3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: "₹900.99",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1613141412501-9012977f1969?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FtaW5nJTIwbW91c2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    name: "Laptop",
    price: "₹55000",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww",
  },
  {
    id: 5,
    name: "T-Shirt",
    price: "₹499",
    category: "Fashion",
    image:
      "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dCUyMHNoaXJ0fGVufDB8fDB8fHww",
  },
  {
    id: 6,
    name: "Refrigerator",
    price: "₹15000",
    category: "Home Appliances",
    image:
      "https://rukminim2.flixcart.com/image/312/312/kzygpzk0/refrigerator-new/d/w/c/-original-imagbuvf8hqmcaak.jpeg?q=70",
  },
  {
    id: 7,
    name: "Bluetooth Speaker",
    price: "₹1500",
    category: "Electronics",
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/speaker/smart-speaker/5/p/a/m3-portable-bluetooth-mini-speaker-dynamic-metal-sound-with-high-original-imah5ghbz6tqn68z.jpeg?q=70",
  },
  {
    id: 8,
    name: "Tablet",
    price: "₹30000",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGFibGV0fGVufDB8fDB8fHww",
  },
  {
    id: 9,
    name: "Fitness Tracker",
    price: "₹2000",
    category: "Electronics",
    image:
      "https://plus.unsplash.com/premium_photo-1681433383783-661b519b154a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zml0bmVzcyUyMHRyYWNrZXJ8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 10,
    name: "Portable Charger",
    price: "₹1500",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1525858907241-d230b66fb9fa?q=80&w=949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const ProductsList = ({ searchQuery = "" }) => {


  const { addToCart } = useContext(CartContext);
  const [sortBy, setSortBy] = useState('default');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let filtered = productsData.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === 'lowToHigh') {
      filtered.sort((a, b) => parseFloat(a.price.replace(/₹|,/g, '')) - parseFloat(b.price.replace(/₹|,/g, '')));
    } else if (sortBy === 'highToLow') {
      filtered.sort((a, b) => parseFloat(b.price.replace(/₹|,/g, '')) - parseFloat(a.price.replace(/₹|,/g, '')));
    } else if (sortBy === 'alphabetical') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
  }, [searchQuery, sortBy]);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`,{
      position:"top-right",
    });


    /* toast.success(`${product.name} added to cart!`); */
  };

  return (

    <Container className="mt-4 fade-in">
      <h1 className="text-center" style={{ color: "#e90f0f" }}>Featured Products</h1>
      <Form.Group className="mb-3">
        <Form.Label>Sort By</Form.Label>
        <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="default">Default</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
          <option value="alphabetical">Alphabetical</option>
        </Form.Select>
      </Form.Group>



      <Row className="justify-content-center">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Col key={product.id} md={4} sm={6} xs={12} className="mb-4 slide-in-left">
              <Card className="product-card shadow-lg" onClick={() => navigate(`/products/${product.id}`)} style={{ cursor: 'pointer' }}>
                <Card.Img variant="top" src={product.image} alt={product.name} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.price}</Card.Text>
                  <Button variant="success" className="w-100 add-to-cart-btn " onClick={(e) => handleAddToCart(product, e)}>
                    Add to Cart
                  </Button>
                  {product.added && <p className="text-success mt-2">Item added to cart!</p>}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No products found</p>
        )}
      </Row>
      <div className='toast-container'>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </Container>
  );
};
ProductsList.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default ProductsList;
