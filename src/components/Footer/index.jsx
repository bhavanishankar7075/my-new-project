import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const Footer = () => {
  return (
    <footer className="footer mt-5 py-4 bg-dark text-light">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>Your favorite eCommerce store.</p>
          </Col>
          <Col md={4}>
            <h5>Customer Service</h5>
            <ul>
              <li>Contact Us</li>
              <li>FAQ</li>
              <li>Returns</li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <p>Social media links</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
