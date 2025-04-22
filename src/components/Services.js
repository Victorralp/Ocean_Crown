import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { FaShip, FaClipboardCheck, FaGlobeAmericas, FaHandshake, FaBoxOpen, FaBalanceScale } from "react-icons/fa";

const HeroSection = styled.div`
  background: linear-gradient(rgba(96, 125, 148, 0.6), rgba(76, 100, 120, 0.7)),
              url('https://images.pexels.com/photos/2226458/pexels-photo-2226458.jpeg?auto=compress&cs=tinysrgb&w=1920') no-repeat center center;
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
    background: linear-gradient(to right, #0ea5e9, #0f172a);
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
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
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
    background: linear-gradient(to right, #0ea5e9, #0f172a);
    margin: 25px auto 0;
    border-radius: 2px;
  }
`;

const ServicesSection = styled.section`
  padding: 60px 5%;
  background-color: #f8fafc;
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

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
`;

const ServiceCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0f2fe;
  color: #0284c7;
  border-radius: 12px;
  margin-bottom: 15px;
  
  svg {
    font-size: 24px;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.1rem;
  color: #0f172a;
  margin-bottom: 10px;
`;

const ServiceDescription = styled.p`
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.6;
`;

const Services = () => {
  const location = useLocation();
  const isStandalonePage = location.pathname === '/services';
  
  const services = [
    {
      icon: <FaShip />,
      title: "Ocean Freight",
      description: "Reliable ocean freight services connecting major ports worldwide with scheduled departures and arrivals."
    },
    {
      icon: <FaClipboardCheck />,
      title: "Customs Brokerage",
      description: "Streamlined customs clearance services to navigate complex international trade regulations."
    },
    {
      icon: <FaGlobeAmericas />,
      title: "Global Logistics",
      description: "End-to-end supply chain solutions tailored to your business needs and global requirements."
    },
    {
      icon: <FaHandshake />,
      title: "Strategic Partnerships",
      description: "Building long-term relationships with businesses to create customized logistics solutions."
    },
    {
      icon: <FaBoxOpen />,
      title: "Warehousing Solutions",
      description: "Secure storage facilities with inventory management and distribution capabilities."
    },
    {
      icon: <FaBalanceScale />,
      title: "Regulatory Compliance",
      description: "Expert guidance on international shipping regulations and documentation requirements."
    }
  ];
  
  return (
    <>
      {isStandalonePage && (
        <HeroSection>
          <HeroContent>
            <PageTitle>Our Services</PageTitle>
            <Subtitle>
              Comprehensive shipping and logistics solutions designed for your business needs
            </Subtitle>
          </HeroContent>
        </HeroSection>
      )}
      
      <ServicesSection id="services">
        <Container>
          <SectionTitle>Our Services</SectionTitle>
          <ServiceGrid>
            {services.map((service, index) => (
              <ServiceCard key={index}>
                <IconWrapper>{service.icon}</IconWrapper>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
              </ServiceCard>
            ))}
          </ServiceGrid>
        </Container>
      </ServicesSection>
    </>
  );
};

export default Services; 