import React from 'react';
import styled from 'styled-components';
import { useTranslation } from '../translations/useTranslation';

const StatsSection = styled.section`
  padding: 60px 0;
  background: #0c2340;
  color: white;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
`;

const StatsHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const StatsTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 14px;
  font-weight: 700;
`;

const StatsDescription = styled.p`
  font-size: 15px;
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.5;
  opacity: 0.9;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatBox = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 25px 15px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-8px);
  }
`;

const StatNumber = styled.div`
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #F6AD55;
`;

const StatLabel = styled.div`
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;
`;

const Stats = () => {
  // Use our translation hook
  const { t } = useTranslation();

  // Array of statistics
  const statsData = [
    {
      number: '30+',
      label: 'stats.years'
    },
    {
      number: '75+',
      label: 'stats.countries'
    },
    {
      number: '10,000+',
      label: 'stats.clients'
    },
    {
      number: '1.5M+',
      label: 'stats.shipments'
    }
  ];

  return (
    <StatsSection>
      <Container>
        <StatsHeader>
          <StatsTitle>Global Reach, Local Expertise</StatsTitle>
          <StatsDescription>
            {t('stats.description')}
          </StatsDescription>
        </StatsHeader>
        
        <StatsGrid>
          {statsData.map((stat, index) => (
            <StatBox key={index}>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{t(stat.label)}</StatLabel>
            </StatBox>
          ))}
        </StatsGrid>
      </Container>
    </StatsSection>
  );
};

export default Stats; 