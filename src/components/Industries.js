import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaChevronRight } from 'react-icons/fa';
import { useTranslation } from '../translations/useTranslation';
import { useLocation } from 'react-router-dom';
import SectionTitle from './shared/SectionTitle';

const IndustriesSection = styled.section`
  padding: 60px 0;
  background-color: #f7f9fc;
`;

const HeroSection = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 20, 50, 0.6)),
              url('/images/container-ship-hero.jpg') no-repeat center center;
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
    line-height: 1.5;
  }
  
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

const SectionDescription = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #495057;
  text-align: center;
  max-width: 800px;
  margin: 30px auto 60px;
  position: relative;
  
  @media (max-width: 768px) {
    font-size: 13px;
    line-height: 1.5;
  }
`;

const IndustriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-top: 40px;
`;

const IndustryImage = styled.div`
  height: 240px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  transition: transform 0.4s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  }
`;

const IndustryTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #212529;
  margin: 0;
  padding: 25px 30px 25px;
  transition: color 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const IndustryCard = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  height: 280px;
  position: relative;
  cursor: pointer;
  background-color: #f0f0f0; /* Placeholder while image loads */
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: ${props => props.imageLoaded ? `url(${props.image ? `${props.image}?w=600&q=75` : ''})` : 'none'};
    background-size: cover;
    background-position: center;
    opacity: ${props => props.imageLoaded ? 1 : 0};
    transition: opacity 0.3s ease;
    z-index: 0;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    
    .industry-overlay {
      background: rgba(0, 0, 0, 0.6);
    }
    
    .industry-content {
      transform: translateY(0);
    }
    
    .industry-description {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const IndustryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  transition: background 0.3s ease;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

const IndustryContent = styled.div`
  z-index: 2;
  color: white;
  display: flex;
  flex-direction: column;
`;

const IndustryDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #6c757d;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    line-height: 1.5;
  }
`;

const IndustryLink = styled.a`
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

const IndustriesContainer = styled.section`
  padding: 120px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
  overflow: hidden;
`;

const IndustriesContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const Industries = () => {
  const { t } = useTranslation();
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const location = useLocation();
  const isStandalonePage = location.pathname === '/industries';
  const isHome = location.pathname === '/';
  
  // Load images lazily
  useEffect(() => {
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const industryId = entry.target.dataset.industryId;
            if (industryId) {
              // Preload the image
              const img = new Image();
              const industry = industriesData.find(ind => ind.id === industryId);
              
              if (industry && industry.image) {
                img.src = `${industry.image}?w=600&q=75`;
                img.onload = () => {
                  setLoadedImages(prev => ({ ...prev, [industryId]: true }));
                };
              }
              
              imageObserver.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Add timeout to ensure images load even if observer fails
    const timeout = setTimeout(() => {
      industriesData.forEach(industry => {
        setLoadedImages(prev => ({ ...prev, [industry.id]: true }));
      });
    }, 3000);
    
    // Observe all industry cards
    document.querySelectorAll('.industry-card').forEach(card => {
      imageObserver.observe(card);
    });
    
    return () => {
      imageObserver.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  const industriesData = [
    {
      id: 'automotive',
      title: 'Automotive',
      image: 'https://images.unsplash.com/photo-1518987048-93e29699e79a?q=80&w=1000&auto=format&fit=crop',
      shortDescription: 'Comprehensive logistics solutions for automotive manufacturers, suppliers, and dealers with global reach.',
      fullDescription: 'Ocean Crown provides comprehensive logistics solutions tailored to the unique challenges of the automotive industry. Our services ensure timely delivery of components to production facilities and finished vehicles to dealerships worldwide.',
      solutions: [
        'Just-in-time delivery for production lines',
        'Specialized parts warehousing and distribution',
        'Production planning and supply chain optimization'
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
      title: 'Electronics',
      image: 'https://images.unsplash.com/photo-1580584126903-c17d41830450?q=80&w=1000&auto=format&fit=crop',
      shortDescription: 'Secure and precise logistics for sensitive electronic components and consumer devices.',
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
      title: 'Retail',
      image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=1000&auto=format&fit=crop',
      shortDescription: 'Flexible retail logistics solutions for both brick-and-mortar and e-commerce channels.',
      fullDescription: 'In today\'s fast-paced retail environment, having a responsive and agile supply chain is crucial. Ocean Crown provides tailored logistics solutions that help retailers meet customer expectations for rapid delivery while managing inventory efficiently.',
      solutions: [
        'Omnichannel distribution network management',
        'Inventory optimization and demand forecasting',
        'E-commerce fulfillment and returns management'
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
      title: 'Pharmaceutical',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop',
      shortDescription: 'Temperature-controlled, compliant logistics for pharmaceuticals and healthcare products.',
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
      title: 'Manufacturing',
      image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=1000&auto=format&fit=crop',
      shortDescription: 'End-to-end logistics support for manufacturing operations from raw materials to finished goods.',
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
      title: 'Energy',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1000&auto=format&fit=crop',
      shortDescription: 'Specialized logistics for the unique needs of traditional and renewable energy sectors.',
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
      
      <IndustriesContainer>
        <IndustriesContent>
          <SectionTitle isHome={isHome}>Industries We Serve</SectionTitle>
          <SectionDescription>
            Customized logistics solutions for diverse industry sectors, each with unique supply chain requirements
          </SectionDescription>
          
          <IndustriesGrid>
            {industriesData.map(industry => (
              <IndustryCard 
                key={industry.id}
                onClick={() => handleOpenModal(industry)}
                className="industry-card"
                data-industry-id={industry.id}
                image={industry.image}
                imageLoaded={loadedImages[industry.id]}
              >
                <IndustryOverlay className="industry-overlay">
                  <IndustryContent className="industry-content">
                    <h3 style={{ 
                      fontSize: '24px', 
                      margin: '0 0 10px 0', 
                      fontWeight: '600',
                      color: 'white'
                    }}>
                      {industry.title}
                    </h3>
                    <p style={{ 
                      margin: 0, 
                      fontSize: '14px', 
                      opacity: 0.9,
                      lineHeight: '1.5' 
                    }} className="industry-description">
                      {industry.shortDescription}
                    </p>
                  </IndustryContent>
                  <div style={{ textAlign: 'right' }}>
                    <button 
                      style={{
                        background: 'rgba(255,255,255,0.2)',
                        border: 'none',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '14px'
                      }}
                    >
                      Learn more <FaChevronRight size={12} />
                    </button>
                  </div>
                </IndustryOverlay>
              </IndustryCard>
            ))}
          </IndustriesGrid>
        </IndustriesContent>
        
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
                <ModalTitle>{selectedIndustry.title}</ModalTitle>
                <ModalCloseButton onClick={handleCloseModal} />
              </ModalHeader>
              <ModalBody>
                <p>{selectedIndustry.fullDescription}</p>
                
                <h4>Our Solutions:</h4>
                <SolutionsList>
                  {selectedIndustry.solutions.map((solution, index) => (
                    <SolutionItem key={index}>{solution}</SolutionItem>
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
      </IndustriesContainer>
    </>
  );
};

export default Industries; 