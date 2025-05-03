import React from 'react';
import styled from 'styled-components';
import { useTranslation } from '../translations/useTranslation';
import { FaShip, FaAward, FaHandshake, FaGlobeAfrica, FaChartLine, FaUsers, FaBuilding, FaUniversity } from 'react-icons/fa';

const AboutSection = styled.section`
  padding: 60px 0;
  background-color: #f8fafc;
  
  @media (max-width: 768px) {
    padding: 40px 0;
  }
`;

const HeroSection = styled.div`
  position: relative;
  height: 70vh;
  background: url('https://images.pexels.com/photos/1554646/pexels-photo-1554646.jpeg') center/cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  text-align: center;
  margin-bottom: 30px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 26, 51, 0.8) 0%,
      rgba(5, 57, 107, 0.7) 50%,
      rgba(13, 110, 253, 0.6) 100%
    );
    z-index: 1;
  }
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 15px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 20px;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.5;
  }
`;

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const PageTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 15px;
  }
`;

const Subtitle = styled.p`
  font-size: 20px;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.5;
  }
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  color: #0c2340;
  margin-bottom: 50px;
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: #05a0e8;
  }
  
  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 40px;
  }
`;

const TwoColumnSection = styled.div`
  display: flex;
  gap: 60px;
  margin-bottom: 80px;
  align-items: center;
  
  @media (max-width: 992px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const LeftColumn = styled.div`
  flex: 1;
`;

const RightColumn = styled.div`
  flex: 1;
`;

const AboutImage = styled.img`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const AboutParagraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  margin-bottom: 1.5rem;
  max-width: 800px;
  margin: 0 auto 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 1.2rem;
  }
`;

const ValuesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 80px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const ValueIcon = styled.div`
  width: 70px;
  height: 70px;
  background: #f5f9ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: #05a0e8;
  font-size: 30px;
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 24px;
  }
`;

const ValueTitle = styled.h3`
  font-size: 20px;
  color: #0c2340;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

const ValueDescription = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 13px;
    line-height: 1.5;
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto 80px;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 3px;
    background: #05a0e8;
    transform: translateX(-50%);
  }
  
  @media (max-width: 768px) {
    &:before {
      left: 30px;
    }
  }
`;

const TimelineItem = styled.div`
  display: flex;
  justify-content: ${props => props.position === 'right' ? 'flex-start' : 'flex-end'};
  padding-bottom: 50px;
  width: 100%;
  position: relative;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 60px;
  }
`;

const TimelineDot = styled.div`
  width: 20px;
  height: 20px;
  background: #05a0e8;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  
  @media (max-width: 768px) {
    left: 30px;
  }
`;

const TimelineContent = styled.div`
  background: white;
  width: calc(50% - 50px);
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TimelineYear = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #05a0e8;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 6px;
  }
`;

const TimelineTitle = styled.h3`
  font-size: 20px;
  color: #0c2340;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

const TimelineText = styled.p`
  font-size: 15px;
  color: #555;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 13px;
    line-height: 1.5;
  }
`;

const TeamContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 80px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const TeamMember = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const TeamMemberImage = styled.div`
  height: 250px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  
  @media (max-width: 768px) {
    height: 200px;
  }
`;

const TeamMemberInfo = styled.div`
  padding: 25px;
  text-align: center;
`;

const TeamMemberName = styled.h3`
  font-size: 20px;
  color: #0c2340;
  margin-bottom: 5px;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const TeamMemberPosition = styled.div`
  font-size: 16px;
  color: #05a0e8;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    font-size: 13px;
    margin-bottom: 10px;
  }
`;

const TeamMemberBio = styled.p`
  font-size: 15px;
  color: #555;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 13px;
    line-height: 1.5;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-bottom: 80px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 42px;
  font-weight: 700;
  color: #05a0e8;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 6px;
  }
`;

const StatLabel = styled.div`
  font-size: 16px;
  color: #0c2340;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 80px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
`;

const ContactTitle = styled.h3`
  font-size: 20px;
  color: #0c2340;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 15px;
  }
`;

const ContactDetail = styled.div`
  display: flex;
  margin-bottom: 15px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ContactLabel = styled.div`
  font-weight: 600;
  color: #444;
  width: 120px;
  
  @media (max-width: 768px) {
    font-size: 13px;
    width: 100px;
  }
`;

const ContactValue = styled.div`
  color: #666;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const PartnersSection = styled.div`
  margin-bottom: 80px;
`;

const PartnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 50px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const PartnerCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  &.blue {
    border-left: 5px solid #05a0e8;
  }
  
  &.orange {
    border-left: 5px solid #F6AD55;
  }
  
  &.red {
    border-left: 5px solid #e53e3e;
  }
  
  &.teal {
    border-left: 5px solid #38b2ac;
  }
`;

