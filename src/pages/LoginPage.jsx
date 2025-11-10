import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        title: 'Missing Information',
        text: 'Please enter both email and password',
        icon: 'warning',
        confirmButtonColor: '#3b82f6',
        confirmButtonText: 'OK'
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({
        email,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
      }));

      Swal.fire({
        title: 'Login Successful!',
        text: 'Welcome back to Local Connect',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });

      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const handleSocialLogin = (provider) => {
    Swal.fire({
      title: 'Coming Soon',
      text: `${provider} login will be available soon!`,
      icon: 'info',
      confirmButtonColor: '#3b82f6'
    });
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)', minHeight: '100vh', paddingTop: '60px', paddingBottom: '60px' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8} xl={6}>
            <Card className="modern-card border-0 shadow-lg fade-in">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌐</div>
                  <h2 className="fw-bold mb-2" style={{ color: '#1f2937' }}>Welcome Back!</h2>
                  <p className="text-muted">Login to continue to Local Connect</p>
                </div>

                <Form onSubmit={handleLogin} className="modern-form">
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0" style={{ borderRadius: '10px 0 0 10px', border: '2px solid #e5e7eb', borderRight: 'none' }}>
                        <FaEnvelope className="text-muted" />
                      </span>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-start-0 ps-0"
                        style={{ borderLeft: 'none' }}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0" style={{ borderRadius: '10px 0 0 10px', border: '2px solid #e5e7eb', borderRight: 'none' }}>
                        <FaLock className="text-muted" />
                      </span>
                      <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-start-0 ps-0"
                        style={{ borderLeft: 'none' }}
                      />
                    </div>
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      style={{ fontSize: '0.9rem' }}
                    />
                    <Link to="/forgot-password" style={{ fontSize: '0.9rem', textDecoration: 'none', color: '#3b82f6', fontWeight: 500 }}>
                      Forgot Password?
                    </Link>
                  </div>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 btn-submit mb-3"
                    disabled={isLoading}
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                      border: 'none',
                      padding: '14px',
                      fontSize: '1.05rem',
                      fontWeight: 600
                    }}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>

                  <div className="text-center mb-3">
                    <small className="text-muted">Or continue with</small>
                  </div>

                  <Row className="g-2 mb-4">
                    <Col>
                      <Button
                        variant="outline-secondary"
                        className="w-100"
                        onClick={() => handleSocialLogin('Google')}
                        style={{ borderRadius: '10px', padding: '10px', border: '2px solid #e5e7eb' }}
                      >
                        <FaGoogle className="me-2" style={{ color: '#DB4437' }} />
                        Google
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="outline-secondary"
                        className="w-100"
                        onClick={() => handleSocialLogin('Facebook')}
                        style={{ borderRadius: '10px', padding: '10px', border: '2px solid #e5e7eb' }}
                      >
                        <FaFacebook className="me-2" style={{ color: '#1877F2' }} />
                        Facebook
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="outline-secondary"
                        className="w-100"
                        onClick={() => handleSocialLogin('Twitter')}
                        style={{ borderRadius: '10px', padding: '10px', border: '2px solid #e5e7eb' }}
                      >
                        <FaTwitter className="me-2" style={{ color: '#1DA1F2' }} />
                        Twitter
                      </Button>
                    </Col>
                  </Row>

                  <div className="text-center">
                    <p className="mb-0">
                      Don't have an account?{' '}
                      <Link to="/register" style={{ textDecoration: 'none', color: '#3b82f6', fontWeight: 600 }}>
                        Create Account
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

export default LoginPage;
