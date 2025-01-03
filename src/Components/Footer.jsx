import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const styles = {
  footer: {
    backgroundColor: '#1a237e',
    color: '#ffffff',
    padding: '3rem 0 2rem',
    marginTop: 'auto'
  },
  title: {
    color: '#ffffff',
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '1.25rem',
    borderBottom: '2px solid #e53935',
    paddingBottom: '0.5rem',
    display: 'inline-block'
  },
  link: {
    color: 'rgba(255, 255, 255, 0.9)',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    ':hover': {
      color: '#e53935'
    }
  },
  text: {
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: '1.6'
  },
  copyright: {
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    marginTop: '2rem',
    paddingTop: '1.5rem',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center'
  }
};

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h5 style={styles.title}>About SwiftAid</h5>
            <p style={styles.text}>
              Empowering communities to prepare for and respond to disasters through 
              quick and efficient coordination of resources and volunteers.
            </p>
          </Col>
          <Col md={4} className="mb-4 mb-md-0">
            <h5 style={styles.title}>Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" style={styles.link}>Home</a>
              </li>
              <li className="mb-2">
                <a href="/new-request" style={styles.link}>New Request</a>
              </li>
              <li className="mb-2">
                <a href="/requests" style={styles.link}>View Requests</a>
              </li>
              <li className="mb-2">
                <a href="/volunteers" style={styles.link}>Volunteer</a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 style={styles.title}>Contact Info</h5>
            <p style={styles.text}>
              <strong>Email:</strong> help@swiftaid.com<br />
              <strong>Emergency:</strong> (555) 123-4567<br />
              <strong>Support:</strong> (555) 987-6543
            </p>
          </Col>
        </Row>
        <div style={styles.copyright}>
          <p className="mb-0">
            &copy; {new Date().getFullYear()} SwiftAid. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;