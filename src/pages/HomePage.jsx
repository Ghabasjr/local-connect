import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUsers, FaMapMarkedAlt, FaComments, FaCalendarAlt, FaShieldAlt, FaBell } from 'react-icons/fa';

const HomePage = () => {
  const features = [
    {
      icon: <FaUsers />,
      title: 'Connect Locally',
      description: 'Find and connect with family, friends, and neighbors in your community.'
    },
    {
      icon: <FaMapMarkedAlt />,
      title: 'Interactive Maps',
      description: 'Discover local events, meetups, and community members on an interactive map.'
    },
    {
      icon: <FaComments />,
      title: 'Real-time Chat',
      description: 'Stay connected with instant messaging and group conversations.'
    },
    {
      icon: <FaCalendarAlt />,
      title: 'Community Events',
      description: 'Organize and participate in local events, gatherings, and activities.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Safe & Secure',
      description: 'Your privacy and security are our top priority with end-to-end protection.'
    },
    {
      icon: <FaBell />,
      title: 'Smart Notifications',
      description: 'Stay updated with personalized notifications about your community.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <Container className="hero-content">
          <h1 className="hero-title fade-in">Local Connect</h1>
          <p className="hero-subtitle fade-in">
            Connect with family and friends in your community
          </p>
          <p className="hero-description fade-in">
            Build stronger relationships with people nearby. Share updates,
            organize events, and stay connected with your local community.
            Experience the power of local connections.
          </p>
          <div className="mt-4">
            <Link to="/register">
              <button className="btn-modern btn-primary me-3 mb-3">
                Get Started Free
              </button>
            </Link>
            <Link to="/login">
              <button className="btn-modern btn-outline me-3 mb-3">
                Login
              </button>
            </Link>
          </div>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="feature-section">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">Why Choose Local Connect?</h2>
          <p className="text-muted fs-5">
            Everything you need to build a thriving local community
          </p>
        </div>
        <Row>
          {features.map((feature, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="feature-card fade-in">
                <Card.Body>
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Stats Section */}
      <div style={{ background: '#f9fafb', padding: '60px 0' }}>
        <Container>
          <Row className="text-center">
            <Col md={3} sm={6} className="mb-4">
              <div className="stats-card">
                <div className="stats-number">10K+</div>
                <div className="stats-label">Active Users</div>
              </div>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <div className="stats-card" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                <div className="stats-number">500+</div>
                <div className="stats-label">Communities</div>
              </div>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <div className="stats-card" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
                <div className="stats-number">2K+</div>
                <div className="stats-label">Events Hosted</div>
              </div>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <div className="stats-card" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}>
                <div className="stats-number">50+</div>
                <div className="stats-label">Cities</div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* CTA Section */}
      <Container className="text-center" style={{ padding: '80px 0' }}>
        <h2 className="display-5 fw-bold mb-4">Ready to Get Started?</h2>
        <p className="text-muted fs-5 mb-4">
          Join thousands of community members already connecting locally
        </p>
        <Link to="/register">
          <button className="btn-modern btn-primary" style={{
            fontSize: '1.1rem',
            padding: '16px 40px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            color: 'white'
          }}>
            Create Your Free Account
          </button>
        </Link>
      </Container>
    </div>
  );
};

export default HomePage;
