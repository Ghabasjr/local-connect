import { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { FaUsers, FaMapMarkerAlt, FaComment, FaHeart, FaShare, FaCalendarAlt, FaUserPlus, FaSearch, FaTimes, FaPhone, FaEnvelope } from 'react-icons/fa';
import Swal from 'sweetalert2';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const createCustomIcon = (color, isSelected = false) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        position: relative;
        width: ${isSelected ? '40px' : '30px'};
        height: ${isSelected ? '40px' : '30px'};
        background: ${color};
        border: ${isSelected ? '4px' : '3px'} solid white;
        border-radius: 50%;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        ${isSelected ? 'animation: pulse 2s infinite;' : ''}
      ">
        <div style="
          width: ${isSelected ? '12px' : '8px'};
          height: ${isSelected ? '12px' : '8px'};
          background: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    iconSize: [isSelected ? 40 : 30, isSelected ? 40 : 30],
    iconAnchor: [isSelected ? 20 : 15, isSelected ? 20 : 15],
  });
};

// Component to handle map view changes
const MapViewController = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, zoom, { animate: true, duration: 1 });
    }
  }, [center, zoom, map]);

  return null;
};

const DashboardPage = () => {
  // Sample user locations with more details
  const [allUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      lat: 9.0820,
      lng: 8.6753,
      status: 'online',
      email: 'john.doe@example.com',
      phone: '+234 123 456 7890',
      location: 'Abuja, Nigeria',
      community: 'Abuja Community',
      distance: '0.5 km away',
      bio: 'Tech enthusiast and community builder'
    },
    {
      id: 2,
      name: 'Jane Smith',
      lat: 9.0765,
      lng: 8.6700,
      status: 'online',
      email: 'jane.smith@example.com',
      phone: '+234 123 456 7891',
      location: 'Abuja, Nigeria',
      community: 'Abuja Community',
      distance: '0.8 km away',
      bio: 'Love connecting with local community members'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      lat: 9.0850,
      lng: 8.6800,
      status: 'offline',
      email: 'mike.johnson@example.com',
      phone: '+234 123 456 7892',
      location: 'Abuja, Nigeria',
      community: 'Lagos Local Connect',
      distance: '1.2 km away',
      bio: 'Fitness coach and local events organizer'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      lat: 9.0800,
      lng: 8.6720,
      status: 'online',
      email: 'sarah.williams@example.com',
      phone: '+234 123 456 7893',
      location: 'Abuja, Nigeria',
      community: 'Abuja Community',
      distance: '0.6 km away',
      bio: 'Artist and community volunteer'
    },
    {
      id: 5,
      name: 'David Brown',
      lat: 9.0790,
      lng: 8.6780,
      status: 'online',
      email: 'david.brown@example.com',
      phone: '+234 123 456 7894',
      location: 'Abuja, Nigeria',
      community: 'Kano Network',
      distance: '0.9 km away',
      bio: 'Software developer and mentor'
    },
    {
      id: 6,
      name: 'Emily Davis',
      lat: 9.0830,
      lng: 8.6730,
      status: 'offline',
      email: 'emily.davis@example.com',
      phone: '+234 123 456 7895',
      location: 'Abuja, Nigeria',
      community: 'Abuja Community',
      distance: '0.4 km away',
      bio: 'Teacher and education advocate'
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(allUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [mapCenter, setMapCenter] = useState([9.0820, 8.6753]);
  const [mapZoom, setMapZoom] = useState(13);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);

  const communities = [
    { id: 1, name: 'Abuja Community', members: 25, color: '#3b82f6' },
    { id: 2, name: 'Lagos Local Connect', members: 42, color: '#10b981' },
    { id: 3, name: 'Kano Network', members: 18, color: '#f59e0b' },
  ];

  const feedPosts = [
    { id: 1, author: 'John Doe', avatar: 'JD', content: 'Welcome to our local community! Looking forward to connecting with everyone here.', time: '2 hours ago', likes: 12, comments: 3 },
    { id: 2, author: 'Jane Smith', avatar: 'JS', content: 'Anyone interested in a community meetup this weekend? We can meet at the central park!', time: '5 hours ago', likes: 8, comments: 5 },
    { id: 3, author: 'Mike Johnson', avatar: 'MJ', content: 'Just joined Local Connect and loving the vibe already! 🎉', time: '1 day ago', likes: 15, comments: 2 },
  ];

  const notifications = [
    { id: 1, text: 'New member joined your community', time: '10 min ago', type: 'info' },
    { id: 2, text: 'You have 2 friend requests', time: '1 hour ago', type: 'success' },
    { id: 3, text: 'Upcoming event: Community Meetup', time: '2 hours ago', type: 'warning' },
  ];

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredUsers(allUsers);
      setSelectedUser(null);
    } else {
      const filtered = allUsers.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.location.toLowerCase().includes(query.toLowerCase()) ||
        user.community.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  // Track user location on map
  const trackUserLocation = (user) => {
    setSelectedUser(user);
    setMapCenter([user.lat, user.lng]);
    setMapZoom(15);

    Swal.fire({
      title: 'Tracking User',
      text: `Now tracking ${user.name}'s location`,
      icon: 'info',
      timer: 1500,
      showConfirmButton: false
    });
  };

  // Show user details
  const showUserDetails = (user) => {
    setSelectedUserDetails(user);
    setShowUserModal(true);
  };

  // Clear search and tracking
  const clearSearch = () => {
    setSearchQuery('');
    setFilteredUsers(allUsers);
    setSelectedUser(null);
    setMapCenter([9.0820, 8.6753]);
    setMapZoom(13);
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)', minHeight: '100vh', paddingTop: '30px', paddingBottom: '40px' }}>
      <Container fluid>
        {/* Search Bar */}
        <Row className="mb-4">
          <Col lg={12}>
            <Card className="dashboard-widget">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="mb-0">Search & Track Users</h5>
                  {selectedUser && (
                    <Badge bg="success" style={{ fontSize: '0.9rem' }}>
                      Tracking: {selectedUser.name}
                    </Badge>
                  )}
                </div>
                <InputGroup size="lg">
                  <InputGroup.Text style={{ background: 'white', border: '2px solid #e5e7eb', borderRight: 'none' }}>
                    <FaSearch style={{ color: '#6b7280' }} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search by name, location, or community..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    style={{
                      border: '2px solid #e5e7eb',
                      borderLeft: 'none',
                      fontSize: '1rem',
                      padding: '12px'
                    }}
                  />
                  {searchQuery && (
                    <Button
                      variant="outline-secondary"
                      onClick={clearSearch}
                      style={{ border: '2px solid #e5e7eb', borderLeft: 'none' }}
                    >
                      <FaTimes />
                    </Button>
                  )}
                </InputGroup>
                {searchQuery && (
                  <small className="text-muted mt-2 d-block">
                    Found {filteredUsers.length} user(s) matching "{searchQuery}"
                  </small>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Stats Row */}
        <Row className="mb-4">
          <Col lg={3} md={6} className="mb-3">
            <div className="stats-card">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="stats-number">{allUsers.length}</div>
                  <div className="stats-label">Total Users</div>
                </div>
                <FaUsers style={{ fontSize: '2.5rem', opacity: 0.3 }} />
              </div>
            </div>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <div className="stats-card" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="stats-number">{communities.length}</div>
                  <div className="stats-label">Communities</div>
                </div>
                <FaMapMarkerAlt style={{ fontSize: '2.5rem', opacity: 0.3 }} />
              </div>
            </div>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <div className="stats-card" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="stats-number">{allUsers.filter(u => u.status === 'online').length}</div>
                  <div className="stats-label">Online Now</div>
                </div>
                <FaComment style={{ fontSize: '2.5rem', opacity: 0.3 }} />
              </div>
            </div>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <div className="stats-card" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="stats-number">5</div>
                  <div className="stats-label">Events</div>
                </div>
                <FaCalendarAlt style={{ fontSize: '2.5rem', opacity: 0.3 }} />
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          {/* Left Sidebar - Search Results / Nearby Users */}
          <Col lg={3} md={12} className="mb-4">
            <Card className="dashboard-widget slide-in-right">
              <Card.Body>
                <h5>{searchQuery ? 'Search Results' : 'Nearby Users'}</h5>
                <div className="mt-3" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                      <div
                        key={user.id}
                        className={`user-list-item ${selectedUser?.id === user.id ? 'bg-primary bg-opacity-10' : ''}`}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="user-avatar">{user.name.split(' ').map(n => n[0]).join('')}</div>
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-center">
                            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.name}</span>
                            <Badge bg={user.status === 'online' ? 'success' : 'secondary'} pill style={{ fontSize: '0.65rem' }}>
                              {user.status}
                            </Badge>
                          </div>
                          <small className="text-muted d-block">{user.distance}</small>
                          <div className="d-flex gap-1 mt-2">
                            <Button
                              size="sm"
                              variant="outline-primary"
                              onClick={() => trackUserLocation(user)}
                              style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                            >
                              <FaMapMarkerAlt className="me-1" /> Track
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-info"
                              onClick={() => showUserDetails(user)}
                              style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                            >
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted py-4">
                      <FaSearch style={{ fontSize: '2rem', opacity: 0.3 }} />
                      <p className="mt-2">No users found</p>
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>

            <Card className="dashboard-widget mt-3 slide-in-right">
              <Card.Body>
                <h5>My Communities</h5>
                <div className="mt-3">
                  {communities.map(community => (
                    <div
                      key={community.id}
                      className="d-flex align-items-center justify-content-between mb-3 p-2"
                      style={{ background: '#f9fafb', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.3s' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#f9fafb'}
                    >
                      <div className="d-flex align-items-center">
                        <div style={{
                          width: '35px',
                          height: '35px',
                          borderRadius: '8px',
                          background: community.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          marginRight: '12px'
                        }}>
                          <FaUsers />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{community.name}</div>
                          <small className="text-muted">{community.members} members</small>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline-primary" size="sm" className="w-100 mt-2">
                    <FaUserPlus className="me-2" />
                    Join Community
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Main Content - Map and Feed */}
          <Col lg={6} md={12} className="mb-4">
            <Card className="dashboard-widget fade-in">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Live Location Map</h5>
                  {selectedUser && (
                    <Button size="sm" variant="outline-danger" onClick={clearSearch}>
                      <FaTimes className="me-1" /> Clear Tracking
                    </Button>
                  )}
                </div>
                <div className="map-container mt-3">
                  <MapContainer
                    center={mapCenter}
                    zoom={mapZoom}
                    style={{ height: '100%', width: '100%', borderRadius: '12px' }}
                  >
                    <MapViewController center={mapCenter} zoom={mapZoom} />
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    {filteredUsers.map(user => (
                      <Marker
                        key={user.id}
                        position={[user.lat, user.lng]}
                        icon={createCustomIcon(
                          user.status === 'online' ? '#10b981' : '#6b7280',
                          selectedUser?.id === user.id
                        )}
                        eventHandlers={{
                          click: () => trackUserLocation(user)
                        }}
                      >
                        <Popup>
                          <div style={{ textAlign: 'center' }}>
                            <strong style={{ fontSize: '1rem' }}>{user.name}</strong><br />
                            <Badge bg={user.status === 'online' ? 'success' : 'secondary'} pill className="mt-1">
                              {user.status}
                            </Badge>
                            <div className="mt-2">
                              <small className="text-muted d-block">{user.location}</small>
                              <small className="text-muted d-block">{user.distance}</small>
                            </div>
                            <Button
                              size="sm"
                              variant="primary"
                              className="mt-2"
                              onClick={() => showUserDetails(user)}
                            >
                              View Profile
                            </Button>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </Card.Body>
            </Card>

            <Card className="dashboard-widget mt-3 fade-in">
              <Card.Body>
                <h5>Community Feed</h5>

                {/* Create Post */}
                <div className="p-3 mb-3" style={{ background: '#f9fafb', borderRadius: '12px' }}>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="What's on your mind?"
                    style={{ border: 'none', background: 'white', borderRadius: '8px' }}
                  />
                  <div className="d-flex justify-content-end mt-2">
                    <Button size="sm" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', border: 'none', borderRadius: '8px' }}>
                      Post
                    </Button>
                  </div>
                </div>

                {/* Feed Posts */}
                {feedPosts.map(post => (
                  <div key={post.id} className="feed-post">
                    <div className="post-header">
                      <div className="post-avatar">{post.avatar}</div>
                      <div className="flex-grow-1">
                        <div className="post-author">{post.author}</div>
                        <div className="post-time">{post.time}</div>
                      </div>
                    </div>
                    <p className="post-content">{post.content}</p>
                    <div className="d-flex gap-3 pt-2 border-top">
                      <Button variant="link" className="text-decoration-none text-muted d-flex align-items-center" style={{ fontSize: '0.9rem' }}>
                        <FaHeart className="me-1" /> {post.likes} Likes
                      </Button>
                      <Button variant="link" className="text-decoration-none text-muted d-flex align-items-center" style={{ fontSize: '0.9rem' }}>
                        <FaComment className="me-1" /> {post.comments} Comments
                      </Button>
                      <Button variant="link" className="text-decoration-none text-muted d-flex align-items-center" style={{ fontSize: '0.9rem' }}>
                        <FaShare className="me-1" /> Share
                      </Button>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          {/* Right Sidebar */}
          <Col lg={3} md={12} className="mb-4">
            <Card className="dashboard-widget slide-in-right">
              <Card.Body>
                <h5>Notifications</h5>
                <div className="mt-3">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className="p-2 mb-2"
                      style={{
                        background: notification.type === 'info' ? '#dbeafe' :
                                   notification.type === 'success' ? '#d1fae5' : '#fef3c7',
                        borderRadius: '8px',
                        borderLeft: `3px solid ${
                          notification.type === 'info' ? '#3b82f6' :
                          notification.type === 'success' ? '#10b981' : '#f59e0b'
                        }`
                      }}
                    >
                      <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{notification.text}</div>
                      <small className="text-muted">{notification.time}</small>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>

            <Card className="dashboard-widget mt-3 slide-in-right">
              <Card.Body>
                <h5>Upcoming Events</h5>
                <div className="mt-3">
                  <div className="p-3 mb-2" style={{ background: '#f9fafb', borderRadius: '8px' }}>
                    <div className="d-flex">
                      <div style={{
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        marginRight: '12px'
                      }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>24</div>
                        <div style={{ fontSize: '0.7rem' }}>DEC</div>
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Community Meetup</div>
                        <small className="text-muted">Central Park, 3:00 PM</small>
                      </div>
                    </div>
                  </div>

                  <div className="p-3" style={{ background: '#f9fafb', borderRadius: '8px' }}>
                    <div className="d-flex">
                      <div style={{
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        marginRight: '12px'
                      }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>28</div>
                        <div style={{ fontSize: '0.7rem' }}>DEC</div>
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>New Year Planning</div>
                        <small className="text-muted">Community Hall, 5:00 PM</small>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* User Details Modal */}
      <Modal show={showUserModal} onHide={() => setShowUserModal(false)} centered size="lg">
        <Modal.Header closeButton style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', color: 'white', border: 'none' }}>
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {selectedUserDetails && (
            <div>
              <div className="text-center mb-4">
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    margin: '0 auto',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  {selectedUserDetails.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="mt-3 mb-1">{selectedUserDetails.name}</h3>
                <Badge bg={selectedUserDetails.status === 'online' ? 'success' : 'secondary'} pill style={{ fontSize: '0.9rem' }}>
                  {selectedUserDetails.status}
                </Badge>
              </div>

              <div className="mb-3 p-3" style={{ background: '#f9fafb', borderRadius: '12px' }}>
                <p className="text-muted mb-0" style={{ fontStyle: 'italic' }}>"{selectedUserDetails.bio}"</p>
              </div>

              <Row className="g-3">
                <Col md={6}>
                  <div className="d-flex align-items-center p-3" style={{ background: '#f9fafb', borderRadius: '8px' }}>
                    <FaEnvelope className="text-primary me-3" style={{ fontSize: '1.5rem' }} />
                    <div>
                      <small className="text-muted d-block">Email</small>
                      <strong style={{ fontSize: '0.9rem' }}>{selectedUserDetails.email}</strong>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex align-items-center p-3" style={{ background: '#f9fafb', borderRadius: '8px' }}>
                    <FaPhone className="text-success me-3" style={{ fontSize: '1.5rem' }} />
                    <div>
                      <small className="text-muted d-block">Phone</small>
                      <strong style={{ fontSize: '0.9rem' }}>{selectedUserDetails.phone}</strong>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex align-items-center p-3" style={{ background: '#f9fafb', borderRadius: '8px' }}>
                    <FaMapMarkerAlt className="text-danger me-3" style={{ fontSize: '1.5rem' }} />
                    <div>
                      <small className="text-muted d-block">Location</small>
                      <strong style={{ fontSize: '0.9rem' }}>{selectedUserDetails.location}</strong>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex align-items-center p-3" style={{ background: '#f9fafb', borderRadius: '8px' }}>
                    <FaUsers className="text-warning me-3" style={{ fontSize: '1.5rem' }} />
                    <div>
                      <small className="text-muted d-block">Community</small>
                      <strong style={{ fontSize: '0.9rem' }}>{selectedUserDetails.community}</strong>
                    </div>
                  </div>
                </Col>
              </Row>

              <div className="mt-3 p-3 text-center" style={{ background: '#dbeafe', borderRadius: '8px' }}>
                <FaMapMarkerAlt className="text-primary" />
                <strong className="ms-2">{selectedUserDetails.distance}</strong>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={{ border: 'none' }}>
          <Button variant="outline-secondary" onClick={() => setShowUserModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', border: 'none' }}
            onClick={() => {
              trackUserLocation(selectedUserDetails);
              setShowUserModal(false);
            }}
          >
            <FaMapMarkerAlt className="me-2" />
            Track Location
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add custom styles for marker animation */}
      <style>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
