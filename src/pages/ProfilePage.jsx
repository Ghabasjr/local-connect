import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaUsers, FaEdit } from 'react-icons/fa';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setEditData(userData);
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(editData));
    setUser(editData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  if (!user) {
    return (
      <Container className="mt-5">
        <p>Please login to view your profile</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body className="text-center">
              <div className="mb-3">
                <FaUser size={80} className="text-primary" />
              </div>
              <h4>{user.name}</h4>
              <p className="text-muted">{user.email}</p>
              <Badge bg="success">Active</Badge>
            </Card.Body>
          </Card>

          <Card className="mt-3">
            <Card.Body>
              <h6 className="mb-3">Profile Stats</h6>
              <div className="d-flex justify-content-between mb-2">
                <span>Friends:</span>
                <strong>24</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Communities:</span>
                <strong>3</strong>
              </div>
              <div className="d-flex justify-content-between">
                <span>Posts:</span>
                <strong>12</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5>Profile Information</h5>
                <Button
                  variant={isEditing ? "success" : "outline-primary"}
                  size="sm"
                  onClick={isEditing ? handleSave : handleEdit}
                >
                  <FaEdit className="me-2" />
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </div>

              {isEditing ? (
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label><FaUser className="me-2" />Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={editData.name || ''}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label><FaEnvelope className="me-2" />Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={editData.email || ''}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label><FaMapMarkerAlt className="me-2" />Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={editData.location || ''}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label><FaUsers className="me-2" />Community</Form.Label>
                    <Form.Select
                      name="community"
                      value={editData.community || ''}
                      onChange={handleChange}
                    >
                      <option value="">Select community</option>
                      <option value="Abuja Community">Abuja Community</option>
                      <option value="Lagos Local Connect">Lagos Local Connect</option>
                      <option value="Kano Network">Kano Network</option>
                    </Form.Select>
                  </Form.Group>
                </Form>
              ) : (
                <div>
                  <div className="mb-3">
                    <strong><FaUser className="me-2" />Full Name:</strong>
                    <p>{user.name}</p>
                  </div>
                  <div className="mb-3">
                    <strong><FaEnvelope className="me-2" />Email:</strong>
                    <p>{user.email}</p>
                  </div>
                  <div className="mb-3">
                    <strong><FaMapMarkerAlt className="me-2" />Location:</strong>
                    <p>{user.location || 'Not specified'}</p>
                  </div>
                  <div className="mb-3">
                    <strong><FaUsers className="me-2" />Community:</strong>
                    <p>{user.community || 'Not joined yet'}</p>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>

          <Card className="mt-3">
            <Card.Body>
              <h5 className="mb-3">Recent Activity</h5>
              <div className="mb-3">
                <small className="text-muted">Today, 10:30 AM</small>
                <p>Posted in Abuja Community</p>
              </div>
              <hr />
              <div className="mb-3">
                <small className="text-muted">Yesterday, 3:45 PM</small>
                <p>Joined Lagos Local Connect</p>
              </div>
              <hr />
              <div>
                <small className="text-muted">2 days ago</small>
                <p>Connected with 3 new friends</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
