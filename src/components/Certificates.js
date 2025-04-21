import React, { useState } from 'react';
import styled from 'styled-components';
import { FaShieldAlt, FaCheck, FaInfoCircle } from 'react-icons/fa';

const CertificatesSection = styled.section`
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
  margin-bottom: 20px;
  font-weight: 700;
  color: #0c2340;
`;

const SectionDescription = styled.p`
  font-size: 18px;
  color: #535b61;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const CertificatesGrid = styled.div`
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

const CertificateCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const CertificateHeader = styled.div`
  background: ${props => props.color || '#05a0e8'};
  color: white;
  padding: 25px 20px;
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
  margin: 0 auto 15px;
  color: ${props => props.color || '#05a0e8'};
  font-size: 35px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const CertificateTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

const CertificateBody = styled.div`
  padding: 30px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const CertificateDescription = styled.p`
  color: #535b61;
  margin-bottom: 25px;
  line-height: 1.6;
  flex-grow: 1;
  font-size: 16px;
`;

const CertificateFeatures = styled.ul`
  padding: 0;
  margin: 0 0 20px 0;
  list-style: none;
`;

const CertificateFeature = styled.li`
  padding: 8px 0;
  display: flex;
  align-items: flex-start;
  
  svg {
    color: #05a0e8;
    margin-right: 10px;
    margin-top: 4px;
    flex-shrink: 0;
  }
`;

const CertificateButton = styled.button`
  background: transparent;
  color: ${props => props.color || '#05a0e8'};
  border: 2px solid ${props => props.color || '#05a0e8'};
  padding: 10px 20px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    background: ${props => props.color || '#05a0e8'};
    color: white;
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
  background: #0c2340;
  padding: 80px 0;
  color: white;
  text-align: center;
  margin-top: 80px;
`;

const CTATitle = styled.h3`
  font-size: 32px;
  margin-bottom: 20px;
  font-weight: 600;
`;

const CTAText = styled.p`
  font-size: 18px;
  max-width: 700px;
  margin: 0 auto 30px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
`;

const CTAButton = styled.a`
  display: inline-block;
  background: #05a0e8;
  color: white;
  padding: 12px 30px;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    color: #05a0e8;
    transform: translateY(-5px);
  }
`;

const Certificates = () => {
  const [activeModal, setActiveModal] = useState(null);
  
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
            <SectionTitle>Global Certifications & Standards</SectionTitle>
            <SectionDescription>
              Ocean Crown maintains the highest industry certifications and compliance standards,
              ensuring quality, security, and sustainability across our global operations.
            </SectionDescription>
          </SectionHeader>
          
          <CertificatesGrid>
            {certificatesData.map(certificate => (
              <CertificateCard key={certificate.id}>
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
                    {certificate.features.map((feature, index) => (
                      <CertificateFeature key={index}>
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
          <CTATitle>Setting the Industry Standard</CTATitle>
          <CTAText>
            At Ocean Crown, we're committed to maintaining the highest industry standards.
            Our certifications reflect our dedication to quality, safety, and sustainability
            in every aspect of our operations.
          </CTAText>
          <CTAButton href="#contact">Contact Our Compliance Team</CTAButton>
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