import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "../App";

const HeroContainer = styled.section`
  height: 75vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), 
    url('https://images.unsplash.com/photo-1577535967652-30077655aed7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  padding: 0 5%;
  
  @media (max-width: 768px) {
    height: 65vh;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const HeroContent = styled.div`
  max-width: 600px;
  animation: fadeIn 1s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 15px;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 25px;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const PrimaryButton = styled(Link)`
  background-color: #05a0e8;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
  text-align: center;
  
  &:hover {
    background-color: #0482bc;
    transform: translateY(-3px);
  }
`;

const SecondaryButton = styled(Link)`
  background-color: transparent;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid white;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
  text-align: center;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
  }
`;

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <HeroContainer id="home">
      <ContentWrapper>
        <HeroContent>
          <Title>{t("hero.title")}</Title>
          <Subtitle>{t("hero.subtitle")}</Subtitle>
          <ButtonGroup>
            <PrimaryButton to="/contact">{t("hero.primaryButton")}</PrimaryButton>
            <SecondaryButton to="/services">{t("hero.secondaryButton")}</SecondaryButton>
          </ButtonGroup>
        </HeroContent>
      </ContentWrapper>
    </HeroContainer>
  );
};

export default HeroSection; 