import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaShieldAlt, FaCheck, FaInfoCircle } from 'react-icons/fa';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import SectionTitle from './shared/SectionTitle';

const CertificatesSection = styled.section`
  padding: 80px 0;
  background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const SectionDescription = styled.p`
  font-size: 1.1rem;
  color: #475569;
  max-width: 750px;
  margin: 0 auto;
  line-height: 1.6;
  margin-top: 30px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CertificatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const CertificateCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: all 0.4s ease;
  animation: ${fadeIn} 0.6s ease-out forwards;
  animation-delay: ${props => `${props.index * 0.15}s`};
  opacity: 0;
  transform: translateY(20px);
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  }
`;

const CertificateHeader = styled.div`
  background: ${props => props.color || '#05a0e8'};
  color: white;
  padding: 30px 20px;
  text-align: center;
`;

const CertificateLogo = styled.div`
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 18px;
  color: ${props => props.color || '#05a0e8'};
  font-size: 35px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
  
  ${CertificateCard}:hover & {
    transform: scale(1.1) rotate(5deg);
  }
`;

const CertificateTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
`;

const CertificateBody = styled.div`
  padding: 30px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const CertificateDescription = styled.p`
  font-size: 0.95rem;
  color: #475569;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const CertificateFeatures = styled.ul`
  padding: 0;
  margin: 0 0 25px 0;
  list-style: none;
  flex-grow: 1;
`;

const CertificateFeature = styled.li`
  padding: 10px 0;
  display: flex;
  align-items: flex-start;
  color: #334155;
  font-size: 0.9rem;
  
  svg {
    color: ${props => props.color || '#05a0e8'};
    margin-right: 12px;
    margin-top: 4px;
    flex-shrink: 0;
  }
  
  & + & {
    border-top: 1px dashed #e2e8f0;
  }
