import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaGlobe, 
  FaMobileAlt, 
  FaChartLine, 
  FaClipboardCheck, 
  FaTruck, 
  FaShieldAlt, 
  FaFileInvoiceDollar, 
  FaSatelliteDish, 
  FaUsersCog,
  FaExternalLinkAlt,
  FaPaperPlane,
  FaLaptopCode
} from 'react-icons/fa';

// Color palette - consistent with the rest of the application
const colors = {
  deepBlue: '#003057',
  oceanBlue: '#0077b6',
  lightBlue: '#90e0ef',
  skyBlue: '#e6f2ff',
  coral: '#F6AD55',
  sand: '#f8f9fa',
  white: '#ffffff'
};

// Styled Components
const EBusinessSection = styled.div`
  width: 100%;
  overflow-x: hidden;
  color: #444;
`;

const HeroSection = styled.div`
  background: linear-gradient(rgba(0, 48, 87, 0.7), rgba(0, 48, 87, 0.7)), 
              url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000') no-repeat center center;
  background-size: cover;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-top: 112px;
`;

const GlassContainer = styled.div`
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 48, 87, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeroContent = styled(GlassContainer)`
  text-align: center;
  z-index: 2;
  position: relative;
  max-width: 800px;
  margin: 0 20px;
`;

const PageTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background-color: ${colors.coral};
    margin: 25px auto 0;
    border-radius: 2px;
  }
`;

const ContentSection = styled.section`
  padding: 100px 0;
  background-color: ${props => props.bgColor || colors.white};
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: 2.4rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${props => props.light ? colors.white : colors.deepBlue};
  font-weight: 600;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background-color: ${colors.coral};
    margin: 15px auto 0;
    border-radius: 2px;
  }
`;

const SectionIntro = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${props => props.light ? colors.skyBlue : '#555'};
`;

const DigitalSolutionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const SolutionCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding: 40px 30px;
  text-align: center;
  backdrop-filter: blur(5px);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 48, 87, 0.12);
    border-color: rgba(0, 119, 182, 0.1);
  }
`;

const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${colors.oceanBlue} 0%, ${colors.deepBlue} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px;
  color: white;
  font-size: 32px;
`;

const SolutionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: ${colors.deepBlue};
`;

const SolutionDescription = styled.p`
  color: #555;
  line-height: 1.7;
  margin-bottom: 20px;
`;

const SolutionLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: ${colors.oceanBlue};
  font-weight: 500;
  text-decoration: none;
  
  svg {
    margin-left: 5px;
    font-size: 14px;
    transition: transform 0.2s ease;
  }
  
  &:hover {
    color: ${colors.deepBlue};
    
    svg {
      transform: translateX(3px);
    }
  }
`;

const BenefitsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  margin: 50px 0;
  
  @media (min-width: 992px) {
    flex-direction: row;
  }
`;

const BenefitsContent = styled.div`
  flex: 1;
  min-width: 300px;
`;

const BenefitsImage = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 600px;
  height: 400px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
`;

const BenefitsList = styled.ul`
  padding: 0;
  list-style: none;
  margin-top: 30px;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 25px;
  
  svg {
    color: ${colors.coral};
    margin-right: 15px;
    font-size: 22px;
    margin-top: 5px;
  }
`;

const BenefitContent = styled.div`
  flex: 1;
`;

const BenefitTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: ${colors.deepBlue};
`;

const BenefitDescription = styled.p`
  color: #555;
  line-height: 1.6;
  margin: 0;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  margin-top: 60px;
`;

const StatBox = styled.div`
  flex: 1;
  min-width: 250px;
  text-align: center;
  background: linear-gradient(135deg, ${colors.deepBlue} 0%, ${colors.oceanBlue} 100%);
  color: white;
  padding: 30px 25px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 48, 87, 0.15);
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const FeatureSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 80px 0;
  
  @media (min-width: 992px) {
    flex-direction: ${props => props.reversed ? 'row-reverse' : 'row'};
  }
`;

const FeatureTextContainer = styled.div`
  flex: 1;
  padding: ${props => props.reversed ? '0 0 0 60px' : '0 60px 0 0'};
  
  @media (max-width: 991px) {
    padding: 0;
    margin-bottom: 40px;
  }
`;

const FeatureImageContainer = styled.div`
  flex: 1;
  min-height: 400px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
`;

const FeatureTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 20px;
  color: ${colors.deepBlue};
  
  &::after {
    content: '';
    display: block;
    width: 50px;
    height: 3px;
    background-color: ${colors.coral};
    margin-top: 15px;
    border-radius: 1.5px;
  }
`;

const FeatureDescription = styled.p`
  color: #555;
  line-height: 1.8;
  margin-bottom: 20px;
  font-size: 1.05rem;
`;

const CTASection = styled.div`
  background: linear-gradient(135deg, ${colors.deepBlue} 0%, ${colors.oceanBlue} 100%);
  padding: 80px 0;
  text-align: center;
  color: white;
  border-radius: 12px;
  box-shadow: 0 15px 40px rgba(0, 48, 87, 0.15);
  margin: 40px 0;
`;

const CTATitle = styled.h3`
  font-size: 2.2rem;
  margin-bottom: 20px;
`;

const CTADescription = styled.p`
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto 30px;
  opacity: 0.9;
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${colors.coral};
  color: white;
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px rgba(246, 173, 85, 0.3);
  
  svg {
    margin-left: 10px;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(246, 173, 85, 0.4);
    background: #ed8936;
  }
`;

const DemoFormContainer = styled.div`
  max-width: 600px;
  margin: 60px auto 0;
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h4`
  font-size: 1.8rem;
  margin-bottom: 30px;
  text-align: center;
  color: ${colors.deepBlue};
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: ${colors.deepBlue};
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${colors.oceanBlue};
    box-shadow: 0 0 0 3px rgba(0, 119, 182, 0.1);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: ${colors.oceanBlue};
    box-shadow: 0 0 0 3px rgba(0, 119, 182, 0.1);
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, ${colors.oceanBlue} 0%, ${colors.deepBlue} 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  svg {
    margin-left: 10px;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 48, 87, 0.2);
  }
`;

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const EBusiness = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <EBusinessSection>
      <HeroSection>
        <HeroContent>
          <PageTitle>eBusiness Solutions</PageTitle>
          <Subtitle>
            Digital tools and platforms to streamline your shipping and logistics operations
          </Subtitle>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <SectionTitle>Our Digital Ecosystem</SectionTitle>
            <SectionIntro>
              Ocean Crown's eBusiness solutions offer a comprehensive suite of digital tools 
              designed to enhance efficiency, visibility, and control across your entire supply chain.
              Our secure platforms enable seamless management of your shipping and logistics operations 
              from anywhere in the world.
            </SectionIntro>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <DigitalSolutionsGrid>
              <SolutionCard variants={fadeInUp}>
                <IconContainer>
                  <FaGlobe />
                </IconContainer>
                <SolutionTitle>myOceanCrown Portal</SolutionTitle>
                <SolutionDescription>
                  Our comprehensive customer portal gives you full visibility and control over your 
                  shipments with real-time tracking, documentation, and reporting capabilities.
                </SolutionDescription>
                <SolutionLink href="#">
                  Learn more <FaExternalLinkAlt />
                </SolutionLink>
              </SolutionCard>

              <SolutionCard variants={fadeInUp}>
                <IconContainer>
                  <FaMobileAlt />
                </IconContainer>
                <SolutionTitle>Mobile Applications</SolutionTitle>
                <SolutionDescription>
                  Manage your shipments on the go with our mobile apps for both iOS and Android, 
                  providing tracking, notifications, and document access from your smartphone.
                </SolutionDescription>
                <SolutionLink href="#">
                  Download now <FaExternalLinkAlt />
                </SolutionLink>
              </SolutionCard>

              <SolutionCard variants={fadeInUp}>
                <IconContainer>
                  <FaChartLine />
                </IconContainer>
                <SolutionTitle>Analytics Dashboard</SolutionTitle>
                <SolutionDescription>
                  Gain valuable insights into your logistics operations with customizable 
                  dashboards, performance metrics, and trend analysis tools.
                </SolutionDescription>
                <SolutionLink href="#">
                  Explore features <FaExternalLinkAlt />
                </SolutionLink>
              </SolutionCard>

              <SolutionCard variants={fadeInUp}>
                <IconContainer>
                  <FaClipboardCheck />
                </IconContainer>
                <SolutionTitle>Customs Compliance</SolutionTitle>
                <SolutionDescription>
                  Streamline your customs declaration process with our automated compliance tools 
                  that ensure accurate documentation and regulatory adherence.
                </SolutionDescription>
                <SolutionLink href="#">
                  Learn more <FaExternalLinkAlt />
                </SolutionLink>
              </SolutionCard>

              <SolutionCard variants={fadeInUp}>
                <IconContainer>
                  <FaTruck />
                </IconContainer>
                <SolutionTitle>Transport Management</SolutionTitle>
                <SolutionDescription>
                  Optimize your inland transportation with our digital platform that connects 
                  you with verified carriers and provides real-time visibility.
                </SolutionDescription>
                <SolutionLink href="#">
                  Discover solution <FaExternalLinkAlt />
                </SolutionLink>
              </SolutionCard>

              <SolutionCard variants={fadeInUp}>
                <IconContainer>
                  <FaFileInvoiceDollar />
                </IconContainer>
                <SolutionTitle>Digital Invoicing</SolutionTitle>
                <SolutionDescription>
                  Simplify your financial processes with our electronic invoicing system that 
                  offers secure online payments and detailed transaction histories.
                </SolutionDescription>
                <SolutionLink href="#">
                  Explore features <FaExternalLinkAlt />
                </SolutionLink>
              </SolutionCard>

              <SolutionCard variants={fadeInUp}>
                <IconContainer>
                  <FaSatelliteDish />
                </IconContainer>
                <SolutionTitle>API Integration</SolutionTitle>
                <SolutionDescription>
                  Seamlessly connect Ocean Crown's systems with your own business applications 
                  through our comprehensive API suite for data exchange.
                </SolutionDescription>
                <SolutionLink href="#">
                  View documentation <FaExternalLinkAlt />
                </SolutionLink>
              </SolutionCard>

              <SolutionCard variants={fadeInUp}>
                <IconContainer>
                  <FaShieldAlt />
                </IconContainer>
                <SolutionTitle>Secure Document Exchange</SolutionTitle>
                <SolutionDescription>
                  Exchange shipping documents securely through our encrypted platform that ensures 
                  confidentiality and maintains a complete audit trail.
                </SolutionDescription>
                <SolutionLink href="#">
                  Learn more <FaExternalLinkAlt />
                </SolutionLink>
              </SolutionCard>

              <SolutionCard variants={fadeInUp}>
                <IconContainer>
                  <FaUsersCog />
                </IconContainer>
                <SolutionTitle>Supplier Collaboration</SolutionTitle>
                <SolutionDescription>
                  Enhance coordination with your suppliers through our collaborative platform 
                  that enables shared visibility and aligned planning.
                </SolutionDescription>
                <SolutionLink href="#">
                  Explore features <FaExternalLinkAlt />
                </SolutionLink>
              </SolutionCard>
            </DigitalSolutionsGrid>
          </motion.div>
        </Container>
      </ContentSection>

      <ContentSection bgColor={colors.sand}>
        <Container>
          <SectionTitle>Benefits of Digital Transformation</SectionTitle>
          <SectionIntro>
            Embracing Ocean Crown's eBusiness solutions delivers tangible advantages that 
            enhance your competitive edge, reduce costs, and improve customer satisfaction.
          </SectionIntro>

          <BenefitsContainer>
            <BenefitsContent>
              <BenefitsList>
                <BenefitItem>
                  <FaChartLine />
                  <BenefitContent>
                    <BenefitTitle>Enhanced Operational Efficiency</BenefitTitle>
                    <BenefitDescription>
                      Automate routine tasks, reduce manual paperwork, and streamline processes 
                      to accelerate operations and minimize administrative overhead.
                    </BenefitDescription>
                  </BenefitContent>
                </BenefitItem>
                
                <BenefitItem>
                  <FaGlobe />
                  <BenefitContent>
                    <BenefitTitle>Complete Supply Chain Visibility</BenefitTitle>
                    <BenefitDescription>
                      Gain end-to-end transparency of your cargo movements with real-time 
                      status updates that enable proactive decision-making.
                    </BenefitDescription>
                  </BenefitContent>
                </BenefitItem>
                
                <BenefitItem>
                  <FaFileInvoiceDollar />
                  <BenefitContent>
                    <BenefitTitle>Cost Reduction</BenefitTitle>
                    <BenefitDescription>
                      Minimize errors, prevent delays, and optimize resource allocation to 
                      significantly reduce your overall logistics expenditure.
                    </BenefitDescription>
                  </BenefitContent>
                </BenefitItem>
                
                <BenefitItem>
                  <FaUsersCog />
                  <BenefitContent>
                    <BenefitTitle>Improved Customer Experience</BenefitTitle>
                    <BenefitDescription>
                      Provide your customers with precise delivery estimates, proactive 
                      updates, and self-service tools that enhance satisfaction.
                    </BenefitDescription>
                  </BenefitContent>
                </BenefitItem>
              </BenefitsList>
            </BenefitsContent>
            
            <BenefitsImage src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=900" />
          </BenefitsContainer>
          
          <StatsContainer>
            <StatBox>
              <StatNumber>40%</StatNumber>
              <StatLabel>Average reduction in documentation processing time</StatLabel>
            </StatBox>
            
            <StatBox>
              <StatNumber>99.8%</StatNumber>
              <StatLabel>Data accuracy rate with our digital solutions</StatLabel>
            </StatBox>
            
            <StatBox>
              <StatNumber>24/7</StatNumber>
              <StatLabel>Access to your shipping data from anywhere</StatLabel>
            </StatBox>
            
            <StatBox>
              <StatNumber>30%</StatNumber>
              <StatLabel>Typical decrease in administrative costs</StatLabel>
            </StatBox>
          </StatsContainer>
        </Container>
      </ContentSection>

      <ContentSection>
        <Container>
          <SectionTitle>Featured Solutions</SectionTitle>
          <SectionIntro>
            Explore our most popular digital tools that are helping businesses like yours 
            transform their logistics operations in the digital age.
          </SectionIntro>
          
          <FeatureSection>
            <FeatureTextContainer>
              <FeatureTitle>myOceanCrown Customer Portal</FeatureTitle>
              <FeatureDescription>
                Our flagship digital platform puts complete control of your shipping operations 
                at your fingertips. With an intuitive dashboard interface, you can easily track 
                shipments, manage bookings, access documentation, and generate reports.
              </FeatureDescription>
              <FeatureDescription>
                The platform offers role-based access controls, allowing you to grant appropriate 
                visibility to different team members while maintaining security. Custom alerts 
                notify you of important events, while our analytics tools help you identify trends 
                and optimization opportunities.
              </FeatureDescription>
              <SolutionLink href="#">
                Request portal access <FaExternalLinkAlt />
              </SolutionLink>
            </FeatureTextContainer>
            <FeatureImageContainer src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900" />
          </FeatureSection>
          
          <FeatureSection reversed>
            <FeatureTextContainer reversed>
              <FeatureTitle>Mobile Tracking Application</FeatureTitle>
              <FeatureDescription>
                Stay connected to your cargo from anywhere with our mobile application for iOS 
                and Android devices. The app provides real-time tracking updates, push notifications 
                for status changes, and easy access to essential documents.
              </FeatureDescription>
              <FeatureDescription>
                Designed for logistics professionals on the move, our app enables you to share 
                tracking information with stakeholders, capture and upload documentation, and 
                quickly reach customer support when needed - all from your smartphone or tablet.
              </FeatureDescription>
              <SolutionLink href="#">
                Download the app <FaExternalLinkAlt />
              </SolutionLink>
            </FeatureTextContainer>
            <FeatureImageContainer src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=900" />
          </FeatureSection>
          
          <FeatureSection>
            <FeatureTextContainer>
              <FeatureTitle>Business Intelligence Dashboard</FeatureTitle>
              <FeatureDescription>
                Transform raw logistics data into actionable insights with our advanced 
                analytics platform. Create customized dashboards that highlight your key 
                performance indicators and identify opportunities for operational improvement.
              </FeatureDescription>
              <FeatureDescription>
                Our BI tools offer comprehensive reporting on transit times, costs, carrier 
                performance, and carbon footprint. Interactive visualizations make complex 
                data easily digestible, while export options allow you to share insights 
                across your organization.
              </FeatureDescription>
              <SolutionLink href="#">
                Explore analytics features <FaExternalLinkAlt />
              </SolutionLink>
            </FeatureTextContainer>
            <FeatureImageContainer src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900" />
          </FeatureSection>
        </Container>
      </ContentSection>

      <ContentSection bgColor={colors.deepBlue}>
        <Container>
          <SectionTitle light>Integration Capabilities</SectionTitle>
          <SectionIntro light>
            Our digital solutions are designed to work seamlessly with your existing systems, 
            enabling smooth data flow across your entire business ecosystem.
          </SectionIntro>
          
          <BenefitsContainer>
            <BenefitsContent>
              <BenefitsList>
                <BenefitItem>
                  <FaLaptopCode style={{ color: colors.coral }} />
                  <BenefitContent>
                    <BenefitTitle style={{ color: colors.white }}>REST API Suite</BenefitTitle>
                    <BenefitDescription style={{ color: colors.skyBlue }}>
                      Connect directly to our systems with our comprehensive API suite that 
                      supports tracking, booking, documentation, and reporting functions.
                    </BenefitDescription>
                  </BenefitContent>
                </BenefitItem>
                
                <BenefitItem>
                  <FaSatelliteDish style={{ color: colors.coral }} />
                  <BenefitContent>
                    <BenefitTitle style={{ color: colors.white }}>EDI Connectivity</BenefitTitle>
                    <BenefitDescription style={{ color: colors.skyBlue }}>
                      Exchange data with our systems using industry-standard EDI formats that 
                      ensure compatibility with your existing EDI infrastructure.
                    </BenefitDescription>
                  </BenefitContent>
                </BenefitItem>
                
                <BenefitItem>
                  <FaFileInvoiceDollar style={{ color: colors.coral }} />
                  <BenefitContent>
                    <BenefitTitle style={{ color: colors.white }}>ERP Integrations</BenefitTitle>
                    <BenefitDescription style={{ color: colors.skyBlue }}>
                      Connect Ocean Crown's digital services with leading ERP systems like 
                      SAP, Oracle, and Microsoft Dynamics for seamless data exchange.
                    </BenefitDescription>
                  </BenefitContent>
                </BenefitItem>
                
                <BenefitItem>
                  <FaShieldAlt style={{ color: colors.coral }} />
                  <BenefitContent>
                    <BenefitTitle style={{ color: colors.white }}>Secure Data Transfer</BenefitTitle>
                    <BenefitDescription style={{ color: colors.skyBlue }}>
                      All integrations utilize industry-leading encryption and security 
                      protocols to ensure your data remains protected at all times.
                    </BenefitDescription>
                  </BenefitContent>
                </BenefitItem>
              </BenefitsList>
            </BenefitsContent>
          </BenefitsContainer>
        </Container>
      </ContentSection>

      <ContentSection>
        <Container>
          <CTASection>
            <CTATitle>Ready to Transform Your Logistics Experience?</CTATitle>
            <CTADescription>
              Schedule a personalized demonstration of our eBusiness solutions and discover 
              how digital tools can elevate your shipping and logistics operations.
            </CTADescription>
            <CTAButton href="#demo-form">
              Request a Demo <FaExternalLinkAlt />
            </CTAButton>
          </CTASection>
          
          <DemoFormContainer id="demo-form">
            <FormTitle>Request Your Personalized Demo</FormTitle>
            <form>
              <FormGroup>
                <FormLabel>Full Name*</FormLabel>
                <FormInput type="text" placeholder="Enter your full name" required />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Company Name*</FormLabel>
                <FormInput type="text" placeholder="Enter your company name" required />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Business Email*</FormLabel>
                <FormInput type="email" placeholder="Enter your business email" required />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Phone Number</FormLabel>
                <FormInput type="tel" placeholder="Enter your phone number" />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Solutions of Interest*</FormLabel>
                <FormSelect required>
                  <option value="">Select your area of interest</option>
                  <option value="portal">myOceanCrown Portal</option>
                  <option value="mobile">Mobile Applications</option>
                  <option value="analytics">Business Intelligence</option>
                  <option value="customs">Customs Compliance</option>
                  <option value="integration">API Integration</option>
                  <option value="all">All Solutions</option>
                </FormSelect>
              </FormGroup>
              
              <SubmitButton type="submit">
                Request Demo <FaPaperPlane />
              </SubmitButton>
            </form>
          </DemoFormContainer>
        </Container>
      </ContentSection>
    </EBusinessSection>
  );
};

export default EBusiness; 