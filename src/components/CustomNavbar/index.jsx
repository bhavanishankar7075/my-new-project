// src/components/CustomNavbar.js
import React, { useState, useEffect, useContext } from "react";
import { Navbar, Container, Nav, Button, Form } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { CartContext } from "../CartContext"; // Ensure your CartContext is set up
import "./Navbar.css";

const CustomNavbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useContext(CartContext);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize.
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // On mount, check login state.
  useEffect(() => {
    const loggedInFlag = localStorage.getItem("loggedIn");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInFlag === "true" && storedUser && storedUser.username) {
      setLoggedInUser(storedUser.username);
    }
  }, []);

  // When the user logs out, clear state and navigate to /loggedouthomepage.
  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedInUser(null);
    navigate("/loggedouthomepage");
  };

  // If user is not logged in, CustomNavbar is not rendered.
  if (!loggedInUser) return null;

  return (
    <Navbar className="custom-navbar fade-in slide-in-right" sticky="top">
      <Container className="navbar-container fade-in slide-in-left">
        <Navbar.Brand as={Link} to="/" className="navbar-brand fade-in slide-in-left">
          Ecommerce
        </Navbar.Brand>
        {loggedInUser && windowWidth >= 992 && (
          <Form className="search-form">
            <Form.Control
              type="text"
              placeholder="Search products..."
              onChange={(e) => onSearch && onSearch(e.target.value)}
            />
          </Form>
        )}
        <div className="full-nav">
          <Nav.Link as={Link} to="/" className="nav-links">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/products" className="nav-links">
            Products
          </Nav.Link>
          <Nav.Link as={Link} to="/cart" className="nav-links">
            Cart{" "}
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.length}</span>
            )}
          </Nav.Link>
          <Button variant="outline-light" className="auth-btn" onClick={handleLogout}>
            {windowWidth < 992 ? (
              <FaSignOutAlt className="logout-icon" />
            ) : (
              "Logout"
            )}
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
