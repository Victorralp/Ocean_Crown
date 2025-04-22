import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { FaChevronRight, FaTimes } from 'react-icons/fa';
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
  cursor: pointer;

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
  margin: 0 auto 20px;
`;

const ServiceLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: #F6AD55;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  
  svg {
    margin-left: 8px;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: #ed8936;
    
    svg {
      transform: translateX(4px);
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  transform: ${props => (props.isOpen ? 'translateY(0)' : 'translateY(-50px)')};
  transition: transform 0.3s ease;
`;

const ModalHeader = styled.div`
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  height: 200px;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(12, 35, 64, 0.5), rgba(12, 35, 64, 0.8));
  }
`;

const ModalTitle = styled.h3`
  font-size: 28px;
  font-weight: 700;
  color: white;
  position: absolute;
  bottom: 20px;
  left: 30px;
  margin: 0;
  z-index: 1;
`;

const ModalBody = styled.div`
  padding: 30px;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  z-index: 2;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
  
  &:before, &:after {
    content: '';
    position: absolute;
    width: 16px;
    height: 2px;
    background-color: white;
  }
  
  &:before {
    transform: rotate(45deg);
  }
  
  &:after {
    transform: rotate(-45deg);
  }
`;

const SolutionsList = styled.ul`
  padding-left: 20px;
  margin-bottom: 30px;
`;

const SolutionItem = styled.li`
  margin-bottom: 12px;
  color: #4a5568;
  line-height: 1.5;
  position: relative;
  padding-left: 10px;
  
  &:before {
    content: '';
    position: absolute;
    left: -10px;
    top: 10px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #05a0e8;
  }
`;

const CaseStudies = styled.div`
  border-top: 1px solid #e2e8f0;
  padding-top: 20px;
  margin-top: 20px;
`;

const CaseStudyTitle = styled.h4`
  font-size: 20px;
  font-weight: 600;
  color: #0c2340;
  margin-bottom: 15px;
`;

const CaseStudy = styled.div`
  padding: 15px;
  background-color: #f7f9fc;
  border-radius: 6px;
  margin-bottom: 15px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CaseStudyName = styled.h5`
  font-size: 18px;
  font-weight: 600;
  color: #0c2340;
  margin: 0 0 10px;
`;

const CaseStudyDescription = styled.p`
  font-size: 15px;
  color: #4a5568;
  line-height: 1.5;
  margin: 0;
