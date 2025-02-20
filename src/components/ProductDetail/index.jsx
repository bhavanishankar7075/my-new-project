
// src/components/ProductDetail/ProductDetail.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Carousel, Card, Image } from "react-bootstrap";
import { FaStar, FaRegStar, FaStarHalfAlt, FaHeart, FaRegHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// Sample product data
const products = [ 
  {
    id: 1,
    name: "Wireless Headphones",
    price: "₹999.99",
    category: "Electronics",
    images: [
      "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1511376777868-611b54f68947?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1516707570261-207ab1a96c69?w=800&auto=format&fit=crop&q=60"
    ],
    description:
      "Experience high-quality sound with our wireless headphones, designed for comfort and durability.",
    rating: 4.5,
    offer: "Extra 10% off with code SAVE10",
    reviews: [
      { id: 1, reviewer: "Alice", rating: 5, comment: "Amazing sound quality!" },
      { id: 2, reviewer: "Bob", rating: 4, comment: "Great value for money." }
    ]
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "₹1490.99",
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1617625802912-cde586faf331?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1617137303492-3779f4f7f247?w=800&auto=format&fit=crop&q=60"
    ],
    description:
      "Stay connected and track your fitness with our sleek and stylish smart watch.",
    rating: 4.0,
    offer: "Flat ₹200 off on first purchase",
    reviews: [
      { id: 1, reviewer: "Charlie", rating: 4, comment: "Very functional and stylish." },
      { id: 2, reviewer: "Dana", rating: 3.5, comment: "Good, but battery life could be better." }
    ]
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: "₹900.99",
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1613141412501-9012977f1969?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FtaW5nJTIwbW91c2V8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1613141412501-9012977f1969?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FtaW5nJTIwbW91c2V8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1613141412501-9012977f1969?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FtaW5nJTIwbW91c2V8ZW58MHx8MHx8fDA%3D",
    ],
    description:
      "strong and build quality is so good  with our sleek and stylish gaming mouse.",
    rating: 4.0,
    offer: "Flat ₹200 off on first purchase",
    reviews: [
      { id: 1, reviewer: "Charlie", rating: 4, comment: "Very functional and stylish." },
      { id: 2, reviewer: "Dana", rating: 3.5, comment: "Good, more efficent and fast and speed." }
    ]
  },
  {
    id: 4,
    name: "Laptop",
    price: "₹55000",
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww",
    ],
    description:
      "This powerful laptop features a high-resolution display, robust performance, and long battery life—ideal for work, gaming, and multimedia.",
    rating: 4.2,
    offer: "Save 15% with code LAPTOP15",
    reviews: [
      {
        id: 1,
        reviewer: "John Doe",
        rating: 4,
        comment: "Great performance and display, but battery life could be improved."
      },
      {
        id: 2,
        reviewer: "Jane Smith",
        rating: 4.5,
        comment: "Very satisfied with its performance and build quality."
      }
    ]
  },
  {
    id: 5,
    name: "T-Shirt",
    price: "₹499",
    category: "Fashion",
    images: [
      "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dCUyMHNoaXJ0fGVufDB8fDB8fHww",
      "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dCUyMHNoaXJ0fGVufDB8fDB8fHww",
      "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dCUyMHNoaXJ0fGVufDB8fDB8fHww",
    ],
    description:
      "A comfortable and stylish T-Shirt made from premium cotton, perfect for casual wear.",
    rating: 4.0,
    offer: "Buy 2 get 1 free",
    reviews: [
      {
        id: 1,
        reviewer: "Alice",
        rating: 4,
        comment: "The fabric is really soft and the fit is great."
      },
      {
        id: 2,
        reviewer: "Bob",
        rating: 4,
        comment: "Good quality, though colors faded slightly after washing."
      }
    ]
  },
  {
    id: 6,
    name: "Refrigerator",
    price: "₹15000",
    category: "Home Appliances",
    images: [
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6328/6328352ld.jpg",
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6328/6328352ld.jpg",
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6328/6328352ld.jpg",
    ],
    description:
      "An energy-efficient refrigerator featuring smart cooling technology and a spacious interior to keep your food fresh.",
    rating: 4.3,
    offer: "Extra 5% off on online orders",
    reviews: [
      {
        id: 1,
        reviewer: "Carlos",
        rating: 4,
        comment: "Keeps food fresh for longer periods."
      },
      {
        id: 2,
        reviewer: "Dana",
        rating: 4.5,
        comment: "Efficient and quiet operation."
      }
    ]
  },
  {
    id: 7,
    name: "Bluetooth Speaker",
    price: "₹1500",
    category: "Electronics",
    images: [
      "https://plus.unsplash.com/premium_photo-1729708654598-f0e68d8bd0bf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ymxvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1729708654598-f0e68d8bd0bf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ymxvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1729708654598-f0e68d8bd0bf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ymxvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
    ],
    description:
      "Portable Bluetooth speaker offering deep bass and clear audio—perfect for both indoor and outdoor use.",
    rating: 4.5,
    offer: "Flat ₹300 off",
    reviews: [
      {
        id: 1,
        reviewer: "Eve",
        rating: 5,
        comment: "Fantastic sound quality and battery life!"
      },
      {
        id: 2,
        reviewer: "Frank",
        rating: 4,
        comment: "Good quality but a bit bulky."
      }
    ]
  },
  {
    id: 8,
    name: "Tablet",
    price: "₹30000",
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGFibGV0fGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGFibGV0fGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGFibGV0fGVufDB8fDB8fHww",
    ],
    description:
      "A sleek and powerful tablet with a vibrant display and fast performance, perfect for both work and entertainment.",
    rating: 4.1,
    offer: "Special discount: ₹1000 off",
    reviews: [
      {
        id: 1,
        reviewer: "Grace",
        rating: 4,
        comment: "The display is vibrant, and it handles tasks smoothly."
      },
      {
        id: 2,
        reviewer: "Henry",
        rating: 4.2,
        comment: "Good value for money, though battery performance is average."
      }
    ]
  },
  {
    id: 9,
    name: "Fitness Tracker",
    price: "₹2000",
    category: "Electronics",
    images: [
      "https://plus.unsplash.com/premium_photo-1681433383783-661b519b154a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zml0bmVzcyUyMHRyYWNrZXJ8ZW58MHx8MHx8fDA%3D",
      "https://plus.unsplash.com/premium_photo-1681433383783-661b519b154a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zml0bmVzcyUyMHRyYWNrZXJ8ZW58MHx8MHx8fDA%3D",
      "https://plus.unsplash.com/premium_photo-1681433383783-661b519b154a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zml0bmVzcyUyMHRyYWNrZXJ8ZW58MHx8MHx8fDA%3D",
    ],
    description:
      "Advanced fitness tracker that monitors your heart rate, steps, and sleep patterns to help you stay fit and active.",
    rating: 4.0,
    offer: "Get an extra strap free with every purchase",
    reviews: [
      {
        id: 1,
        reviewer: "Ivy",
        rating: 4,
        comment: "Accurate tracking and comfortable to wear."
      },
      {
        id: 2,
        reviewer: "Jack",
        rating: 3.5,
        comment: "Basic features compared to other models."
      }
    ]
  },
  {
    id: 10,
    name: "Portable Charger",
    price: "₹1500",
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1525858907241-d230b66fb9fa?q=80&w=949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1525858907241-d230b66fb9fa?q=80&w=949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1525858907241-d230b66fb9fa?q=80&w=949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description:
      "Compact and high-capacity portable charger designed to keep your devices powered on the go.",
    rating: 4.4,
    offer: "20% off for first-time customers",
    reviews: [
      {
        id: 1,
        reviewer: "Kelly",
        rating: 4.5,
        comment: "Very handy and charges my phone quickly."
      },
      {
        id: 2,
        reviewer: "Leo",
        rating: 4,
        comment: "Great for travel, but slightly heavy."
      }
    ]
  }
];



