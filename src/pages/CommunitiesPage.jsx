import React from 'react';
import { Container } from 'react-bootstrap';
import CommunityList from '../components/Community/CommunityList';

const CommunitiesPage = () => {
  return (
    <Container className="mt-4">
      <CommunityList />
    </Container>
  );
};

export default CommunitiesPage;
