import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaUsers, FaCheckCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    community: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      Swal.fire({
        title: 'Missing Information',
        text: 'Please fill all required fields',
        icon: 'warning',
        confirmButtonColor: '#3b82f6'
      });
      return;
    }

    if (formData.password.length < 6) {
      Swal.fire({
        title: 'Weak Password',
        text: 'Password must be at least 6 characters long',
        icon: 'warning',
        confirmButtonColor: '#3b82f6'
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        title: 'Password Mismatch',
        text: 'Passwords do not match!',
        icon: 'error',
        confirmButtonColor: '#3b82f6'
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        location: formData.location,
        community: formData.community
      };

      localStorage.setItem('user', JSON.stringify(newUser));

      Swal.fire({
        title: 'Registration Successful!',
        text: 'Your account has been created successfully',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });

      setIsLoading(false);
      navigate('/login');
    }, 1000);
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)', minHeight: '100vh', paddingTop: '40px', paddingBottom: '60px' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={9} xl={8}>
            <Card className="modern-card border-0 shadow-lg fade-in">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌐</div>
                  <h2 className="fw-bold mb-2" style={{ color: '#1f2937' }}>Create Your Account</h2>
                  <p className="text-muted">Join Local Connect and start building meaningful connections</p>
                </div>

                <Form onSubmit={handleRegister} className="modern-form">
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name *</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0" style={{ borderRadius: '10px 0 0 10px', border: '2px solid #e5e7eb', borderRight: 'none' }}>
                            <FaUser className="text-muted" />
                          </span>
                          <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border-start-0 ps-0"
                            style={{ borderLeft: 'none' }}
                            required
                          />
                        </div>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email Address *</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0" style={{ borderRadius: '10px 0 0 10px', border: '2px solid #e5e7eb', borderRight: 'none' }}>
                            <FaEnvelope className="text-muted" />
                          </span>
                          <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border-start-0 ps-0"
                            style={{ borderLeft: 'none' }}
                            required
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Password *</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0" style={{ borderRadius: '10px 0 0 10px', border: '2px solid #e5e7eb', borderRight: 'none' }}>
                            <FaLock className="text-muted" />
                          </span>
                          <Form.Control
                            type="password"
                            name="password"
                            placeholder="Create password"
                            value={formData.password}
                            onChange={handleChange}
                            className="border-start-0 ps-0"
                            style={{ borderLeft: 'none' }}
                            required
                          />
                        </div>
                        <Form.Text className="text-muted">
                          Must be at least 6 characters
                        </Form.Text>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm Password *</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0" style={{ borderRadius: '10px 0 0 10px', border: '2px solid #e5e7eb', borderRight: 'none' }}>
                            <FaCheckCircle className="text-muted" />
                          </span>
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="border-start-0 ps-0"
                            style={{ borderLeft: 'none' }}
                            required
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Location (Optional)</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0" style={{ borderRadius: '10px 0 0 10px', border: '2px solid #e5e7eb', borderRight: 'none' }}>
                            <FaMapMarkerAlt className="text-muted" />
                          </span>
                          <Form.Control
                            type="text"
                            name="location"
                            placeholder="e.g., Abuja, Lagos"
                            value={formData.location}
                            onChange={handleChange}
                            className="border-start-0 ps-0"
                            style={{ borderLeft: 'none' }}
                          />
                        </div>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Community (Optional)</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0" style={{ borderRadius: '10px 0 0 10px', border: '2px solid #e5e7eb', borderRight: 'none' }}>
                            <FaUsers className="text-muted" />
                          </span>
                          <Form.Select
                            name="community"
                            value={formData.community}
                            onChange={handleChange}
                            className="border-start-0"
                            style={{ borderLeft: 'none', borderRadius: '0 10px 10px 0', border: '2px solid #e5e7eb' }}
                          >
                            <option value="">Select a community</option>
                            <option value="Abuja Community">Abuja Community</option>
                            <option value="Lagos Local Connect">Lagos Local Connect</option>
                            <option value="Kano Network">Kano Network</option>
                            <option value="Port Harcourt Hub">Port Harcourt Hub</option>
                            <option value="Ibadan Connect">Ibadan Connect</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Check
                      type="checkbox"
                      label={
                        <span style={{ fontSize: '0.9rem' }}>
                          I agree to the{' '}
                          <Link to="/terms" style={{ textDecoration: 'none', color: '#3b82f6' }}>Terms of Service</Link>
                          {' '}and{' '}
                          <Link to="/privacy" style={{ textDecoration: 'none', color: '#3b82f6' }}>Privacy Policy</Link>
                        </span>
                      }
                      required
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 btn-submit mb-3"
                    disabled={isLoading}
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                      border: 'none',
                      padding: '14px',
                      fontSize: '1.05rem',
                      fontWeight: 600
                    }}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>

                  <div className="text-center">
                    <p className="mb-0">
                      Already have an account?{' '}
                      <Link to="/login" style={{ textDecoration: 'none', color: '#3b82f6', fontWeight: 600 }}>
                        Login Here
                      </Link>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;
