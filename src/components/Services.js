import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import SectionTitle from './shared/SectionTitle';

const HeroSection = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 20, 50, 0.6)),
              url('/images/MSC Michelle Cappellini in sunset view.jpg') no-repeat center center;
  background-size: cover;
  height: 100vh;
  margin-top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  padding-top: 112px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(to right, #05a0e8, #0c2340);
  }
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 2;
  position: relative;
  max-width: 800px;
  margin: 0 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 45px;
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(0, 48, 87, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const PageTitle = styled.h1`
  font-size: 3.8rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  
  &::after {
    content: '';
    display: block;
    width: 120px;
    height: 4px;
    background: linear-gradient(to right, #05a0e8, #0c2340);
    margin: 25px auto 0;
    border-radius: 2px;
  }
`;

const ServicesContainer = styled.section`
  padding: 80px 0;
  background-color: #f9f9f9;
`;

const ServicesContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const ServiceCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const ServiceIcon = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto 25px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const ServiceTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 15px;
  color: #0c2340;
  position: relative;
  display: inline-block;
  font-weight: 600;
`;

const ServiceDescription = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 16px;
  max-width: 280px;
  margin: 0 auto;
`;

const Services = () => {
  const location = useLocation();
  const isServicesPage = location.pathname === '/services';
  const isHome = location.pathname === '/';
  
  const services = [
    {
      title: 'Ocean Freight',
      description: 'Comprehensive ocean freight solutions for all your shipping needs.',
      image: '/images/services/ocean-freight.jpg'
    },
    {
      title: 'Air Freight',
      description: 'Fast and reliable air freight services worldwide.',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000'
    },
    {
      title: 'Inland Transportation',
      description: 'Efficient inland transportation for your cargo.',
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1000'
    },
    {
      title: 'Warehousing & Distribution',
      description: 'Secure and efficient warehousing and distribution solutions.',
      image: '/images/services/warehousing.jpg'
    },
    {
      title: 'Import & Export',
      description: 'Comprehensive import and export services for global trade.',
      image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=1000'
    },
    {
      title: 'Customs Clearance',
      description: 'Expert customs clearance services to ensure smooth operations.',
      image: '/images/services/regulatory.jpg'
    }
  ];

  return (
    <>
      {isServicesPage && (
        <HeroSection>
          <HeroContent>
            <PageTitle>Our Solutions</PageTitle>
            <Subtitle>
              Comprehensive shipping and logistics services tailored to meet your global transportation needs.
            </Subtitle>
          </HeroContent>
        </HeroSection>
      )}
      <ServicesContainer>
        <ServicesContent>
          <SectionTitle isHome={isHome}>Our Services</SectionTitle>
          <ServicesGrid>
            {services.map((service, index) => (
              <ServiceCard key={index}>
                <ServiceIcon>
                  <img src={service.image} alt={service.title} />
                </ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </ServicesContent>
      </ServicesContainer>
    </>
  );
};

export default Services; 