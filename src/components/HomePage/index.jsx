// src/components/HomePage.js
import React from "react";
import { Container, Row, Col, Carousel, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./index.css"; // Import your custom CSS

// Sample premium deals data
const premiumDeals = [
  { 
    id: 1, 
    name: "Premium Headphones", 
    price: "₹1500", 
    image: "https://rukminim2.flixcart.com/image/612/612/kmccosw0/headphone/u/g/s/rockerz-450-pro-boat-original-imagf9j54dayugqg.jpeg?q=70" 
  },
  { 
    id: 2, 
    name: "Smartwatch Pro", 
    price: "₹2,500", 
    image: "https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/e/e/j/-original-imah759hywsyd834.jpeg?q=70" 
  },
  { 
    id: 3, 
    name: "4K Ultra HD TV", 
    price: "₹1,00,000", 
    image: "https://rukminim2.flixcart.com/image/312/312/xif0q/television/x/c/a/-original-imagtkmpfat5qcrz.jpeg?q=70" 
  },
  { 
    id: 4, 
    name: "iPhone", 
    price: "₹60,000", 
    image: "https://rukminim2.flixcart.com/image/312/312/ktketu80/mobile/s/l/c/iphone-13-mlpf3hn-a-apple-original-imag6vzz5qvejz8z.jpeg?q=70" 
  }
];  

// Sample list of products (up to 10 products)
const allProducts = [
  { id: 1, name: "Wireless Earbuds", price: "₹49.99", image: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/m/s/s/-original-imah34qc6vptzasv.jpeg?q=70" },
  { id: 2, name: "Laptop", price: "₹999.99", image: "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/e/r/b/cx1400cka-ek0335-chromebook-asus-original-imah2f9ch5u9enbq.jpeg?q=70" },
  { id: 3, name: "Gaming Console", price: "₹399.99", image: "https://rukminim2.flixcart.com/image/612/612/xif0q/gamingconsole/l/v/f/8-sup-game-400-in-1-retro-game-box-console-handheld-video-game-original-imagsrhyuzcxzqpp.jpeg?q=70" },
  { id: 4, name: "Smartphone", price: "₹699.99", image: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/o/m/i/a80-a671lc-itel-original-imah8kgnb58gbfd9.jpeg?q=70" },
  { id: 5, name: "Action Camera", price: "₹299.99", image: "https://rukminim2.flixcart.com/image/312/312/xif0q/sports-action-camera/d/y/h/-original-imah4va7queth3hf.jpeg?q=70" },
  { id: 6, name: "Bluetooth Speaker", price: "₹89.99", image: "https://rukminim2.flixcart.com/image/612/612/xif0q/speaker/f/i/l/-original-imah7gfvrf2gnhra.jpeg?q=70" },
  { id: 7, name: "Tablet", price: "₹349.99", image: "https://rukminim2.flixcart.com/image/312/312/xif0q/tablet/v/4/h/-original-imagu5gbhgbjqvh6.jpeg?q=70" },
  { id: 8, name: "Fitness Tracker", price: "₹99.99", image: "https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/e/e/p/-original-imah8mtwtmmxa47x.jpeg?q=70" },
  { id: 9, name: "Smart Home Hub", price: "₹129.99", image: "https://rukminim2.flixcart.com/image/612/612/ksuowi80/speaker-mobile-mod/u/z/1/smart-led-music-light-bulb-remote-controller-with-colourful-original-imag6b59phgnsvmz.jpeg?q=70" },
  { id: 10, name: "Portable Charger", price: "₹39.99", image: "https://rukminim2.flixcart.com/image/612/612/xif0q/power-bank/h/y/f/-original-imah439zhgxtxqh7.jpeg?q=70" }
];

const HomePage = () => {
  const navigate = useNavigate();

  // Handler for the Shop Now button in the Premium Deals section.
  const handleShopNow = () => {
    navigate("/products");
  };

  return (
    <div>
      {/* Carousel Section */}
      <Carousel className="home-carousel fade-in">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://img.freepik.com/premium-photo/online-fashion-shopping-with-computer_23-2150400628.jpg?w=900"
            alt="Welcome slide"
          />
          <Carousel.Caption>
            <h3>Welcome to Our Store</h3>
            <p>Discover amazing deals and top products.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://img.freepik.com/premium-photo/online-fashion-shopping-with-tablet_23-2150400638.jpg?w=900"
            alt="Unbeatable Prices slide"
          />
          <Carousel.Caption>
            <h3>Unbeatable Prices</h3>
            <p>Enjoy exclusive offers on premium products.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://img.freepik.com/premium-photo/online-fashion-shopping-with-laptop_23-2150400630.jpg?w=900"
            alt="Quality Guaranteed slide"
          />
          <Carousel.Caption>
            <h3>Quality Guaranteed</h3>
            <p>Shop with confidence from top brands.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Premium Deals Section */}
      <Container className="mt-5 fade-in side-in-left">
        <h2 className="text-center">Premium Deals</h2>
        <Row>
          {premiumDeals.map((deal) => (
            <Col key={deal.id} md={4} sm={6} className="mb-4">
              <Card className="premium-card">
                <Card.Img variant="top" src={deal.image} alt={deal.name} />
                <Card.Body>
                  <Card.Title>{deal.name}</Card.Title>
                  <Card.Text>{deal.price}</Card.Text>
                  <Button variant="primary" className="shop-button" onClick={handleShopNow}>
                    Shop Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Explore Products Section */}
      <Container className="mt-5 fade-in side-in-left">
        <h2 className="text-center">Explore Our Products</h2>
        <Row>
          {allProducts.map((product) => (
            <Col key={product.id} md={3} sm={6} xs={12} className="mb-4">
              <Card className="product-card">
                <Card.Img variant="top" src={product.image} alt={product.name} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.price}</Card.Text>
                  <Button variant="success" onClick={handleShopNow}>
                    Buy Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
