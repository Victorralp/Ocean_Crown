import React from 'react';
import styled from 'styled-components';
import { useTranslation } from '../translations/useTranslation';

const StatsSection = styled.section`
  padding: 80px 0;
  background: #0c2340;
  color: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const StatsHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const StatsTitle = styled.h2`
  font-size: 36px;
  margin-bottom: 20px;
  font-weight: 700;
`;

const StatsDescription = styled.p`
  font-size: 18px;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  opacity: 0.9;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatBox = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 40px 20px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-10px);
  }
`;

const StatNumber = styled.div`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #F6AD55;
`;

const StatLabel = styled.div`
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;
`;

const Stats = () => {
  // Use our translation hook
  const { t, formatNumber } = useTranslation();

  // Array of statistics
  const statsData = [
    {
      number: 30,
      label: 'stats.years'
    },
    {
      number: 145,
      label: 'stats.countries'
    },
    {
      number: 15000,
      label: 'stats.clients'
    },
    {
      number: 2500000,
      label: 'stats.shipments'
    }
  ];

  return (
    <StatsSection>
      <Container>
        <StatsHeader>
          <StatsTitle>{t('stats.title')}</StatsTitle>
          <StatsDescription>
            {t('stats.description')}
          </StatsDescription>
        </StatsHeader>
        
        <StatsGrid>
          {statsData.map((stat, index) => (
            <StatBox key={index}>
              <StatNumber>{formatNumber(stat.number)}</StatNumber>
              <StatLabel>{t(stat.label)}</StatLabel>
            </StatBox>
          ))}
        </StatsGrid>
      </Container>
    </StatsSection>
  );
};

export default Stats; 