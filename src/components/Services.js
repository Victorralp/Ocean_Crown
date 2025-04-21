import React, { useState } from 'react';
import styled from 'styled-components';
import { FaShip, FaTruck, FaWarehouse, FaGlobe, FaCalculator, 
  FaFileAlt, FaSearch, FaChartLine, FaArrowRight } from 'react-icons/fa';
import { useTranslation } from '../App';

const ServicesSection = styled.section`
  padding: 100px 0;
  background: #f8f9fa;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 70px;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  color: #0c2340;
  margin-bottom: 20px;
  font-weight: 700;
`;

const SectionDescription = styled.p`
  font-size: 18px;
  color: #535b61;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    
    .service-icon {
      transform: scale(1.1);
    }
  }
`;

const ServiceIconWrapper = styled.div`
  background: linear-gradient(135deg, #05a0e8, #0c2340);
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ServiceIcon = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 35px;
  color: white;
  transition: transform 0.3s ease;
`;

const ServiceContent = styled.div`
  padding: 30px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ServiceTitle = styled.h3`
  font-size: 22px;
  color: #0c2340;
  margin-bottom: 15px;
  font-weight: 600;
`;

const ServiceDescription = styled.p`
  color: #535b61;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 25px 0;
`;

const ServiceFeature = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  
  &:before {
    content: "•";
    color: #05a0e8;
    margin-right: 10px;
  }
`;

const LearnMoreButton = styled.button`
  background: transparent;
  color: #05a0e8;
  border: none;
  padding: 0;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    gap: 12px;
  }
`;

const FeaturedService = styled.div`
  margin-top: 80px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
`;

const FeaturedHeader = styled.div`
  background: linear-gradient(135deg, #05a0e8, #0c2340);
  padding: 50px;
  color: white;
  
  @media (max-width: 768px) {
    padding: 40px 30px;
  }
`;

const FeaturedTitle = styled.h3`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 15px 0;
`;

const FeaturedDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  opacity: 0.9;
  margin: 0;
  max-width: 800px;
`;

const FeaturedContent = styled.div`
  padding: 50px;
  
  @media (max-width: 768px) {
    padding: 40px 30px;
  }
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`;

const FeaturedIcon = styled.div`
  width: 50px;
  height: 50px;
  background: rgba(5, 160, 232, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #05a0e8;
  font-size: 22px;
  flex-shrink: 0;
`;

const FeaturedItemContent = styled.div`
  flex-grow: 1;
`;

const FeaturedItemTitle = styled.h4`
  font-size: 20px;
  color: #0c2340;
  margin: 0 0 10px 0;
  font-weight: 600;
`;

const FeaturedItemDescription = styled.p`
  color: #535b61;
  line-height: 1.6;
  margin: 0;
`;

const CtaButton = styled.a`
  display: inline-block;
  background: #05a0e8;
  color: white;
  padding: 14px 30px;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  margin-top: 40px;
  
  &:hover {
    background: #0c2340;
    transform: translateY(-5px);
  }
`;

const Services = () => {
  const { t } = useTranslation();
  const [services] = useState([
    {
      icon: <FaShip />,
      title: 'services.ocean.title',
      description: 'services.ocean.description',
      features: ['services.ocean.feature1', 'services.ocean.feature2', 'services.ocean.feature3']
    },
    {
      icon: <FaTruck />,
      title: 'services.land.title',
      description: 'services.land.description',
      features: ['services.land.feature1', 'services.land.feature2', 'services.land.feature3']
    },
    {
      icon: <FaWarehouse />,
      title: 'services.warehousing.title',
      description: 'services.warehousing.description',
      features: ['services.warehousing.feature1', 'services.warehousing.feature2', 'services.warehousing.feature3']
    },
    {
      icon: <FaGlobe />,
      title: 'services.global.title',
      description: 'services.global.description',
      features: ['services.global.feature1', 'services.global.feature2', 'services.global.feature3']
    },
    {
      icon: <FaCalculator />,
      title: 'services.customs.title',
      description: 'services.customs.description',
      features: ['services.customs.feature1', 'services.customs.feature2', 'services.customs.feature3']
    },
    {
      icon: <FaFileAlt />,
      title: 'services.documentation.title',
      description: 'services.documentation.description',
      features: ['services.documentation.feature1', 'services.documentation.feature2', 'services.documentation.feature3']
    }
  ]);
  
  return (
    <ServicesSection id="services">
      <Container>
        <SectionHeader>
          <SectionTitle>{t('services.sectionTitle')}</SectionTitle>
          <SectionDescription>
            {t('services.sectionDescription')}
          </SectionDescription>
        </SectionHeader>
        
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard key={index}>
              <ServiceIconWrapper>
                <ServiceIcon className="service-icon">
                  {service.icon}
                </ServiceIcon>
              </ServiceIconWrapper>
              <ServiceContent>
                <ServiceTitle>{t(service.title)}</ServiceTitle>
                <ServiceDescription>
                  {t(service.description)}
                </ServiceDescription>
                <ServiceFeatures>
                  {service.features.map((feature, idx) => (
                    <ServiceFeature key={idx}>
                      {t(feature)}
                    </ServiceFeature>
                  ))}
                </ServiceFeatures>
                <LearnMoreButton>
                  {t('services.learnMore')} <FaArrowRight />
                </LearnMoreButton>
              </ServiceContent>
            </ServiceCard>
          ))}
        </ServicesGrid>
        
        <FeaturedService>
          <FeaturedHeader>
            <FeaturedTitle>{t('services.featured.title')}</FeaturedTitle>
            <FeaturedDescription>
              {t('services.featured.description')}
            </FeaturedDescription>
          </FeaturedHeader>
          <FeaturedContent>
            <FeaturedGrid>
              <FeaturedItem>
                <FeaturedIcon>
                  <FaSearch />
                </FeaturedIcon>
                <FeaturedItemContent>
                  <FeaturedItemTitle>{t('services.featured.item1.title')}</FeaturedItemTitle>
                  <FeaturedItemDescription>
                    {t('services.featured.item1.description')}
                  </FeaturedItemDescription>
                </FeaturedItemContent>
              </FeaturedItem>
              <FeaturedItem>
                <FeaturedIcon>
                  <FaChartLine />
                </FeaturedIcon>
                  <FeaturedItemContent>
                  <FeaturedItemTitle>{t('services.featured.item2.title')}</FeaturedItemTitle>
                  <FeaturedItemDescription>
                    {t('services.featured.item2.description')}
                  </FeaturedItemDescription>
                  </FeaturedItemContent>
                </FeaturedItem>
            </FeaturedGrid>
            <CtaButton href="/contact">{t('services.contactUs')}</CtaButton>
          </FeaturedContent>
        </FeaturedService>
      </Container>
    </ServicesSection>
  );
};

export default Services; 