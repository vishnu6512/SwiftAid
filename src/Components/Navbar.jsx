import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const styles = {
  navbar: {
    backgroundColor: '#1a237e',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  brand: {
    color: '#ffffff',
    fontSize: '1.5rem',
    fontWeight: '600',
    '&:hover': {
      color: '#ffffff'
    }
  },
  navLink: {
    color: 'rgba(255, 255, 255, 0.9)',
    margin: '0 0.5rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: '#e53935'
    }
  },
  activeLink: {
    color: '#e53935',
    fontWeight: '500'
  }
};

function BasicExample() {
  return (
    <Navbar expand="lg" style={styles.navbar} variant="dark">
      <Container>
        <Navbar.Brand 
          as={Link} 
          to="/" 
          style={styles.brand}
        >
          SwiftAid
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              style={styles.navLink}
              className="nav-link"
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/new-request" 
              style={styles.navLink}
              className="nav-link"
            >
              New Request
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/requests" 
              style={styles.navLink}
              className="nav-link"
            >
              Requests
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/volunteers" 
              style={styles.navLink}
              className="nav-link"
            >
              Volunteers
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;