import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CustomNavbar from "./components/CustomNavbar/index.jsx"
import ProductsList from "./components/ProductsList/index.jsx";
import HomePage from "./components/HomePage/index.jsx";               // UI for logged-in users
import LoggedOutHomePage from "./components/LoggedOutHomePage/index.jsx"; // UI for guests (signup/login)
import CartPage from "./components/CartPage/index.jsx";
import ProductDetail from "./components/ProductDetail/index.jsx";
import ProtectedRoute from "./components/ProtectedRoute/index.jsx";
import Footer from "./components/Footer/index.jsx";
import ScrollToTopButton from "./components/ScrollToButton/index.jsx";
import "./App.css";
import CheckoutPage from "./components/CheckOutPage/index.jsx";
import CancelPage from "./components/CancelPage/index.jsx";
import SuccessPage from "./components/SuccessPage/index.jsx";
import OrderTracking from "./components/OrderTrackingPage/index.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

<ToastContainer position="top-right" />





const App = () => {
  // Initialize isLoggedIn from localStorage so reloads keep state.
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("loggedIn") === "true");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    // Sync state with localStorage on mount.
    const loggedInFlag = localStorage.getItem("loggedIn");
    setIsLoggedIn(loggedInFlag === "true");
  }, []);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);
  const handleSearch = (query) => setSearchQuery(query);
  const handleSortChange = (order) => setSortOrder(order);

  return (
    <Router>
      <Routes>
        {/* Public route: the logged-out home page (signup/login) */}
        <Route path="/loggedouthomepage" element={<LoggedOutHomePage />} />
        {/* Protected routes */}
        <Route
          path="/*"
          element={
            isLoggedIn ? (
              <>
                <CustomNavbar
                  onLogin={handleLogin}
                  onLogout={handleLogout}
                  onSearch={handleSearch}
                  onSortChange={handleSortChange}
                />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  
                  <Route
                    path="/products"
                    element={
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <ProductsList searchQuery={searchQuery} /*  products={productsArray} */ sortOrder={sortOrder} />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/products/:id"
                    element={
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <ProductDetail />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <CartPage />
                      </ProtectedRoute>
                    }
                  />



                  <Route
                    path="/track-order"
                    element={
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <OrderTracking />
                      </ProtectedRoute>
                    }
                  />


                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <CheckoutPage />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/success"
                    element={
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <SuccessPage />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/cancel"
                    element={
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <CancelPage />
                      </ProtectedRoute>
                    }
                  />


                  
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </>
            ) : (
              // If not logged in, redirect to the logged-out home page.
              <Navigate to="/loggedouthomepage" replace />
            )
          }
        />
      </Routes>
      <Footer />
      <ScrollToTopButton />

    </Router>
  );
};

export default App;



















































/* // src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CustomNavbar from "./components/CustomNavbar";
import ProductsList from "./components/ProductsList";
import HomePage from "./components/HomePage";
import LoggedOutHomePage from "./components/LoggedOutHomePage";
import CartPage from "./components/CartPage";
import ProductDetail from "./components/ProductDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToButton";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  // Check login status on mount.
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const loggedInFlag = localStorage.getItem("loggedIn");
    if (storedUser && storedUser.username && loggedInFlag === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);
  const handleSearch = (query) => setSearchQuery(query);
  const handleSortChange = (order) => setSortOrder(order);

  return (
    <Router>
      <Routes>
        
        <Route path="/loggedouthomepage" element={<LoggedOutHomePage />} />
        <Route
          path="/*"
          element={
            isLoggedIn ? (
              <>
                <CustomNavbar
                  onLogin={handleLogin}
                  onLogout={handleLogout}
                  onSearch={handleSearch}
                  onSortChange={handleSortChange}
                />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route
                    path="/products"
                    element={
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <ProductsList searchQuery={searchQuery} sortOrder={sortOrder} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <CartPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/products/:id"
                    element={
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <ProductDetail />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </>
            ) : (
              // If not logged in, redirect to logged-out home page
              <Navigate to="/loggedouthomepage" replace />
            )
          }
        />
      </Routes>
      <Footer />
      <ScrollToTopButton />
    </Router>
  );
};

export default App;
 */