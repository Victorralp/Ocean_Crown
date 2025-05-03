import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { FaChevronRight, FaTimes } from 'react-icons/fa';
import SectionTitle from './shared/SectionTitle';
import { useTranslation } from '../translations/useTranslation';

const HeroSection = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 20, 50, 0.6)),
              url('/images/MSC Michelle Cappellini in sunset view.jpg?w=1200&q=75') no-repeat center center;
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
  
  @media (max-width: 768px) {
    padding: 25px;
    margin: 0 15px;
    max-width: 90%;
  }
`;

const PageTitle = styled.h1`
  font-size: 42px;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 1rem;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    font-size: 13px;
    line-height: 1.4;
  }
  
  &::after {
    content: '';
    display: block;
    width: 120px;
    height: 4px;
    background: linear-gradient(to right, #05a0e8, #0c2340);
    margin: 25px auto 0;
    border-radius: 2px;
    
    @media (max-width: 768px) {
      width: 80px;
      margin: 15px auto 0;
    }
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
  font-size: 20px;
  margin-bottom: 15px;
  color: #0c2340;
  position: relative;
  display: inline-block;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

const ServiceDescription = styled.p`
  color: #666;
  line-height: 1.8;
  font-size: 0.95rem;
  max-width: 280px;
  margin: 0 auto 20px;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    line-height: 1.5;
    margin: 0 auto 15px;
  }
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
  background-image: url(${props => props.image ? `${props.image}?w=800&q=75` : ''});
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

const ModalHeaderContent = styled.div`
  position: relative;
  z-index: 1;
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
  
  @media (max-width: 768px) {
    font-size: 20px;
    bottom: 15px;
    left: 20px;
  }
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

const ModalDescription = styled.p`
  color: #4a5568;
  line-height: 1.8;
  margin-bottom: 25px;
  font-size: 0.95rem;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    line-height: 1.5;
  }
`;

const ModalSectionTitle = styled.h4`
  font-size: 24px;
  font-weight: 600;
  color: #0c2340;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 12px;
  }
`;

const SolutionsList = styled.ul`
  padding-left: 20px;
  margin-bottom: 30px;
`;

const SolutionItem = styled.li`
  margin-bottom: 12px;
  color: #4a5568;
  line-height: 1.8;
  position: relative;
  padding-left: 10px;
  font-size: 0.95rem;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-bottom: 10px;
    line-height: 1.5;
  }
  
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
  font-size: 20px;
  font-weight: 600;
  color: #0c2340;
  margin: 0 0 10px;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin: 0 0 6px;
  }
`;

const CaseStudyDescription = styled.p`
  font-size: 0.95rem;
  color: #4a5568;
  line-height: 1.8;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    line-height: 1.5;
  }
`;

const ContactButton = styled.button`
  display: inline-block;
  background-color: #F6AD55;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 20px;
  
  &:hover {
    background-color: #ed8936;
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 10px 20px;
  }
`;

const Services = () => {
  const location = useLocation();
  const isServicesPage = location.pathname === '/services';
  const isHome = location.pathname === '/';
  const [selectedService, setSelectedService] = useState(null);
  const { t } = useTranslation();
  
  const services = [
    {
      id: 'ocean',
      title: t('services.ocean.title'),
      description: t('services.ocean.description'),
      image: '/images/services/ocean-freight.jpg',
      fullDescription: t('services.ocean.fullDescription'),
      solutions: [
        t('services.ocean.feature1'),
        t('services.ocean.feature2'),
        t('services.ocean.feature3'),
        t('services.ocean.feature4', 'Temperature-controlled containers'),
        t('services.ocean.feature5', 'Real-time tracking and monitoring')
      ],
      caseStudies: [
        {
          name: t('services.ocean.caseStudy1.name', 'Global Manufacturer'),
          description: t('services.ocean.caseStudy1.description', 'Reduced shipping costs by 25% through optimized container utilization and route planning.')
        },
        {
          name: t('services.ocean.caseStudy2.name', 'Agricultural Exporter'),
          description: t('services.ocean.caseStudy2.description', 'Implemented temperature-controlled shipping solutions, reducing spoilage by 98%.')
        }
      ]
    },
    {
      id: 'air',
      title: t('services.air.title', 'Air Freight'),
      description: t('services.air.description', 'Fast and reliable air freight services worldwide.'),
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000',
      fullDescription: t('services.air.fullDescription', 'Our air freight services provide rapid transportation solutions for time-sensitive cargo. With partnerships with major airlines, we ensure your shipments reach their destination quickly and safely.'),
      solutions: [
        t('services.air.feature1', 'Express air freight services'),
        t('services.air.feature2', 'Charter flight options'),
        t('services.air.feature3', 'Door-to-door delivery'),
        t('services.air.feature4', 'Customs clearance assistance'),
        t('services.air.feature5', 'Real-time shipment tracking')
      ],
      caseStudies: [
        {
          name: t('services.air.caseStudy1.name', 'Electronics Manufacturer'),
          description: t('services.air.caseStudy1.description', 'Delivered critical components to production facilities within 24 hours, preventing production delays.')
        },
        {
          name: t('services.air.caseStudy2.name', 'Pharmaceutical Company'),
          description: t('services.air.caseStudy2.description', 'Managed the transportation of temperature-sensitive vaccines to 15 countries within 48 hours.')
        }
      ]
    },
    {
      id: 'inland',
      title: t('services.inland.title', 'Inland Transportation'),
      description: t('services.inland.description', 'Efficient inland transportation for your cargo.'),
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1000',
      fullDescription: t('services.inland.fullDescription', 'Our inland transportation services provide reliable and efficient movement of goods within countries and regions. We offer a comprehensive range of options to meet your specific needs.'),
      solutions: [
        t('services.inland.feature1', 'Road transportation'),
        t('services.inland.feature2', 'Rail freight services'),
        t('services.inland.feature3', 'Intermodal solutions'),
        t('services.inland.feature4', 'Last-mile delivery'),
        t('services.inland.feature5', 'Route optimization')
      ],
      caseStudies: [
        {
          name: t('services.inland.caseStudy1.name', 'Retail Chain'),
          description: t('services.inland.caseStudy1.description', 'Implemented a hub-and-spoke distribution model, reducing delivery times by 40%.')
        },
        {
          name: t('services.inland.caseStudy2.name', 'Construction Company'),
          description: t('services.inland.caseStudy2.description', 'Coordinated the delivery of heavy equipment to remote construction sites with 100% on-time delivery.')
        }
      ]
    },
    {
      id: 'warehousing',
      title: t('services.warehousing.title', 'Warehousing & Distribution'),
      description: t('services.warehousing.description', 'Secure and efficient warehousing and distribution solutions.'),
      image: '/images/services/warehousing.jpg',
      fullDescription: t('services.warehousing.fullDescription', 'Our warehousing and distribution services provide secure storage and efficient handling of your goods. We offer state-of-the-art facilities and advanced inventory management systems.'),
      solutions: [
        t('services.warehousing.feature1', 'Short and long-term storage'),
        t('services.warehousing.feature2', 'Inventory management'),
        t('services.warehousing.feature3', 'Order fulfillment'),
        t('services.warehousing.feature4', 'Cross-docking services'),
        t('services.warehousing.feature5', 'Value-added services')
      ],
      caseStudies: [
        {
          name: t('services.warehousing.caseStudy1.name', 'E-commerce Platform'),
          description: t('services.warehousing.caseStudy1.description', 'Implemented automated order fulfillment system, reducing processing time by 60%.')
        },
        {
          name: t('services.warehousing.caseStudy2.name', 'Consumer Goods Company'),
          description: t('services.warehousing.caseStudy2.description', 'Optimized warehouse layout and operations, increasing storage capacity by 35%.')
        }
      ]
    },
    {
      id: 'import',
      title: t('services.import.title', 'Import & Export'),
      description: t('services.import.description', 'Comprehensive import and export services for global trade.'),
      image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=1000',
      fullDescription: t('services.import.fullDescription', 'Our import and export services facilitate smooth international trade operations. We handle all aspects of the process, from documentation to customs clearance.'),
      solutions: [
        t('services.import.feature1', 'Documentation preparation'),
        t('services.import.feature2', 'Customs clearance'),
        t('services.import.feature3', 'Trade compliance'),
        t('services.import.feature4', 'Export licensing'),
        t('services.import.feature5', 'Import regulations')
      ],
      caseStudies: [
        {
          name: t('services.import.caseStudy1.name', 'International Trader'),
          description: t('services.import.caseStudy1.description', 'Streamlined import/export processes, reducing clearance time by 50%.')
        },
        {
          name: t('services.import.caseStudy2.name', 'Manufacturing Company'),
          description: t('services.import.caseStudy2.description', 'Implemented comprehensive trade compliance program, eliminating regulatory issues.')
        }
      ]
    },
    {
      id: 'customs',
      title: t('services.customs.title', 'Customs Clearance'),
      description: t('services.customs.description', 'Expert customs clearance services to ensure smooth operations.'),
      image: '/images/services/regulatory.jpg',
      fullDescription: t('services.customs.fullDescription', 'Our customs clearance services ensure smooth and compliant movement of goods across borders. We handle all aspects of customs procedures and documentation.'),
      solutions: [
        t('services.customs.feature1', 'Import/export documentation'),
        t('services.customs.feature2', 'Customs compliance consulting'),
        t('services.customs.feature3', 'Duties and taxes management'),
        t('services.customs.feature4', 'Trade agreement optimization'),
        t('services.customs.feature5', 'Regulatory compliance')
      ],
      caseStudies: [
        {
          name: t('services.customs.caseStudy1.name', 'Global Importer'),
          description: t('services.customs.caseStudy1.description', 'Reduced customs clearance time by 40% through optimized documentation processes.')
        },
        {
          name: t('services.customs.caseStudy2.name', 'Export Company'),
          description: t('services.customs.caseStudy2.description', 'Implemented automated compliance checks, eliminating customs delays.')
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
            <PageTitle>{t('services.pageTitle', 'Our Solutions')}</PageTitle>
            <Subtitle>
              {t('services.pageSubtitle', 'Comprehensive shipping and logistics services tailored to meet your global transportation needs.')}
            </Subtitle>
          </HeroContent>
        </HeroSection>
      )}
      <ServicesContainer>
        <ServicesContent>
          {isServicesPage ? (
            <SectionTitle 
              title={t('services.sectionTitle', 'Our Services')} 
              subtitle={t('services.sectionDescription', 'Ocean Crown delivers comprehensive shipping and logistics services designed to optimize your supply chain and enhance your business performance.')}
            />
          ) : (
            <SectionTitle 
              title={t('services.sectionTitle', 'Our Services')} 
              subtitle={t('services.sectionDescription', 'Ocean Crown delivers comprehensive shipping and logistics services designed to optimize your supply chain and enhance your business performance.')}
            />
          )}
          
          <ServicesGrid>
            {services.map((service) => (
              <ServiceCard key={service.id} onClick={() => handleOpenModal(service)}>
                <ServiceIcon>
                  <img src={service.image} alt={service.title} />
                </ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
                <ServiceLink>
                  {t('services.learnMore', 'Learn More')} <FaChevronRight />
                </ServiceLink>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </ServicesContent>
      </ServicesContainer>
      
      <ModalOverlay isOpen={!!selectedService} onClick={handleCloseModal}>
        <ModalContent isOpen={!!selectedService} onClick={e => e.stopPropagation()}>
          {selectedService && (
            <>
              <ModalHeader image={selectedService.image}>
                <ModalCloseButton onClick={handleCloseModal}>
                  <FaTimes />
                </ModalCloseButton>
                <ModalHeaderContent>
                  <ModalTitle>{selectedService.title}</ModalTitle>
                </ModalHeaderContent>
              </ModalHeader>
              <ModalBody>
                <ModalDescription>{selectedService.fullDescription}</ModalDescription>
                
                <ModalSectionTitle>{t('services.solutionsTitle', 'Our Solutions')}</ModalSectionTitle>
                <SolutionsList>
                  {selectedService.solutions.map((solution, index) => (
                    <SolutionItem key={index}>{solution}</SolutionItem>
                  ))}
                </SolutionsList>
                
                <ModalSectionTitle>{t('services.caseStudiesTitle', 'Case Studies')}</ModalSectionTitle>
                {selectedService.caseStudies.map((study, index) => (
                  <CaseStudy key={index}>
                    <CaseStudyName>{study.name}</CaseStudyName>
                    <CaseStudyDescription>{study.description}</CaseStudyDescription>
                  </CaseStudy>
                ))}
                
                <ContactButton>
                  {t('services.contactUs', 'Request a Customized Solution')}
                </ContactButton>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default Services; 