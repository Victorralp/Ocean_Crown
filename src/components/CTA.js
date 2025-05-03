import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from '../translations/useTranslation';

const CTASection = styled.section`
  padding: 40px 5%;
  background: linear-gradient(135deg, #0c2340, #0f172a);
  color: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 20px;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 15px;
  }
`;

const CTADescription = styled.p`
  font-size: 20px;
  max-width: 700px;
  margin-bottom: 30px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 25px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled(Link)`
  background-color: #05a0e8;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #0482bc;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(5, 160, 232, 0.4);
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 20px;
  }
`;

const SecondaryButton = styled(Link)`
  background-color: transparent;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.5);
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 20px;
  }
`;

function CTA() {
  const { t } = useTranslation();
  
  return (
    <CTASection>
      <Container>
        <CTATitle>{t('cta.title')}</CTATitle>
        <CTADescription>{t('cta.description')}</CTADescription>
        <ButtonGroup>
          <PrimaryButton to="/contact">{t('cta.primaryButton')}</PrimaryButton>
          <SecondaryButton to="/faq">{t('cta.secondaryButton')}</SecondaryButton>
        </ButtonGroup>
      </Container>
    </CTASection>
  );
}

export default CTA; 