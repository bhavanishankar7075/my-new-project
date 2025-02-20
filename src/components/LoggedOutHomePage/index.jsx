/* // src/components/LoggedOutHomePage.js
import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./index.css";

const LoggedOutHomePage = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const toggleForm = () => {
    setIsSignup((prev) => !prev);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (isSignup) {
      if (!formData.confirmPassword)
        newErrors.confirmPassword = "Please confirm your password";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (isSignup) {
      // Sign Up: store user details but do not log them in automatically.
      localStorage.setItem(
        "user",
        JSON.stringify({ username: formData.username, password: formData.password })
      );
      toast.success("Sign up successful! Please log in.", {
        position: "top-right",
        autoClose: 3000,
      });
      // Switch to Login mode.
      setIsSignup(false);
      setFormData({ username: "", password: "", confirmPassword: "" });
    } else {
      // Login: verify credentials.
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (
        storedUser &&
        storedUser.username === formData.username &&
        storedUser.password === formData.password
      ) {
        localStorage.setItem("loggedIn", "true");
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 3000,
        });
        // Navigate to home ("/") so that CustomNavbar and HomePage are shown.
        navigate("/");
      } else {
        setErrors({ password: "Invalid credentials" });
      }
    }
  };

  return (
    <Container className="loggedout-home mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="auth-card p-4">
            <h2 className="text-center">{isSignup ? "Sign Up" : "Login"}</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
                {errors.username && <p className="text-danger">{errors.username}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                {errors.password && <p className="text-danger">{errors.password}</p>}
              </Form.Group>
              {isSignup && (
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                  />
                  {errors.confirmPassword && (
                    <p className="text-danger">{errors.confirmPassword}</p>
                  )}
                </Form.Group>
              )}
              <Button type="submit" variant="primary" className="w-100">
                {isSignup ? "Sign Up" : "Login"}
              </Button>
            </Form>
            <p className="text-center mt-3">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <span
                className="toggle-btn"
                onClick={toggleForm}
                style={{ cursor: "pointer", color: "#007bff" }}
              >
                {isSignup ? "Login" : "Sign Up"}
              </span>
            </p>
          </Card>
          <div className="mt-4 text-center">
            <Button variant="primary" onClick={() => navigate("/loggedouthomepage")}>
              Continue as Guest
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoggedOutHomePage;
 */










































// src/components/LoggedOutHomePage.js
import React, { useState } from "react";
import { Container, Navbar, Nav, Button, Modal, Form, Carousel, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./index.css";

const LoggedOutHomePage = () => {
  const navigate = useNavigate();
  
  // Modal state for authentication
  const [showModal, setShowModal] = useState(false);
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  // Carousel data (update URLs as needed)
  const carouselImages = [
    {
      src: "https://img.freepik.com/premium-photo/online-fashion-shopping-with-computer_23-2150400628.jpg?w=900",
      alt: "Welcome slide",
      captionTitle: "Welcome to Our Store",
      captionText: "Discover amazing deals and top products.",
    },
    {
      src: "https://img.freepik.com/premium-photo/online-fashion-shopping-with-tablet_23-2150400638.jpg?w=900",
      alt: "Unbeatable Prices slide",
      captionTitle: "Unbeatable Prices",
      captionText: "Enjoy exclusive offers on premium products.",
    },
    {
      src: "https://img.freepik.com/premium-photo/online-fashion-shopping-with-laptop_23-2150400630.jpg?w=900",
      alt: "Quality Guaranteed slide",
      captionTitle: "Quality Guaranteed",
      captionText: "Shop with confidence from top brands.",
    },
  ];

  // Open and close modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setErrors({});
    setFormData({ username: "", password: "", confirmPassword: "" });
  };

  // Toggle between Sign Up and Login mode
  const toggleForm = () => {
    setIsSignup(prev => !prev);
    setErrors({});
  };

  // Form submission: For Sign Up, store user; for Login, verify credentials.
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (isSignup) {
      if (!formData.confirmPassword)
        newErrors.confirmPassword = "Please confirm your password";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (isSignup) {
      // Sign up: store user details, but do not log in automatically.
      localStorage.setItem("user", JSON.stringify({ username: formData.username, password: formData.password }));
      toast.success("Sign up successful! Please log in.", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsSignup(false);
      setFormData({ username: "", password: "", confirmPassword: "" });
    } else {
      // Login: verify credentials.
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.username === formData.username && storedUser.password === formData.password) {
        localStorage.setItem("loggedIn", "true");
        toast.success("Login successful!", { position: "top-right", autoClose: 3000 });
        handleCloseModal();
        navigate("/"); // Redirect to home where CustomNavbar (with full layout) is displayed.
      } else {
        setErrors({ password: "Invalid credentials" });
      }
    }
  };

  // "Shop Now" button: if logged in, navigate to /products; if not, prompt for login.
  const handleShopNow = () => {
    const loggedInFlag = localStorage.getItem("loggedIn");
    if (loggedInFlag === "true") {
      navigate("/products");
    } else {
      toast.info("Please log in to continue", { position: "top-right", autoClose: 3000 });
      handleShowModal();
    }
  };

  return (
    <div className="loggedout-homepage">
      {/* Navbar for guests */}
      <Navbar className="loggedout-navbar" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/loggedouthomepage">Ecommerce</Navbar.Brand>
          <Nav className="ms-auto">
            <Button variant="outline-light" onClick={handleShowModal}>
              Sign Up / Login
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Carousel Section */}
      <Carousel className="homepage-carousel">
        {carouselImages.map((img, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-100" src={img.src} alt={img.alt} />
            <Carousel.Caption>
              <h3>{img.captionTitle}</h3>
              <p>{img.captionText}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Additional Content Section */}
      <Container className="mt-5 text-center  content-section fade-in">
        <h2>Welcome to Our Store</h2>
        <p>
          Shop the latest products with unbeatable prices. Enjoy exclusive offers, quality guaranteed,
          and an amazing shopping experience.
        </p>
        <Button variant="primary" onClick={handleShopNow}>
          Shop Now
        </Button>
      </Container>

      {/* Authentication Modal */}
      <Modal show={showModal} onHide={handleCloseModal}  className="custom-auth-modal">
        <Modal.Header closeButton className="custom-auth-modal-header">
          <Modal.Title>{isSignup ? "Sign Up" : "Login"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-auth-modal-body">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              {errors.username && <p className="text-danger">{errors.username}</p>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              {errors.password && <p className="text-danger">{errors.password}</p>}
            </Form.Group>
            {isSignup && (
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                />
                {errors.confirmPassword && (
                  <p className="text-danger">{errors.confirmPassword}</p>
                )}
              </Form.Group>
            )}
            <Button type="submit" variant="primary" className="w-100">
              {isSignup ? "Sign Up" : "Login"}
            </Button>
          </Form>
          <p className="text-center mt-3">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              className="toggle-btn"
              onClick={toggleForm}
              style={{ cursor: "pointer", color: "#007bff" }}
            >
              {isSignup ? "Login" : "Sign Up"}
            </span>
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LoggedOutHomePage;