const PartnerName = styled.div`
  font-weight: 600;
  color: #0c2340;
  font-size: 16px;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const PartnerCategory = styled.h3`
  font-size: 24px;
  color: #0c2340;
  margin-bottom: 30px;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 50px;
    height: 3px;
    background: #05a0e8;
  }
  
  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 25px;
  }
`;

const BiographySection = styled.div`
  background: #f8f9fa;
  padding: 60px 0;
  margin-bottom: 80px;
  border-radius: 10px;
`;

const BiographyContent = styled.div`
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
`;

const BiographyQuote = styled.blockquote`
  font-size: 20px;
  color: #333;
  line-height: 1.8;
  font-style: italic;
  position: relative;
  padding: 0 40px;
  margin-bottom: 30px;
  
  &:before, &:after {
    content: '"';
    font-size: 60px;
    color: #05a0e8;
    opacity: 0.3;
    position: absolute;
    font-family: Georgia, serif;
  }
  
  &:before {
    top: -20px;
    left: 0;
  }
  
  &:after {
    bottom: -50px;
    right: 0;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 0 25px;
    line-height: 1.5;
    margin-bottom: 25px;
    
    &:before, &:after {
      font-size: 34px;
    }
    
    &:before {
      top: -15px;
    }
    
    &:after {
      bottom: -35px;
    }
  }
`;

const ManagementImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  max-height: 450px;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  background: #f0f0f0;
  overflow: hidden;
  margin: 0 auto;
  
  @media (min-width: 992px) {
    max-height: 1600px;
  }
`;

const ManagementImage = styled.img`
  width: 100%;
  height: auto;
  min-height: 450px;
  display: block;
  object-fit: cover;
  
  @media (min-width: 992px) {
    min-height: 700px;
  }
`;

const ManagementImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(255,255,255,0.1), rgba(0,0,0,0.05));
`;

const AboutUs = () => {
  const { t, language } = useTranslation();
  
  return (
    <>
      <HeroSection>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <HeroTitle>{t('aboutUs.title')}</HeroTitle>
          <HeroSubtitle>{t('aboutUs.subtitle')}</HeroSubtitle>
        </div>
      </HeroSection>
      
      <AboutSection>
        <AboutContainer>
          <SectionTitle style={{ textAlign: 'center', marginBottom: '30px' }}>
            {t('aboutUs.ourStory.title')}
          </SectionTitle>
          
              <AboutParagraph>
            {t('aboutUs.ourStory.paragraph1')}
              </AboutParagraph>
              <AboutParagraph>
            {t('aboutUs.ourStory.paragraph2')}
              </AboutParagraph>
              <AboutParagraph>
            {t('aboutUs.ourStory.paragraph3')}
              </AboutParagraph>
        </AboutContainer>
      </AboutSection>
      
      <AboutSection>
            <Container>
          <SectionTitle>Our Timeline</SectionTitle>
          <TimelineContainer>
            <TimelineItem position="right">
              <TimelineDot />
              <TimelineContent>
                <TimelineYear>2012</TimelineYear>
                <TimelineTitle>Initial Foundation</TimelineTitle>
                <TimelineText>
                  Ocean Crown Multi-Links Enterprises Ltd was established in Lagos, Nigeria, specializing in customs clearance and freight forwarding services.
                </TimelineText>
              </TimelineContent>
            </TimelineItem>
            
            <TimelineItem position="left">
              <TimelineDot />
              <TimelineContent>
                <TimelineYear>2018</TimelineYear>
                <TimelineTitle>Business Expansion</TimelineTitle>
                <TimelineText>
                  Formed Global Ocean Crown Oil & Transport Ltd to specialize in oil sector logistics and transportation services, enhancing our capabilities in Nigeria's energy market.
                </TimelineText>
              </TimelineContent>
            </TimelineItem>
            
            <TimelineItem position="right">
              <TimelineDot />
              <TimelineContent>
                <TimelineYear>2019</TimelineYear>
                <TimelineTitle>New Vision & Direction</TimelineTitle>
                <TimelineText>
                  Shipping experts gathered to establish a new vision for the company, focusing on "New Generation Solutions" and international standards in the clearing industry.
                </TimelineText>
              </TimelineContent>
            </TimelineItem>
            
            <TimelineItem position="left">
              <TimelineDot />
              <TimelineContent>
                <TimelineYear>2021</TimelineYear>
                <TimelineTitle>Digital Transformation</TimelineTitle>
                <TimelineText>
                  Implemented advanced digital tracking and management systems to enhance visibility and efficiency across our logistics operations.
                </TimelineText>
              </TimelineContent>
            </TimelineItem>
            
            <TimelineItem position="right">
              <TimelineDot />
              <TimelineContent>
                <TimelineYear>2024</TimelineYear>
                <TimelineTitle>Market Leadership</TimelineTitle>
                <TimelineText>
                  Achieved recognition as one of Nigeria's leading logistics providers with renewed licenses and certifications for customs clearance, shipping, and freight forwarding.
                </TimelineText>
              </TimelineContent>
            </TimelineItem>
          </TimelineContainer>
          
          <SectionTitle>Mission & Vision</SectionTitle>
          <TwoColumnSection>
            <LeftColumn>
              <ValueCard style={{ height: '100%' }}>
                <ValueTitle>Our Mission</ValueTitle>
                <AboutParagraph>
                  To deliver exceptional logistics and transportation solutions that connect Nigerian businesses to global markets, through reliable service, innovative approaches, and unwavering commitment to customer satisfaction.
                </AboutParagraph>
              </ValueCard>
            </LeftColumn>
            <RightColumn>
              <ValueCard style={{ height: '100%' }}>
                <ValueTitle>Our Vision</ValueTitle>
                <AboutParagraph>
                  To be the leading logistics provider in West Africa, recognized for excellence in service delivery, operational efficiency, and the ability to create value for our clients across diverse industries and markets.
                </AboutParagraph>
              </ValueCard>
            </RightColumn>
          </TwoColumnSection>
          
          <SectionTitle>Our Values</SectionTitle>
          <ValuesContainer>
            <ValueCard>
              <ValueIcon>
                <FaAward />
              </ValueIcon>
              <ValueTitle>Excellence</ValueTitle>
              <ValueDescription>
                We strive for excellence in every aspect of our operations, consistently delivering high-quality services that exceed client expectations.
              </ValueDescription>
            </ValueCard>
            
            <ValueCard>
              <ValueIcon>
                <FaHandshake />
              </ValueIcon>
              <ValueTitle>Integrity</ValueTitle>
              <ValueDescription>
                We conduct business with the highest standards of honesty, transparency, and ethical behavior, building trust with our clients and partners.
              </ValueDescription>
            </ValueCard>
            
            <ValueCard>
              <ValueIcon>
                <FaShip />
              </ValueIcon>
              <ValueTitle>Reliability</ValueTitle>
              <ValueDescription>
                Our clients depend on us for consistent, dependable service, and we deliver on our promises with punctuality and professionalism.
              </ValueDescription>
            </ValueCard>
            
            <ValueCard>
              <ValueIcon>
                <FaGlobeAfrica />
              </ValueIcon>
              <ValueTitle>Global Perspective</ValueTitle>
              <ValueDescription>
                We maintain a global outlook, connecting Nigerian businesses to international markets and bringing world-class logistics practices to our operations.
              </ValueDescription>
            </ValueCard>
            
            <ValueCard>
              <ValueIcon>
                <FaChartLine />
              </ValueIcon>
              <ValueTitle>Innovation</ValueTitle>
              <ValueDescription>
                We continually seek innovative solutions to enhance our service offerings, improve efficiency, and provide greater value to our clients.
              </ValueDescription>
            </ValueCard>
            
            <ValueCard>
              <ValueIcon>
                <FaUsers />
              </ValueIcon>
              <ValueTitle>Customer Focus</ValueTitle>
              <ValueDescription>
                Our clients are at the center of everything we do, and we tailor our services to meet their unique needs and requirements.
              </ValueDescription>
            </ValueCard>
          </ValuesContainer>
          
          <SectionTitle>Our Partners</SectionTitle>
          <PartnersSection>
            <PartnerCategory>Our Business Partners</PartnerCategory>
            <PartnersGrid>
              <PartnerCard className="blue">
                <PartnerName>SUDIT OIL & CHEMICAL LTD.</PartnerName>
              </PartnerCard>
              <PartnerCard className="teal">
                <PartnerName>ASHABI PLASTIC INDUSTRIAL LTD.</PartnerName>
              </PartnerCard>
              <PartnerCard className="blue">
                <PartnerName>SAMBOKA FERTILIZERS LTD.</PartnerName>
              </PartnerCard>
              <PartnerCard className="orange">
                <PartnerName>PURITAN TRADING LTD.</PartnerName>
              </PartnerCard>
              <PartnerCard className="orange">
                <PartnerName>SLABMARK NIGERIA LTD.</PartnerName>
              </PartnerCard>
              <PartnerCard className="red">
                <PartnerName>WEST AFRICAN SOY INDUSTRIES LTD.</PartnerName>
              </PartnerCard>
              <PartnerCard className="orange">
                <PartnerName>HAANO MARINE PRODUCTS LTD.</PartnerName>
              </PartnerCard>
              <PartnerCard className="teal">
                <PartnerName>DORI CONSTRUCTION & ENG. LTD.</PartnerName>
              </PartnerCard>
            </PartnersGrid>
            
            <PartnerCategory>Our Financial Partners</PartnerCategory>
            <PartnersGrid>
              <PartnerCard className="blue">
                <PartnerName>ZENITH BANK PLC.</PartnerName>
              </PartnerCard>
              <PartnerCard className="blue">
                <PartnerName>FCMB PLC.</PartnerName>
              </PartnerCard>
              <PartnerCard className="blue">
                <PartnerName>GTBANK PLC.</PartnerName>
              </PartnerCard>
            </PartnersGrid>
          </PartnersSection>
          
          <SectionTitle>A Message from Management</SectionTitle>
          <TwoColumnSection>
            <LeftColumn>
              <ManagementImageContainer>
                <ManagementImage 
                  src="/images/about%20us/WhatsApp%20Image%202025-04-22%20at%2013.33.21_58cde748.jpg" 
                  alt="Management portrait"
                  loading="lazy"
                />
                <ManagementImageOverlay />
              </ManagementImageContainer>
            </LeftColumn>
            <RightColumn>
              <AboutParagraph>
                Welcome to OCEAN CROWN MULTILINKS ENTERPRISES LTD, and thank you for considering us for your logistics and shipping needs.
              </AboutParagraph>
              <AboutParagraph>
                As an industry leader committed to operational excellence, we take pride in offering secure, timely, and cost-effective shipping solutions tailored to meet the demands of today's global marketplace. Our company is built on a foundation of integrity, innovation, and customer focus-principles that guide every shipment we handle.
              </AboutParagraph>
              <AboutParagraph>
                We continuously invest in technology, infrastructure, and people to ensure that our customers receive the highest standards of service. Whether you are a small business or a large enterprise, our team is dedicated to delivering reliability, visibility, and performance at every stage of the logistics process.
              </AboutParagraph>
              <AboutParagraph>
                Thank you for choosing OCMULTILINKS. We look forward to supporting your success and exceeding your expectations.
              </AboutParagraph>
              <AboutParagraph style={{ marginTop: '30px', fontWeight: 'bold' }}>
                Sincerely,
              </AboutParagraph>
              <AboutParagraph style={{ fontWeight: 'bold' }}>
                OGUNNUPE SHERIFF BABATUNDE
              </AboutParagraph>
              <AboutParagraph>
                Chief Executive Officer
              </AboutParagraph>
            </RightColumn>
          </TwoColumnSection>
          
          <SectionTitle>Company Information</SectionTitle>
          <ContactInfo>
            <ContactCard>
              <ContactTitle>Global Ocean Crown Multilinks Oil and Transportation Ltd</ContactTitle>
              <ContactDetail>
                <ContactLabel>Established:</ContactLabel>
                <ContactValue>October 4, 2018</ContactValue>
              </ContactDetail>
              <ContactDetail>
                <ContactLabel>RC Number:</ContactLabel>
                <ContactValue>1529496</ContactValue>
              </ContactDetail>
              <ContactDetail>
                <ContactLabel>Address:</ContactLabel>
                <ContactValue>7/9, Payne Crescent, Apapa, Lagos, Nigeria</ContactValue>
              </ContactDetail>
              <ContactDetail>
                <ContactLabel>Services:</ContactLabel>
                <ContactValue>Export and Transportation Services</ContactValue>
              </ContactDetail>
            </ContactCard>
            
            <ContactCard>
              <ContactTitle>Ocean Crown Multilinks Enterprise Limited</ContactTitle>
              <ContactDetail>
                <ContactLabel>Established:</ContactLabel>
                <ContactValue>November 12, 2012</ContactValue>
              </ContactDetail>
              <ContactDetail>
                <ContactLabel>RC Number:</ContactLabel>
                <ContactValue>1077709</ContactValue>
              </ContactDetail>
              <ContactDetail>
                <ContactLabel>Address:</ContactLabel>
                <ContactValue>No 29, Payne Crescent, Apapa, Lagos, Nigeria</ContactValue>
              </ContactDetail>
              <ContactDetail>
                <ContactLabel>Services:</ContactLabel>
                <ContactValue>Import Clearing and Forwarding</ContactValue>
              </ContactDetail>
            </ContactCard>
          </ContactInfo>
        </Container>
      </AboutSection>
    </>
  );
};

export default AboutUs; 