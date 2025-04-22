import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from '../translations/useTranslation';
import { useLocation } from 'react-router-dom';
import SectionTitle from './shared/SectionTitle';

const StatsSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #0c2340 0%, #0d3a6a 100%);
  color: white;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(to right, #F6AD55, #ed8936);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background: radial-gradient(ellipse at center, rgba(246, 173, 85, 0.1) 0%, rgba(0, 0, 0, 0) 70%);
    z-index: 1;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StatsHeader = styled.div`
  text-align: center;
  margin-bottom: 70px;
  animation: ${fadeIn} 0.8s ease-out forwards;
`;

const StatsDescription = styled.p`
  font-size: 18px;
  max-width: 650px;
  margin: 30px auto 0;
  line-height: 1.6;
  opacity: 0.9;
  color: rgba(255, 255, 255, 0.9);
`;

const countUp = keyframes`
  from {
    opacity: 0.2;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StatsGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 80px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }
`;

const StatBox = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 40px 60px;
  text-align: center;
  transition: all 0.5s ease;
  position: relative;
  backdrop-filter: blur(10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: ${countUp} 0.8s ease-out forwards;
  animation-delay: ${props => props.delay};
  opacity: 0;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-15px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(246, 173, 85, 0.2), rgba(0, 0, 0, 0));
    z-index: -1;
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const StatNumber = styled.div`
  font-size: 64px;
  font-weight: 800;
  margin-bottom: 15px;
  color: #F6AD55;
  text-shadow: 0 2px 10px rgba(246, 173, 85, 0.3);
  position: relative;
  display: inline-block;
`;

const StatLabel = styled.div`
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: white;
  font-weight: 500;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
`;

const StatsContainer = styled.section`
  padding: 80px 0;
  background-color: #f9f9f9;
`;

const StatsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Stats = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  // Use our translation hook
  const { t } = useTranslation();

  // Array of statistics
  const statsData = [
    {
      number: '30+',
      label: 'stats.years',
      delay: '0.2s'
    },
    {
      number: '75+',
      label: 'stats.countries',
      delay: '0.4s'
    }
  ];

  return (
    <StatsContainer>
      <StatsContent>
        <SectionTitle isHome={isHome}>Global Reach, Local Expertise</SectionTitle>
        <StatsHeader>
          <StatsDescription>
            With decades of experience and a presence across continents, we connect businesses worldwide through reliable shipping and logistics solutions.
          </StatsDescription>
        </StatsHeader>
        
        <StatsGrid>
          {statsData.map((stat, index) => (
            <StatBox key={index} delay={stat.delay}>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{t(stat.label)}</StatLabel>
            </StatBox>
          ))}
        </StatsGrid>
      </StatsContent>
    </StatsContainer>
  );
};

export default Stats; 