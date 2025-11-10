import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Card, Row, Col, ProgressBar } from 'react-bootstrap';
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Password strength calculation
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 20;
    if (/\d/.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 15;
    return Math.min(strength, 100);
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  const getStrengthColor = () => {
    if (passwordStrength < 40) return 'danger';
    if (passwordStrength < 70) return 'warning';
    return 'success';
  };

  const getStrengthText = () => {
    if (passwordStrength < 40) return 'Weak';
    if (passwordStrength < 70) return 'Medium';
    return 'Strong';
  };

  // Password requirements
  const requirements = [
    { text: 'At least 8 characters', met: formData.password.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(formData.password) },
    { text: 'Contains number', met: /\d/.test(formData.password) },
    { text: 'Contains special character', met: /[^a-zA-Z0-9]/.test(formData.password) }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.password.length < 8) {
      Swal.fire({
        title: 'Password Too Short',
        text: 'Password must be at least 8 characters long',
        icon: 'warning',
        confirmButtonColor: '#3b82f6'
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        title: 'Passwords Don\'t Match',
        text: 'Please make sure your passwords match',
        icon: 'error',
        confirmButtonColor: '#3b82f6'
      });
      return;
    }

    if (passwordStrength < 40) {
      Swal.fire({
        title: 'Weak Password',
        text: 'Please choose a stronger password',
        icon: 'warning',
        confirmButtonColor: '#3b82f6'
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);

      Swal.fire({
        title: 'Password Reset Successful!',
        text: 'Your password has been reset successfully',
        icon: 'success',
        confirmButtonColor: '#3b82f6',
        confirmButtonText: 'Login Now'
      }).then(() => {
        navigate('/login');
      });
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)'
                  }}>
                    <FaLock style={{ fontSize: '2.5rem', color: 'white' }} />
                  </div>
                  <h2 className="fw-bold mb-2" style={{ color: '#1f2937' }}>Reset Password</h2>
                  <p className="text-muted">
                    Please enter your new password
                  </p>
                </div>

                <Form onSubmit={handleSubmit} className="modern-form">
                  {/* New Password */}
                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0" style={{ borderRadius: '10px 0 0 10px', border: '2px solid #e5e7eb', borderRight: 'none' }}>
                        <FaLock className="text-muted" />
                      </span>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Enter new password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border-start-0 border-end-0 ps-0"
                        style={{ borderLeft: 'none', borderRight: 'none' }}
                        autoFocus
                      />
                      <Button
                        variant="link"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          borderRadius: '0 10px 10px 0',
                          border: '2px solid #e5e7eb',
                          borderLeft: 'none',
                          color: '#6b7280'
                        }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </div>

                    {/* Password Strength Meter */}
                    {formData.password && (
                      <div className="mt-2">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <small className="text-muted">Password Strength:</small>
                          <small className={`fw-bold text-${getStrengthColor()}`}>
                            {getStrengthText()}
                          </small>
                        </div>
                        <ProgressBar
                          now={passwordStrength}
                          variant={getStrengthColor()}
                          style={{ height: '8px', borderRadius: '4px' }}
                        />
                      </div>
                    )}
                  </Form.Group>

                  {/* Confirm Password */}
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0" style={{ borderRadius: '10px 0 0 10px', border: '2px solid #e5e7eb', borderRight: 'none' }}>
                        <FaLock className="text-muted" />
                      </span>
                      <Form.Control
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm new password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="border-start-0 border-end-0 ps-0"
                        style={{ borderLeft: 'none', borderRight: 'none' }}
                      />
                      <Button
                        variant="link"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{
                          borderRadius: '0 10px 10px 0',
                          border: '2px solid #e5e7eb',
                          borderLeft: 'none',
                          color: '#6b7280'
                        }}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </div>

                    {/* Password Match Indicator */}
                    {formData.confirmPassword && (
                      <div className="mt-2">
                        {formData.password === formData.confirmPassword ? (
                          <small className="text-success d-flex align-items-center">
                            <FaCheckCircle className="me-1" /> Passwords match
                          </small>
                        ) : (
                          <small className="text-danger d-flex align-items-center">
                            <FaTimesCircle className="me-1" /> Passwords don't match
                          </small>
                        )}
                      </div>
                    )}
                  </Form.Group>

                  {/* Password Requirements */}
                  {formData.password && (
                    <div className="mb-4 p-3" style={{ background: '#f9fafb', borderRadius: '12px' }}>
                      <small className="fw-bold d-block mb-2" style={{ color: '#1f2937' }}>
                        Password Requirements:
                      </small>
                      {requirements.map((req, index) => (
                        <div key={index} className="d-flex align-items-center mb-1">
                          {req.met ? (
                            <FaCheckCircle className="text-success me-2" style={{ fontSize: '0.8rem' }} />
                          ) : (
                            <FaTimesCircle className="text-muted me-2" style={{ fontSize: '0.8rem' }} />
                          )}
                          <small className={req.met ? 'text-success' : 'text-muted'}>
                            {req.text}
                          </small>
                        </div>
                      ))}
                    </div>
                  )}

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
                        Resetting Password...
                      </>
                    ) : (
                      'Reset Password'
                    )}
                  </Button>

                  <div className="text-center">
                    <Link to="/login" style={{ textDecoration: 'none', color: '#6b7280', fontWeight: 500 }}>
                      Cancel and go back to Login
                    </Link>
                  </div>
                </Form>

                {/* Security Tips */}
                <div className="mt-4 p-3" style={{ background: '#dbeafe', borderRadius: '12px', border: '2px solid #3b82f6' }}>
                  <h6 className="fw-bold mb-2" style={{ color: '#1f2937', fontSize: '0.9rem' }}>
                    💡 Password Tips:
                  </h6>
                  <ul className="mb-0 ps-3" style={{ fontSize: '0.85rem', color: '#4b5563' }}>
                    <li>Use a unique password you don't use elsewhere</li>
                    <li>Mix uppercase, lowercase, numbers, and symbols</li>
                    <li>Avoid personal information like names or birthdays</li>
                    <li>Consider using a password manager</li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResetPasswordPage;
