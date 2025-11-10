import React, { useState } from 'react';
import { Card, Form, Button, ListGroup } from 'react-bootstrap';
import { FaPaperPlane } from 'react-icons/fa';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'John Doe',
      text: 'Hello! How are you?',
      timestamp: '10:30 AM',
      isMine: false
    },
    {
      id: 2,
      sender: 'You',
      text: "Hi John! I'm doing great, thanks!",
      timestamp: '10:32 AM',
      isMine: true
    },
    {
      id: 3,
      sender: 'John Doe',
      text: 'Are you coming to the community meeting tomorrow?',
      timestamp: '10:33 AM',
      isMine: false
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: 'You',
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMine: true
      };

      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <Card style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
      <Card.Header>
        <h6 className="mb-0">Chat with John Doe</h6>
      </Card.Header>

      <Card.Body style={{ flex: 1, overflowY: 'auto' }}>
        <ListGroup variant="flush">
          {messages.map((message) => (
            <ListGroup.Item
              key={message.id}
              className={`border-0 ${message.isMine ? 'text-end' : ''}`}
            >
              <div className={`d-inline-block ${message.isMine ? 'bg-primary text-white' : 'bg-light'} p-2 rounded`}>
                <small className="d-block fw-bold">{message.sender}</small>
                <p className="mb-1">{message.text}</p>
                <small className="text-muted">{message.timestamp}</small>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>

      <Card.Footer>
        <Form onSubmit={handleSendMessage}>
          <div className="d-flex gap-2">
            <Form.Control
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button type="submit" variant="primary">
              <FaPaperPlane />
            </Button>
          </div>
        </Form>
      </Card.Footer>
    </Card>
  );
};

export default ChatWindow;
