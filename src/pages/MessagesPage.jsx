import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import ChatWindow from '../components/Messaging/ChatWindow';

const MessagesPage = () => {
  const contacts = [
    { id: 1, name: 'John Doe', lastMessage: 'See you tomorrow!', time: '10:33 AM' },
    { id: 2, name: 'Jane Smith', lastMessage: 'Thanks for the info', time: 'Yesterday' },
    { id: 3, name: 'Mike Johnson', lastMessage: "Let's meet up", time: '2 days ago' }
  ];

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Header>
              <h6 className="mb-0">Messages</h6>
            </Card.Header>
            <ListGroup variant="flush">
              {contacts.map(contact => (
                <ListGroup.Item key={contact.id} action>
                  <div className="d-flex justify-content-between">
                    <div>
                      <strong>{contact.name}</strong>
                      <p className="mb-0 text-muted small">{contact.lastMessage}</p>
                    </div>
                    <small className="text-muted">{contact.time}</small>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
        <Col md={8}>
          <ChatWindow />
        </Col>
      </Row>
    </Container>
  );
};

export default MessagesPage;
