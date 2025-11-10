import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const CreateCommunity = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    category: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCommunity = {
      id: Date.now(),
      ...formData,
      members: 1,
      createdAt: new Date().toISOString()
    };

    const communities = JSON.parse(localStorage.getItem('communities') || '[]');
    communities.push(newCommunity);
    localStorage.setItem('communities', JSON.stringify(communities));

    alert('Community created successfully!');
    handleClose();
    setFormData({ name: '', description: '', location: '', category: '' });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Community</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Community Name *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="e.g., Abuja Tech Community"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description *</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Describe your community..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              placeholder="City or neighborhood"
              value={formData.location}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="Neighbors">Neighbors</option>
              <option value="Interest Group">Interest Group</option>
              <option value="Professional">Professional</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create Community
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateCommunity;