`;

const CertificateButton = styled.button`
  background: transparent;
  color: ${props => props.color || '#05a0e8'};
  border: 2px solid ${props => props.color || '#05a0e8'};
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: auto;
  letter-spacing: 0.5px;
  font-size: 0.95rem;
  
  &:hover {
    background: ${props => props.color || '#05a0e8'};
    color: white;
    transform: translateY(-2px);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 10px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 0;
  position: relative;
  transform: ${props => (props.isOpen ? 'translateY(0)' : 'translateY(-50px)')};
  transition: all 0.3s ease;
`;

const ModalHeader = styled.div`
  background: ${props => props.color || '#05a0e8'};
  color: white;
  padding: 20px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitle = styled.h3`
  font-size: 24px;
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
`;

const ModalBody = styled.div`
  padding: 30px;
`;

const CertificateDetail = styled.div`
  margin-bottom: 30px;
  
  h4 {
    color: #0c2340;
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: 600;
  }
  
  p {
    line-height: 1.6;
    color: #535b61;
    margin-bottom: 20px;
  }
`;

const DetailsList = styled.ul`
  padding-left: 20px;
  margin-bottom: 20px;
  
  li {
    margin-bottom: 10px;
    line-height: 1.5;
    color: #535b61;
  }
`;

const CTAContainer = styled.div`
  background: linear-gradient(135deg, #0c2340, #0f172a);
  padding: 100px 0;
  color: white;
  text-align: center;
  margin-top: 100px;
  border-top: 6px solid #05a0e8;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMDQiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=');
    opacity: 0.8;
  }
`;

const CTAText = styled.p`
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto 40px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.7;
  position: relative;
`;

const CTAButton = styled.button`
  display: inline-block;
  background: #05a0e8;
  color: white;
  padding: 14px 36px;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  transition: all 0.3s ease;
  position: relative;
  font-size: 1rem;
  box-shadow: 0 6px 15px rgba(5, 160, 232, 0.4);
  cursor: pointer;
  
  &:hover {
    background: white;
    color: #05a0e8;
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(5, 160, 232, 0.3);
  }
`;

const Certificates = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [visibleItems, setVisibleItems] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  
  useEffect(() => {
    // Gradually reveal the certificates to create a nice animation
    const interval = setInterval(() => {
      setVisibleItems(prev => {
        if (prev < certificatesData.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 150);
    
    return () => clearInterval(interval);
  }, []);
  
  const certificatesData = [
    {
      id: 'nepc',
      title: 'Export Registration Certificate',
      color: '#05a0e8',
      icon: <FaShieldAlt />,
      description: 'Nigerian Export Promotion Council registration certifying Ocean Crown as an authorized exporter with the council.',
      features: [
        'Registered Nigerian exporter',
        'Global export authorization',
        'Access to export incentives',
        'Export documentation processing'
      ],
      detailTitle: 'NEPC Export Registration',
      detailDescription: 'This certificate issued by the Nigerian Export Promotion Council confirms that Ocean Crown is a registered exporter recognized by the Federal Republic of Nigeria.',
      additionalDetails: [
        'Registration Number: 0009635',
        'Valid for international export operations',
        'Compliant with Nigerian export regulations',
        'Enables participation in global trade exhibitions and programs'
      ]
    },
    {
      id: 'cac-oil',
      title: 'Certificate of Incorporation',
      color: '#4CAF50',
      icon: <FaShieldAlt />,
      description: 'Corporate Affairs Commission certification of incorporation for Global Ocean Crown Oil & Transport Ltd.',
      features: [
        'Legally registered Nigerian company',
        'Authorized to conduct business',
        'Limited liability protection',
        'Official recognition by CAC'
      ],
      detailTitle: 'CAC Registration - Oil & Transport',
      detailDescription: 'Certificate of Incorporation issued by the Corporate Affairs Commission, Federal Republic of Nigeria for Global Ocean Crown Oil & Transport Ltd.',
      additionalDetails: [
        'RC: 1529496',
        'Incorporated on October 4th, 2018',
        'Registered as a Limited Liability Company',
        'Authorized to engage in oil and transport business activities'
      ]
    },
    {
      id: 'npa-license',
      title: 'Clearing & Forwarding License',
      color: '#FF5722',
      icon: <FaShieldAlt />,
      description: 'Nigerian Ports Authority license authorizing operations as a Clearing and Forwarding Agent across major Nigerian ports.',
      features: [
        'Licensed port operations',
        'Multiple ports authorization',
        'Cargo clearing services',
        'Official NPA recognition'
      ],
      detailTitle: 'NPA Clearing & Forwarding License',
      detailDescription: 'This license from the Nigerian Ports Authority grants Ocean Crown Multi-Links Enterprises Ltd permission to operate as a Clearing and Forwarding Agent.',
      additionalDetails: [
        'License No. 036681',
        'Authorized for Lagos Port Complex, Apapa',
        'Licensed for Tin Can Island Port Complex',
        'Valid for Calabar and other major port complexes'
      ]
    },
    {
      id: 'cac-multilinks',
      title: 'Certificate of Incorporation',
      color: '#9C27B0',
      icon: <FaShieldAlt />,
      description: 'Corporate Affairs Commission certification of incorporation for Ocean Crown Multi-Links Enterprises Ltd.',
      features: [
        'Legally registered business entity',
        'Limited liability company status',
        'Formal business recognition',
        'Authorized for multiple business lines'
      ],
      detailTitle: 'CAC Registration - Multi-Links',
      detailDescription: 'Certificate of Incorporation issued by the Corporate Affairs Commission, Federal Republic of Nigeria for Ocean Crown Multi-Links Enterprises Ltd.',
      additionalDetails: [
        'RC: 1077709',
        'Incorporated on November 12, 2012',
        'Registered as a Limited Liability Company',
        'Authorized to engage in multiple business ventures'
      ]
    },
    {
      id: 'customs-license',
      title: 'Customs Agent License',
      color: '#FFC107',
      icon: <FaShieldAlt />,
      description: 'Nigeria Customs Service license authorizing operations as a Customs Agent for import/export activities.',
      features: [
        'Authorized customs processing',
        'Import/export documentation',
        'Customs compliance handling',
        'Duty and tax processing'
      ],
      detailTitle: 'Nigeria Customs Service License',
      detailDescription: 'This license issued by the Nigeria Customs Service authorizes Ocean Crown Multi-Links Enterprises Ltd to carry on business as a Customs Agent.',
      additionalDetails: [
        'License No. 6538/2022',
        'Secured with ₦10,000,000 guarantee bond',
        'Valid until December 31st, 2025',
        'Registered address: No 29, Payne Crescent, Apapa Lagos'
      ]
    },
    {
      id: 'export-license',
      title: 'Export License',
      color: '#2196F3',
      icon: <FaShieldAlt />,
      description: 'Nigerian Export Promotion Council license authorizing Ocean Crown to engage in export operations.',
      features: [
        'Valid registration as exporter',
        'Export process authorization',
        'International trade recognition',
        'Compliance with export regulations'
      ],
      detailTitle: 'NEPC Export License',
      detailDescription: "The Nigerian Export Promotion Council certification confirms Ocean Crown's compliance with export regulations and authorization to engage in export trade.",
      additionalDetails: [
        'Registration with Nigerian Export Promotion Council',
        'Authorization for global export transactions',
        'Compliance with international export standards',
        'Recognition as a legitimate Nigerian exporter'
      ]
    }
  ];
  
  const openModal = (id) => {
    setActiveModal(id);
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = 'auto';
  };
  
  const getActiveCertificate = () => {
    return certificatesData.find(cert => cert.id === activeModal);
  };

  return (
    <>
      <CertificatesSection id="certificates">
        <Container>
          <SectionHeader>
            <SectionTitle isHome={isHome}>Certifications & Compliance</SectionTitle>
            <SectionDescription>
              Ocean Crown adheres to the highest international standards. Our certifications demonstrate our commitment to quality, safety, environmental stewardship, and regulatory compliance.
            </SectionDescription>
          </SectionHeader>
          
          <CertificatesGrid>
            {certificatesData.map((certificate, index) => (
              <CertificateCard key={certificate.id} index={index}>
                <CertificateHeader color={certificate.color}>
                  <CertificateLogo color={certificate.color}>
                    {certificate.icon}
                  </CertificateLogo>
                  <CertificateTitle>{certificate.title}</CertificateTitle>
                </CertificateHeader>
                
                <CertificateBody>
                  <CertificateDescription>
                    {certificate.description}
                  </CertificateDescription>
                  
                  <CertificateFeatures>
                    {certificate.features.map((feature, idx) => (
                      <CertificateFeature key={idx} color={certificate.color}>
                        <FaCheck /> {feature}
                      </CertificateFeature>
                    ))}
                  </CertificateFeatures>
                  
                  <CertificateButton 
                    color={certificate.color}
                    onClick={() => openModal(certificate.id)}
                  >
                    Learn More
                  </CertificateButton>
                </CertificateBody>
              </CertificateCard>
            ))}
          </CertificatesGrid>
        </Container>
      </CertificatesSection>
      
      <CTAContainer>
        <Container>
          <SectionTitle isHome={isHome} style={{ color: 'white' }}>Setting the Industry Standard</SectionTitle>
          <CTAText>
            At Ocean Crown, we're committed to maintaining the highest industry standards.
            Our certifications reflect our dedication to quality, safety, and sustainability
            in every aspect of our operations.
          </CTAText>
          <CTAButton onClick={() => navigate('/contact')}>
            Contact Our Compliance Team
          </CTAButton>
        </Container>
      </CTAContainer>
      
      {activeModal && (
        <ModalOverlay isOpen={!!activeModal} onClick={closeModal}>
          <ModalContent 
            isOpen={!!activeModal} 
            onClick={e => e.stopPropagation()}
          >
            <ModalHeader color={getActiveCertificate().color}>
              <ModalTitle>{getActiveCertificate().title}</ModalTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
            
            <ModalBody>
              <CertificateDetail>
                <h4>{getActiveCertificate().detailTitle}</h4>
                <p>{getActiveCertificate().detailDescription}</p>
                
                <h4>Key Aspects:</h4>
                <DetailsList>
                  {getActiveCertificate().additionalDetails.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </DetailsList>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', padding: '15px', background: '#f8f9fa', borderRadius: '8px', marginTop: '20px' }}>
                  <FaInfoCircle style={{ color: getActiveCertificate().color, marginRight: '15px', marginTop: '3px', fontSize: '20px', flexShrink: 0 }} />
                  <p style={{ margin: 0, fontSize: '14px' }}>
                    Our {getActiveCertificate().title} is regularly renewed and maintained to ensure continuous compliance with Nigerian regulatory standards.
                  </p>
                </div>
              </CertificateDetail>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Certificates; 