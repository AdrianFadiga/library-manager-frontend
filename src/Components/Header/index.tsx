import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  return (
    <Navbar bg='dark' expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>Library Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/books')}>Books</Nav.Link>
            <Nav.Link onClick={() => navigate('/bookings')}>Bookings</Nav.Link>
            <Nav.Link onClick={() => navigate('/users')}>Users</Nav.Link>
            <Nav.Link onClick={() => navigate('/categories')}>Categories</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;