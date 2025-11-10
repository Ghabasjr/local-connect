import { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, ButtonGroup } from 'react-bootstrap';
import { FaBell, FaUserPlus, FaCalendarAlt, FaComments, FaHeart, FaCheckCircle, FaTrash, FaClock } from 'react-icons/fa';
import Swal from 'sweetalert2';

const NotificationsPage = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'friend_request',
      title: 'New Friend Request',
      message: 'Sarah Williams sent you a friend request',
      time: '5 minutes ago',
      read: false,
      icon: FaUserPlus,
      color: '#3b82f6',
      actionable: true
    },
    {
      id: 2,
      type: 'community',
      title: 'New Member Joined',
      message: 'David Brown joined Abuja Community',
      time: '10 minutes ago',
      read: false,
      icon: FaBell,
      color: '#10b981',
      actionable: false
    },
    {
      id: 3,
      type: 'event',
      title: 'Upcoming Event',
      message: 'Community Meetup is happening tomorrow at Central Park',
      time: '2 hours ago',
      read: false,
      icon: FaCalendarAlt,
      color: '#f59e0b',
      actionable: true
    },
    {
      id: 4,
      type: 'message',
      title: 'New Message',
      message: 'John Doe sent you a message',
      time: '3 hours ago',
      read: true,
      icon: FaComments,
      color: '#8b5cf6',
      actionable: true
    },
    {
      id: 5,
      type: 'like',
      title: 'Post Liked',
      message: 'Jane Smith liked your post',
      time: '5 hours ago',
      read: true,
      icon: FaHeart,
      color: '#ef4444',
      actionable: false
    },
    {
      id: 6,
      type: 'friend_request',
      title: 'Friend Request Accepted',
      message: 'Mike Johnson accepted your friend request',
      time: '1 day ago',
      read: true,
      icon: FaCheckCircle,
      color: '#10b981',
      actionable: false
    },
    {
      id: 7,
      type: 'community',
      title: 'Community Update',
      message: 'New announcement in Lagos Local Connect',
      time: '1 day ago',
      read: true,
      icon: FaBell,
      color: '#3b82f6',
      actionable: true
    },
    {
      id: 8,
      type: 'event',
      title: 'Event Reminder',
      message: 'Don\'t forget: New Year Planning event in 2 days',
      time: '2 days ago',
      read: true,
      icon: FaCalendarAlt,
      color: '#f59e0b',
      actionable: true
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  // Mark as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  // Mark all as read
  const markAllAsRead = () => {
    Swal.fire({
      title: 'Mark All as Read?',
      text: 'This will mark all notifications as read',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, mark all',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
        Swal.fire({
          title: 'Done!',
          text: 'All notifications marked as read',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  // Delete notification
  const deleteNotification = (id) => {
    Swal.fire({
      title: 'Delete Notification?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setNotifications(notifications.filter(n => n.id !== id));
        Swal.fire({
          title: 'Deleted!',
          text: 'Notification has been deleted',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  // Clear all notifications
  const clearAll = () => {
    Swal.fire({
      title: 'Clear All Notifications?',
      text: 'This will permanently delete all notifications',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, clear all',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setNotifications([]);
        Swal.fire({
          title: 'Cleared!',
          text: 'All notifications have been cleared',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  const getNotificationStyle = (type) => {
    const styles = {
      friend_request: { bg: '#dbeafe', border: '#3b82f6' },
      community: { bg: '#d1fae5', border: '#10b981' },
      event: { bg: '#fef3c7', border: '#f59e0b' },
      message: { bg: '#ede9fe', border: '#8b5cf6' },
      like: { bg: '#fee2e2', border: '#ef4444' }
    };
    return styles[type] || styles.community;
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)', minHeight: '100vh', paddingTop: '30px', paddingBottom: '40px' }}>
      <Container>
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="fw-bold mb-1" style={{ color: '#1f2937' }}>
                  <FaBell className="me-3" style={{ color: '#3b82f6' }} />
                  Notifications
                </h2>
                <p className="text-muted mb-0">
                  You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </p>
              </div>
              <div>
                {unreadCount > 0 && (
                  <Button
                    variant="outline-primary"
                    className="me-2"
                    onClick={markAllAsRead}
                  >
                    <FaCheckCircle className="me-2" />
                    Mark All Read
                  </Button>
                )}
                {notifications.length > 0 && (
                  <Button
                    variant="outline-danger"
                    onClick={clearAll}
                  >
                    <FaTrash className="me-2" />
                    Clear All
                  </Button>
                )}
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Card className="modern-card border-0 shadow-sm">
              <Card.Body>
                <ButtonGroup className="w-100">
                  <Button
                    variant={filter === 'all' ? 'primary' : 'outline-primary'}
                    onClick={() => setFilter('all')}
                    style={{ borderRadius: '8px 0 0 8px' }}
                  >
                    All ({notifications.length})
                  </Button>
                  <Button
                    variant={filter === 'unread' ? 'primary' : 'outline-primary'}
                    onClick={() => setFilter('unread')}
                  >
                    Unread ({unreadCount})
                  </Button>
                  <Button
                    variant={filter === 'friend_request' ? 'primary' : 'outline-primary'}
                    onClick={() => setFilter('friend_request')}
                  >
                    <FaUserPlus className="me-1" /> Friends
                  </Button>
                  <Button
                    variant={filter === 'message' ? 'primary' : 'outline-primary'}
                    onClick={() => setFilter('message')}
                  >
                    <FaComments className="me-1" /> Messages
                  </Button>
                  <Button
                    variant={filter === 'event' ? 'primary' : 'outline-primary'}
                    onClick={() => setFilter('event')}
                  >
                    <FaCalendarAlt className="me-1" /> Events
                  </Button>
                  <Button
                    variant={filter === 'community' ? 'primary' : 'outline-primary'}
                    onClick={() => setFilter('community')}
                    style={{ borderRadius: '0 8px 8px 0' }}
                  >
                    <FaBell className="me-1" /> Community
                  </Button>
                </ButtonGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            {filteredNotifications.length > 0 ? (
              <div className="notifications-list">
                {filteredNotifications.map((notification) => {
                  const Icon = notification.icon;
                  const style = getNotificationStyle(notification.type);
                  return (
                    <Card
                      key={notification.id}
                      className={`mb-3 modern-card border-0 shadow-sm fade-in ${!notification.read ? 'notification-unread' : ''}`}
                      style={{
                        borderLeft: `4px solid ${notification.color}`,
                        opacity: notification.read ? 0.85 : 1,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <Card.Body className="p-4">
                        <div className="d-flex">
                          <div
                            className="me-3"
                            style={{
                              width: '50px',
                              height: '50px',
                              borderRadius: '12px',
                              background: style.bg,
                              border: `2px solid ${style.border}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                          >
                            <Icon style={{ fontSize: '1.5rem', color: notification.color }} />
                          </div>

                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <div>
                                <h5 className="mb-1 fw-bold" style={{ color: '#1f2937' }}>
                                  {notification.title}
                                  {!notification.read && (
                                    <Badge bg="primary" pill className="ms-2" style={{ fontSize: '0.7rem' }}>
                                      New
                                    </Badge>
                                  )}
                                </h5>
                                <p className="mb-2 text-muted" style={{ fontSize: '0.95rem' }}>
                                  {notification.message}
                                </p>
                              </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                              <small className="text-muted d-flex align-items-center">
                                <FaClock className="me-1" />
                                {notification.time}
                              </small>

                              <div className="notification-actions">
                                {!notification.read && (
                                  <Button
                                    size="sm"
                                    variant="outline-primary"
                                    className="me-2"
                                    onClick={() => markAsRead(notification.id)}
                                    style={{ fontSize: '0.85rem' }}
                                  >
                                    Mark as Read
                                  </Button>
                                )}
                                {notification.actionable && (
                                  <Button
                                    size="sm"
                                    variant="primary"
                                    className="me-2"
                                    style={{ fontSize: '0.85rem' }}
                                  >
                                    View
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="outline-danger"
                                  onClick={() => deleteNotification(notification.id)}
                                  style={{ fontSize: '0.85rem' }}
                                >
                                  <FaTrash />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="modern-card border-0 shadow-sm text-center p-5">
                <Card.Body>
                  <FaBell style={{ fontSize: '4rem', color: '#d1d5db', marginBottom: '1rem' }} />
                  <h4 className="text-muted">No Notifications</h4>
                  <p className="text-muted">
                    {filter === 'all' ? "You don't have any notifications yet" : `No ${filter.replace('_', ' ')} notifications`}
                  </p>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>

      <style>{`
        .notification-unread {
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15) !important;
        }

        .notification-unread:hover {
          transform: translateX(5px);
        }

        .notifications-list .modern-card:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
        }

        .notification-actions button {
          transition: all 0.3s ease;
        }

        .btn-group button {
          font-size: 0.9rem;
          padding: 8px 16px;
        }

        @media (max-width: 768px) {
          .btn-group {
            flex-wrap: wrap;
          }

          .btn-group button {
            flex: 1 1 45%;
            margin-bottom: 5px;
            border-radius: 8px !important;
          }

          .notification-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
          }
        }
      `}</style>
    </div>
  );
};

export default NotificationsPage;
