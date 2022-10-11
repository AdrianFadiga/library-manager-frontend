import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { IContext, MyContext } from '../../context/MyContext';
import CreateUserModal from '../CreateUserModal';
import CreateCategoryModal from '../CreateCategoryModal';

function Header() {
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const {role} = useContext(MyContext) as IContext;
  const isAdmin = role === 'admin';

  return (
    <Navbar bg='dark' expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>Library Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/books')}>Books</Nav.Link>
            <Nav.Link onClick={() => navigate('/bookings')}>Bookings</Nav.Link>
            {isAdmin &&
            <> 
              <Nav.Link onClick={() => setShowUserModal(true)}>Users</Nav.Link>
              <Nav.Link onClick={() => setShowCategoryModal(true)}>Categories</Nav.Link>
            </>
            }
            <Nav.Link onClick={() => {navigate('/');
              localStorage.removeItem('authLibrary');}}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <CreateUserModal 
        showModal={showUserModal}
        setShowModal={setShowUserModal}
      />
      <CreateCategoryModal 
        showModal={showCategoryModal}
        setShowModal={setShowCategoryModal}
      />
    </Navbar>
  );
}

export default Header;