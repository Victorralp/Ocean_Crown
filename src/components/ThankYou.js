import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ThankYouSection = styled.section`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
              url('/images/ocean-grid.svg') center/cover no-repeat;
  color: white;
  text-align: center;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 42px;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  max-width: 600px;
  margin: 0 auto 40px;
  line-height: 1.6;
`;

const HomeButton = styled(Link)`
  background: #F6AD55;
  color: white;
  padding: 14px 28px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.3s ease;

  &:hover {
    background: #ED8936;
  }
`;

const ThankYou = () => {
  return (
    <ThankYouSection>
      <Title>Thank You for Visiting!</Title>
      <Subtitle>
        We appreciate your interest in Ocean Crown Multilinks Enterprises Ltd. If you have any further
        questions or requirements, feel free to reach out to us at any time.
      </Subtitle>
      <HomeButton to="/">Back to Home</HomeButton>
    </ThankYouSection>
  );
};

export default ThankYou; 