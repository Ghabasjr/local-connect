import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaComments, FaSignOutAlt, FaBell } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './Navbar.css';

const NavbarComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user');
        Swal.fire({
          title: 'Logged Out!',
          text: 'You have been successfully logged out.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
        navigate('/login');
      }
    });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar className="modern-navbar" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-modern">
          <span className="brand-icon">🌐</span>
          <span className="brand-text">Local Connect</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/dashboard"
              className={`nav-link-modern ${isActive('/dashboard') ? 'active' : ''}`}
            >
              <FaHome className="me-2" /> Dashboard
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/communities"
              className={`nav-link-modern ${isActive('/communities') ? 'active' : ''}`}
            >
              <FaUsers className="me-2" /> Communities
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/messages"
              className={`nav-link-modern ${isActive('/messages') ? 'active' : ''}`}
            >
              <FaComments className="me-2" /> Messages
              <Badge bg="danger" pill className="ms-2">3</Badge>
            </Nav.Link>
          </Nav>
          <Nav className="align-items-center">
            {user ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/notifications"
                  className={`nav-link-modern position-relative ${isActive('/notifications') ? 'active' : ''}`}
                >
                  <FaBell className="fs-5" />
                  <Badge
                    bg="danger"
                    pill
                    className="position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: '0.65rem' }}
                  >
                    3
                  </Badge>
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/profile"
                  className={`nav-link-modern ${isActive('/profile') ? 'active' : ''}`}
                >
                  <div className="user-profile-nav">
                    <div className="user-avatar-small">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="ms-2">{user.name}</span>
                  </div>
                </Nav.Link>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                  className="logout-btn-modern ms-2"
                >
                  <FaSignOutAlt className="me-1" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                  className={`nav-link-modern ${isActive('/login') ? 'active' : ''}`}
                >
                  Login
                </Nav.Link>
                <Link to="/register">
                  <Button variant="light" size="sm" className="ms-2 register-btn-nav">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