// Utility function to generate star ratings
const getStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} color="#ffc107" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} color="#ffc107" />);
    } else {
      stars.push(<FaRegStar key={i} color="#ffc107" />);
    }
  }
  return stars;
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
/*   const { addToCart, cartItems } = useContext(CartContext);
 */
  // Find product by id
  const product = products.find((p) => p.id.toString() === id);

  // Handle Buy Now button
  /* const handleBuyNow = () => {
    const isProductInCart = cartItems.some((item) => item.id === product.id);

    if (!isProductInCart) {
      addToCart(product);
      toast.success(`${product.name} added to cart!`, {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      toast.info(`${product.name} is already in your cart!`, {
        position: "top-right",
        autoClose: 2000,
      });
    }

    navigate("/cart");
  }; */

  // Handle Like button
  const handleLike = () => {
    setIsLiked((prev) => !prev);
    toast.info(
      `${product.name} ${!isLiked ? "added to" : "removed from"} your liked items!`,
      { position: "top-right", autoClose: 2000 }
    );
  };

  // If product is not found
  if (!product) {
    return (
      <Container className="mt-4">
        <h2>Product not found</h2>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container className="product-detail mt-4">
      <Button variant="secondary" onClick={() => navigate(-1)} className="back-btn">
        &larr; Back to Products
      </Button>
      <Row className="mt-3">
        {/* Left Column: Product Images Carousel */}
        <Col md={6}>
          {product.images && product.images.length > 1 ? (
            <Carousel className="product-carousel">
              {product.images.map((imgUrl, index) => (
                <Carousel.Item key={index}>
                  <Image
                    className="d-block w-100 product-image"
                    src={imgUrl}
                    alt={`${product.name} ${index + 1}`}
                    fluid
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <Image
              className="d-block w-100 product-image"
              src={product.images ? product.images[0] : product.image}
              alt={product.name}
              fluid
            />
          )}
        </Col>

        {/* Right Column: Product Details */}
        <Col md={6}>
          <h2 className="product-name">{product.name}</h2>
          <h4 className="product-price">{product.price}</h4>
          <div className="rating-like-container">
            <div className="product-rating">
              {getStars(product.rating)}
              <span className="rating-value"> {product.rating} / 5</span>
            </div>
            <Button variant="link" className="like-btn" onClick={handleLike}>
              {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
            </Button>
          </div>
          <p className="product-category">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="product-description">{product.description}</p>
          {product.offer && (
            <div className="product-offer">
              <strong>Offer: </strong> {product.offer}
            </div>
          )}
          {/* <div className="product-actions mt-3">
            <Button variant="primary" className="buy-now-btn" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div> */}
        </Col>
      </Row>

      {/* Customer Reviews Section */}
      <Row className="mt-4">
        <Col>
          <h4>Customer Reviews</h4>
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review) => (
              <Card key={review.id} className="review-card mt-3">
                <Card.Body>
                  <Card.Title className="reviewer-name">{review.reviewer}</Card.Title>
                  <div className="review-rating">
                    {getStars(review.rating)}
                    <span className="rating-value"> {review.rating} / 5</span>
                  </div>
                  <Card.Text className="review-comment">{review.comment}</Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </Col>
      </Row>
      <ToastContainer position="top-right" />
    </Container>
  );
};

export default ProductDetail;