`;

const Services = () => {
  const location = useLocation();
  const isServicesPage = location.pathname === '/services';
  const isHome = location.pathname === '/';
  const [selectedService, setSelectedService] = useState(null);
  
  const services = [
    {
      id: 'ocean',
      title: 'Ocean Freight',
      description: 'Comprehensive ocean freight solutions for all your shipping needs.',
      image: '/images/services/ocean-freight.jpg',
      fullDescription: 'Ocean Crown provides comprehensive ocean freight solutions tailored to your specific shipping requirements. Our global network ensures reliable and efficient transportation of your cargo across international waters.',
      solutions: [
        'FCL (Full Container Load) shipping',
        'LCL (Less than Container Load) options',
        'Specialized equipment for oversized cargo',
        'Temperature-controlled containers',
        'Real-time tracking and monitoring'
      ],
      caseStudies: [
        {
          name: 'Global Manufacturer',
          description: 'Reduced shipping costs by 25% through optimized container utilization and route planning.'
        },
        {
          name: 'Agricultural Exporter',
          description: 'Implemented temperature-controlled shipping solutions, reducing spoilage by 98%.'
        }
      ]
    },
    {
      id: 'air',
      title: 'Air Freight',
      description: 'Fast and reliable air freight services worldwide.',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000',
      fullDescription: 'Our air freight services provide rapid transportation solutions for time-sensitive cargo. With partnerships with major airlines, we ensure your shipments reach their destination quickly and safely.',
      solutions: [
        'Express air freight services',
        'Charter flight options',
        'Door-to-door delivery',
        'Customs clearance assistance',
        'Real-time shipment tracking'
      ],
      caseStudies: [
        {
          name: 'Electronics Manufacturer',
          description: 'Delivered critical components to production facilities within 24 hours, preventing production delays.'
        },
        {
          name: 'Pharmaceutical Company',
          description: 'Managed the transportation of temperature-sensitive vaccines to 15 countries within 48 hours.'
        }
      ]
    },
    {
      id: 'inland',
      title: 'Inland Transportation',
      description: 'Efficient inland transportation for your cargo.',
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1000',
      fullDescription: 'Our inland transportation services provide reliable and efficient movement of goods within countries and regions. We offer a comprehensive range of options to meet your specific needs.',
      solutions: [
        'Road transportation',
        'Rail freight services',
        'Intermodal solutions',
        'Last-mile delivery',
        'Route optimization'
      ],
      caseStudies: [
        {
          name: 'Retail Chain',
          description: 'Implemented a hub-and-spoke distribution model, reducing delivery times by 40%.'
        },
        {
          name: 'Construction Company',
          description: 'Coordinated the delivery of heavy equipment to remote construction sites with 100% on-time delivery.'
        }
      ]
    },
    {
      id: 'warehousing',
      title: 'Warehousing & Distribution',
      description: 'Secure and efficient warehousing and distribution solutions.',
      image: '/images/services/warehousing.jpg',
      fullDescription: 'Our warehousing and distribution services provide secure storage and efficient handling of your goods. We offer state-of-the-art facilities and advanced inventory management systems.',
      solutions: [
        'Short and long-term storage',
        'Inventory management',
        'Order fulfillment',
        'Cross-docking services',
        'Value-added services'
      ],
      caseStudies: [
        {
          name: 'E-commerce Platform',
          description: 'Implemented automated order fulfillment system, reducing processing time by 60%.'
        },
        {
          name: 'Consumer Goods Company',
          description: 'Optimized warehouse layout and operations, increasing storage capacity by 35%.'
        }
      ]
    },
    {
      id: 'import',
      title: 'Import & Export',
      description: 'Comprehensive import and export services for global trade.',
      image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=1000',
      fullDescription: 'Our import and export services facilitate smooth international trade operations. We handle all aspects of the process, from documentation to customs clearance.',
      solutions: [
        'Documentation preparation',
        'Customs clearance',
        'Trade compliance',
        'Export licensing',
        'Import regulations'
      ],
      caseStudies: [
        {
          name: 'International Trader',
          description: 'Streamlined import/export processes, reducing clearance time by 50%.'
        },
        {
          name: 'Manufacturing Company',
          description: 'Implemented comprehensive trade compliance program, eliminating regulatory issues.'
        }
      ]
    },
    {
      id: 'customs',
      title: 'Customs Clearance',
      description: 'Expert customs clearance services to ensure smooth operations.',
      image: '/images/services/regulatory.jpg',
      fullDescription: 'Our customs clearance services ensure smooth and compliant movement of goods across borders. We handle all aspects of customs procedures and documentation.',
      solutions: [
        'Import/export documentation',
        'Customs compliance consulting',
        'Duties and taxes management',
        'Trade agreement optimization',
        'Regulatory compliance'
      ],
      caseStudies: [
        {
          name: 'Global Importer',
          description: 'Reduced customs clearance time by 40% through optimized documentation processes.'
        },
        {
          name: 'Export Company',
          description: 'Implemented automated compliance checks, eliminating customs delays.'
        }
      ]
    }
  ];

  const handleOpenModal = (service) => {
    setSelectedService(service);
    document.body.style.overflow = 'hidden';
  };
  
  const handleCloseModal = () => {
    setSelectedService(null);
    document.body.style.overflow = 'auto';
  };

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
              <ServiceCard 
                key={index}
                onClick={() => handleOpenModal(service)}
              >
                <ServiceIcon>
                  <img src={service.image} alt={service.title} />
                </ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
                <ServiceLink href="#" onClick={(e) => {
                  e.preventDefault();
                  handleOpenModal(service);
                }}>
                  Learn more <FaChevronRight />
                </ServiceLink>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </ServicesContent>

        <ModalOverlay 
          isOpen={!!selectedService}
          onClick={handleCloseModal}
        >
          {selectedService && (
            <ModalContent 
              isOpen={!!selectedService}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader image={selectedService.image}>
                <ModalTitle>{selectedService.title}</ModalTitle>
                <ModalCloseButton onClick={handleCloseModal} />
              </ModalHeader>
              <ModalBody>
                <p>{selectedService.fullDescription}</p>
                
                <h4>Our Solutions:</h4>
                <SolutionsList>
                  {selectedService.solutions.map((solution, index) => (
                    <SolutionItem key={index}>{solution}</SolutionItem>
                  ))}
                </SolutionsList>
                
                <CaseStudies>
                  <CaseStudyTitle>Success Stories</CaseStudyTitle>
                  {selectedService.caseStudies.map((caseStudy, index) => (
                    <CaseStudy key={index}>
                      <CaseStudyName>{caseStudy.name}</CaseStudyName>
                      <CaseStudyDescription>{caseStudy.description}</CaseStudyDescription>
                    </CaseStudy>
                  ))}
                </CaseStudies>
              </ModalBody>
            </ModalContent>
          )}
        </ModalOverlay>
      </ServicesContainer>
    </>
  );
};

export default Services; 