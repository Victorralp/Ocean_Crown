import React from 'react';
import styled from 'styled-components';
import { FaAnchor, FaGlobeAmericas, FaShip } from 'react-icons/fa';
import { useTranslation } from '../App';

const AboutSection = styled.section`
  padding: 60px 5%;
  background-color: #ffffff;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 40px;
  color: #0f172a;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: #05a0e8;
  }
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutContent = styled.div``;

const AboutDescription = styled.p`
  font-size: 0.9rem;
  color: #475569;
  line-height: 1.7;
  margin-bottom: 20px;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 30px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #0284c7;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 500;
`;

const AboutImageContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  height: 0;
  padding-top: 75%; /* 4:3 Aspect Ratio */
  position: relative;
`;

const AboutImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ValuePropositions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ValueItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  background-color: #f8fafc;
  border-radius: 8px;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }
`;

const ValueIcon = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0f2fe;
  color: #0284c7;
  border-radius: 12px;
  margin-bottom: 15px;
  
  svg {
    font-size: 22px;
  }
`;

const ValueTitle = styled.h3`
  font-size: 1rem;
  color: #0f172a;
  margin-bottom: 10px;
`;

const ValueDescription = styled.p`
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.6;
`;

const About = () => {
  const { t } = useTranslation();
  
  const values = [
    {
      icon: <FaAnchor />,
      title: "about.reliability.title",
      description: "about.reliability.description"
    },
    {
      icon: <FaGlobeAmericas />,
      title: "about.global.title",
      description: "about.global.description"
    },
    {
      icon: <FaShip />,
      title: "about.experience.title",
      description: "about.experience.description"
    }
  ];

  return (
    <AboutSection id="about">
      <Container>
        <SectionTitle>{t("about.title")}</SectionTitle>
        
        <AboutGrid>
          <AboutContent>
            <AboutDescription>
              {t("about.description1")}
            </AboutDescription>
            <AboutDescription>
              {t("about.description2")}
            </AboutDescription>
            
            <Stats>
              <StatItem>
                <StatNumber>25+</StatNumber>
                <StatLabel>{t("about.stats.years")}</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>80+</StatNumber>
                <StatLabel>{t("about.stats.countries")}</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>10K+</StatNumber>
                <StatLabel>{t("about.stats.shipments")}</StatLabel>
              </StatItem>
            </Stats>
          </AboutContent>
          
          <AboutImageContainer>
            <AboutImage src="/images/cargo-ship-2.jpg" alt="Ocean Crown Shipping" />
          </AboutImageContainer>
        </AboutGrid>
        
        <ValuePropositions>
          {values.map((value, index) => (
            <ValueItem key={index}>
              <ValueIcon>{value.icon}</ValueIcon>
              <ValueTitle>{t(value.title)}</ValueTitle>
              <ValueDescription>{t(value.description)}</ValueDescription>
            </ValueItem>
          ))}
        </ValuePropositions>
      </Container>
    </AboutSection>
  );
};

export default About; 