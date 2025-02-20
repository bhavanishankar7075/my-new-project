// LoginPage.js
import React from "react";
import { Container } from "react-bootstrap";

const LoginPage = () => {
  return (
    <Container className="mt-4">
      <h1>Please Log In</h1>
      <p>You must be logged in to access this site.</p>
      <p>Click the "Sign Up / Login" button in the navbar to log in.</p>
    </Container>
  );
};

export default LoginPage;
