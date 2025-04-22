import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronRight } from 'react-icons/fa';
import { useTranslation } from '../translations/useTranslation';
import { useLocation } from 'react-router-dom';

const IndustriesSection = styled.section`
  padding: 60px 0;
  background-color: #f7f9fc;
`;

const HeroSection = styled.div`
  background: linear-gradient(rgba(96, 125, 148, 0.6), rgba(76, 100, 120, 0.7)),
              url('https://images.unsplash.com/photo-1599033090116-19d8d30b2239?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80') no-repeat center center;
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

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #0c2340;
  margin-bottom: 14px;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: #05a0e8;
  }
`;

const SectionDescription = styled.p`
  font-size: 15px;
  color: #4a5568;
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.5;
`;

const IndustriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const IndustryCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
`;

const IndustryImage = styled.div`
  height: 160px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(12, 35, 64, 0.2), rgba(12, 35, 64, 0.7));
  }
`;

const IndustryTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: white;
  position: absolute;
  bottom: 16px;
  left: 16px;
  margin: 0;
  z-index: 1;
`;

const IndustryContent = styled.div`
  padding: 18px;
`;

const IndustryDescription = styled.p`
  font-size: 14px;
  color: #4a5568;
  line-height: 1.5;
  margin-bottom: 16px;
`;

const IndustryLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: #05a0e8;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #0481ba;
  }
  
  svg {
    margin-left: 6px;
    transition: transform 0.3s ease;
    font-size: 12px;
  }
  
  &:hover svg {
    transform: translateX(4px);
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

const Industries = () => {
  const { t } = useTranslation();
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const location = useLocation();
  const isStandalonePage = location.pathname === '/industries';
  
  const industriesData = [
    {
      id: 'automotive',
      title: 'industries.automotive.title',
      image: 'https://images.unsplash.com/photo-1518987048-93e29699e79a?q=80&w=1000&auto=format&fit=crop',
      shortDescription: 'industries.automotive.description',
      fullDescription: 'Ocean Crown provides comprehensive logistics solutions tailored to the unique challenges of the automotive industry. Our services ensure timely delivery of components to production facilities and finished vehicles to dealerships worldwide.',
      solutions: [
        'industries.automotive.features.jit',
        'industries.automotive.features.parts',
        'industries.automotive.features.production'
      ],
      caseStudies: [
        {
          name: 'Global Auto Manufacturer',
          description: 'Reduced transit times by 22% and logistics costs by 18% through optimized shipping routes and consolidation strategies.'
        },
        {
          name: 'Luxury Car Brand',
          description: 'Implemented specialized handling procedures for high-value vehicles, achieving zero damage rate over 5,000+ international shipments.'
        }
      ]
    },
    {
      id: 'electronics',
      title: 'industries.electronics.title',
      image: 'https://images.unsplash.com/photo-1580584126903-c17d41830450?q=80&w=1000&auto=format&fit=crop',
      shortDescription: 'industries.electronics.description',
      fullDescription: 'The electronics industry demands precision logistics with careful handling of sensitive equipment and components. Ocean Crown delivers specialized solutions that ensure your technology products arrive safely and on schedule.',
      solutions: [
        'Climate-controlled transportation for sensitive components',
        'High-security warehousing for valuable electronics',
        'Specialized packaging solutions for fragile items',
        'Real-time tracking and monitoring systems',
        'Expedited shipping options for time-sensitive deliveries'
      ],
      caseStudies: [
        {
          name: 'Leading Smartphone Manufacturer',
          description: 'Managed the global distribution of new product launches, delivering 3 million units to 42 countries within a 72-hour window.'
        },
        {
          name: 'Computer Components Supplier',
          description: 'Implemented temperature-controlled logistics chain that reduced damage rates by 97% for sensitive semiconductor shipments.'
        }
      ]
    },
    {
      id: 'retail',
      title: 'industries.retail.title',
      image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=1000&auto=format&fit=crop',
      shortDescription: 'industries.retail.description',
      fullDescription: 'In today\'s fast-paced retail environment, having a responsive and agile supply chain is crucial. Ocean Crown provides tailored logistics solutions that help retailers meet customer expectations for rapid delivery while managing inventory efficiently.',
      solutions: [
        'industries.retail.features.distribution',
        'industries.retail.features.inventory',
        'industries.retail.features.ecommerce'
      ],
      caseStudies: [
        {
          name: 'International Fashion Retailer',
          description: 'Redesigned supply chain to reduce time-to-market by 35% for seasonal collections across 600+ global retail locations.'
        },
        {
          name: 'Growing E-commerce Platform',
          description: 'Implemented distributed fulfillment network that cut delivery times by half while reducing shipping costs by 28%.'
        }
      ]
    },
    {
      id: 'pharmaceutical',
      title: 'industries.pharmaceutical.title',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop',
      shortDescription: 'industries.pharmaceutical.description',
      fullDescription: 'Ocean Crown understands the critical nature of pharmaceutical and healthcare logistics. We maintain strict compliance with Good Distribution Practice (GDP) standards while ensuring temperature-sensitive products maintain their integrity throughout the supply chain.',
      solutions: [
        'Temperature-controlled transportation for vaccines and biologics',
        'Regulatory compliance management for cross-border shipments',
        'Track and trace systems for complete supply chain visibility',
        'Specialized handling for hazardous materials',
        'Secure warehousing for high-value pharmaceuticals'
      ],
      caseStudies: [
        {
          name: 'Global Vaccine Distribution',
          description: 'Managed the distribution of 12 million temperature-sensitive vaccine doses to 28 countries with 100% compliance to cold chain requirements.'
        },
        {
          name: 'Medical Equipment Manufacturer',
          description: 'Developed custom logistics solution for delicate medical devices, reducing transit damage by 99% and expediting delivery to hospitals.'
        }
      ]
    },
    {
      id: 'manufacturing',
      title: 'industries.manufacturing.title',
      image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=1000&auto=format&fit=crop',
      shortDescription: 'industries.manufacturing.description',
      fullDescription: 'Manufacturing operations depend on reliable supply chains to maintain production schedules. Ocean Crown delivers logistics services that align with manufacturing requirements, from raw material delivery to finished product distribution.',
      solutions: [
        'Inbound logistics management for production materials',
        'JIT delivery systems integration',
        'Inventory optimization strategies',
        'Production line supply management',
        'Multi-modal transportation solutions for finished goods'
      ],
      caseStudies: [
        {
          name: 'Industrial Equipment Manufacturer',
          description: 'Streamlined supply chain operations resulting in 42% reduction in inventory carrying costs while maintaining 99.8% production line availability.'
        },
        {
          name: 'Aerospace Components Producer',
          description: 'Implemented specialized handling procedures for precision parts, achieving zero-defect delivery across 15,000+ shipments annually.'
        }
      ]
    },
    {
      id: 'energy',
      title: 'industries.energy.title',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1000&auto=format&fit=crop',
      shortDescription: 'industries.energy.description',
      fullDescription: 'The energy sector presents unique logistics challenges, from transporting oversized components for renewable energy projects to managing time-critical shipments for oil and gas operations. Ocean Crown has the expertise to handle these specialized requirements.',
      solutions: [
        'Heavy lift capabilities for wind turbines and solar equipment',
        'Project cargo management for construction sites',
        'Specialized transport for hazardous materials',
        'Remote location delivery expertise',
        'Customs compliance for energy sector imports'
      ],
      caseStudies: [
        {
          name: 'Offshore Wind Farm Developer',
          description: 'Coordinated the delivery of 87 wind turbine components to offshore installation sites, overcoming severe weather challenges with minimal delays.'
        },
        {
          name: 'Solar Panel Manufacturer',
          description: 'Designed a distribution network that reduced breakage by 92% while decreasing transportation costs for fragile solar panels to installation sites.'
        }
      ]
    }
  ];
  
  const handleOpenModal = (industry) => {
    setSelectedIndustry(industry);
    document.body.style.overflow = 'hidden';
  };
  
  const handleCloseModal = () => {
    setSelectedIndustry(null);
    document.body.style.overflow = 'auto';
  };
  
  return (
    <>
      {isStandalonePage && (
        <HeroSection>
          <HeroContent>
            <PageTitle>Industry Solutions</PageTitle>
            <Subtitle>
              Specialized logistics services tailored to your industry's unique challenges
            </Subtitle>
          </HeroContent>
        </HeroSection>
      )}
      
      <IndustriesSection id="industries">
        <Container>
          <SectionHeader>
            <SectionTitle>{t('industries.title')}</SectionTitle>
            <SectionDescription>
              {t('industries.description')}
            </SectionDescription>
          </SectionHeader>
          
          <IndustriesGrid>
            {industriesData.map(industry => (
              <IndustryCard 
                key={industry.id}
                onClick={() => handleOpenModal(industry)}
              >
                <IndustryImage image={industry.image}>
                  <IndustryTitle>{t(industry.title)}</IndustryTitle>
                </IndustryImage>
                <IndustryContent>
                  <IndustryDescription>
                    {t(industry.shortDescription)}
                  </IndustryDescription>
                  <IndustryLink href="#" onClick={(e) => {
                    e.preventDefault();
                    handleOpenModal(industry);
                  }}>
                    Learn more <FaChevronRight />
                  </IndustryLink>
                </IndustryContent>
              </IndustryCard>
            ))}
          </IndustriesGrid>
        </Container>
        
        <ModalOverlay 
          isOpen={!!selectedIndustry}
          onClick={handleCloseModal}
        >
          {selectedIndustry && (
            <ModalContent 
              isOpen={!!selectedIndustry}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader image={selectedIndustry.image}>
                <ModalTitle>{t(selectedIndustry.title)}</ModalTitle>
                <ModalCloseButton onClick={handleCloseModal} />
              </ModalHeader>
              <ModalBody>
                <p>{t(selectedIndustry.fullDescription)}</p>
                
                <h4>Our Solutions:</h4>
                <SolutionsList>
                  {selectedIndustry.solutions.map((solution, index) => (
                    <SolutionItem key={index}>{t(solution)}</SolutionItem>
                  ))}
                </SolutionsList>
                
                <CaseStudies>
                  <CaseStudyTitle>Success Stories</CaseStudyTitle>
                  {selectedIndustry.caseStudies.map((caseStudy, index) => (
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
      </IndustriesSection>
    </>
  );
};

export default Industries; 