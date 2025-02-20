// src/components/ScrollToTopButton.js
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./index.css";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="scroll-to-top">
      {visible && (
        <Button variant="primary" onClick={scrollToTop} className="scroll-btn">
          ↑ Top
        </Button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
