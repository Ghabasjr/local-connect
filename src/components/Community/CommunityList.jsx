import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Row, Col } from 'react-bootstrap';
import { FaUsers, FaPlus } from 'react-icons/fa';
import CreateCommunity from './CreateCommunity';

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const storedCommunities = JSON.parse(localStorage.getItem('communities') || '[]');

    if (storedCommunities.length === 0) {
      const defaultCommunities = [
        {
          id: 1,
          name: 'Abuja Community',
          description: 'Connect with family and friends in Abuja',
          members: 25,
          location: 'Abuja',
          category: 'Neighbors'
        },
        {
          id: 2,
          name: 'Lagos Local Connect',
          description: 'Lagos neighborhood network',
          members: 42,
          location: 'Lagos',
          category: 'Neighbors'
        }
      ];
      setCommunities(defaultCommunities);
      localStorage.setItem('communities', JSON.stringify(defaultCommunities));
    } else {
      setCommunities(storedCommunities);
    }
  }, [showCreateModal]);

  const handleJoinCommunity = (communityId) => {
    alert(`Joined community ${communityId}`);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Communities</h4>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowCreateModal(true)}
        >
          <FaPlus className="me-2" />
          Create Community
        </Button>
      </div>

      <Row>
        {communities.map((community) => (
          <Col md={6} key={community.id} className="mb-3">
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5>{community.name}</h5>
                  <Badge bg="info">
                    <FaUsers className="me-1" />
                    {community.members}
                  </Badge>
                </div>
                <p className="text-muted">{community.description}</p>
                <div className="mb-2">
                  <small className="text-muted">
                    Location: {community.location || 'Not specified'}
                  </small>
                </div>
                <div className="mb-3">
                  <Badge bg="secondary">{community.category}</Badge>
                </div>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleJoinCommunity(community.id)}
                >
                  Join Community
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <CreateCommunity
        show={showCreateModal}
        handleClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};

export default CommunityList;
