import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // If you're using React Router for routing
import '../css/ErrorPage.css'
const ErrorPage = () => {
  return (
    <Container className="error-container">
      <Row>
        <Col md={8} className="mx-auto text-center">
          <h1 className="display-4">404 - Page Not Found</h1>
          <p className="lead">Sorry, the page you're looking for doesn't exist.</p>
          <Link to="/">
            <Button variant="primary">Go to Sign up page</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
