import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { FaEnvelope, FaArrowLeft, FaCheckCircle, FaPaperPlane } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        title: 'Email Required',
        text: 'Please enter your email address',
        icon: 'warning',
        confirmButtonColor: '#3b82f6'
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        title: 'Invalid Email',
        text: 'Please enter a valid email address',
        icon: 'error',
        confirmButtonColor: '#3b82f6'
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);

      Swal.fire({
        title: 'Email Sent!',
        text: 'Password reset instructions have been sent to your email',
        icon: 'success',
        confirmButtonColor: '#3b82f6',
        confirmButtonText: 'OK'
      }).then(() => {
        // In a real app, you would navigate to a "check your email" page
        // For demo purposes, we'll navigate to reset password page after 3 seconds
        setTimeout(() => {
          navigate('/reset-password');
        }, 2000);
      });
    }, 1500);
  };

  const handleResendEmail = () => {
    Swal.fire({
      title: 'Email Resent!',
      text: 'A new password reset email has been sent',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
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
                    {emailSent ? (
                      <FaCheckCircle style={{ fontSize: '2.5rem', color: 'white' }} />
                    ) : (
                      <FaEnvelope style={{ fontSize: '2.5rem', color: 'white' }} />
                    )}
                  </div>

                  {!emailSent ? (
                    <>
                      <h2 className="fw-bold mb-2" style={{ color: '#1f2937' }}>Forgot Password?</h2>
                      <p className="text-muted">
                        No worries! Enter your email address and we'll send you instructions to reset your password.
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="fw-bold mb-2" style={{ color: '#1f2937' }}>Check Your Email</h2>
                      <p className="text-muted">
                        We've sent password reset instructions to:
                      </p>
                      <p className="fw-bold text-primary">{email}</p>
                      <p className="text-muted small">
                        Please check your inbox and spam folder
                      </p>
                    </>
                  )}
                </div>

                {!emailSent ? (
                  <Form onSubmit={handleSubmit} className="modern-form">
                    <Form.Group className="mb-4">
                      <Form.Label>Email Address</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0" style={{ borderRadius: '10px 0 0 10px', border: '2px solid #e5e7eb', borderRight: 'none' }}>
                          <FaEnvelope className="text-muted" />
                        </span>
                        <Form.Control
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="border-start-0 ps-0"
                          style={{ borderLeft: 'none' }}
                          autoFocus
                        />
                      </div>
                      <Form.Text className="text-muted">
                        Enter the email address associated with your account
                      </Form.Text>
                    </Form.Group>

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
                          Sending Email...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="me-2" />
                          Send Reset Instructions
                        </>
                      )}
                    </Button>

                    <div className="text-center">
                      <Link to="/login" style={{ textDecoration: 'none', color: '#6b7280', fontWeight: 500 }}>
                        <FaArrowLeft className="me-2" />
                        Back to Login
                      </Link>
                    </div>
                  </Form>
                ) : (
                  <div>
                    <div className="mb-4 p-3" style={{ background: '#dbeafe', borderRadius: '12px', border: '2px solid #3b82f6' }}>
                      <h6 className="fw-bold mb-2" style={{ color: '#1f2937' }}>What's Next?</h6>
                      <ol className="mb-0 ps-3" style={{ fontSize: '0.9rem', color: '#4b5563' }}>
                        <li className="mb-2">Check your email inbox for a message from Local Connect</li>
                        <li className="mb-2">Click the reset password link in the email</li>
                        <li className="mb-2">Create a new password for your account</li>
                        <li>Login with your new password</li>
                      </ol>
                    </div>

                    <div className="d-grid gap-2">
                      <Button
                        variant="outline-primary"
                        onClick={handleResendEmail}
                        style={{ borderRadius: '10px', padding: '12px', fontWeight: 600 }}
                      >
                        Resend Email
                      </Button>

                      <Button
                        variant="outline-secondary"
                        onClick={() => navigate('/login')}
                        style={{ borderRadius: '10px', padding: '12px', fontWeight: 600 }}
                      >
                        <FaArrowLeft className="me-2" />
                        Back to Login
                      </Button>
                    </div>

                    <div className="mt-4 text-center">
                      <small className="text-muted">
                        Didn't receive the email? Check your spam folder or{' '}
                        <button
                          onClick={handleResendEmail}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#3b82f6',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            padding: 0,
                            font: 'inherit'
                          }}
                        >
                          resend
                        </button>
                      </small>
                    </div>
                  </div>
                )}

                {!emailSent && (
                  <div className="mt-4 p-3 text-center" style={{ background: '#f9fafb', borderRadius: '12px' }}>
                    <small className="text-muted">
                      Don't have an account?{' '}
                      <Link to="/register" style={{ textDecoration: 'none', color: '#3b82f6', fontWeight: 600 }}>
                        Create Account
                      </Link>
                    </small>
                  </div>
                )}
              </Card.Body>
            </Card>

            {/* Security Note */}
            <div className="text-center mt-4">
              <small className="text-muted">
                🔒 For your security, we never store your password in plain text
              </small>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPasswordPage;
