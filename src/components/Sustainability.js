import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLeaf, FaShip, FaRecycle, FaWater, FaSolarPanel, FaHandsHelping, FaQuoteLeft, FaFileAlt, FaChartLine, FaUsers, FaCheckCircle, FaExternalLinkAlt } from 'react-icons/fa';

// Maritime color palette
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
const SustainabilitySection = styled.div`
  width: 100%;
  overflow-x: hidden;
  color: #444;
`;

const HeroSection = styled.div`
  background: linear-gradient(rgba(96, 125, 148, 0.6), rgba(76, 100, 120, 0.7)),
              url('https://images.pexels.com/photos/2611675/pexels-photo-2611675.jpeg?auto=compress&cs=tinysrgb&w=1920') no-repeat center center;
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
    background: linear-gradient(to right, ${colors.coral}, #3a86ff);
  }
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
  font-size: 32px;
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${props => props.light ? colors.white : colors.deepBlue};
  font-weight: 600;
  position: relative;
  
  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 1rem;
  }
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background-color: ${colors.coral};
    margin: 15px auto 0;
    border-radius: 2px;
    
    @media (max-width: 768px) {
      width: 50px;
      margin-top: 10px;
    }
  }
`;

const SectionIntro = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  font-size: 0.95rem;
  line-height: 1.7;
  color: ${props => props.light ? colors.skyBlue : '#555'};
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    line-height: 1.6;
    margin: 0 auto 2.5rem;
  }
`;

const CommitmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const CommitmentCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(5px);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 48, 87, 0.12);
    border-color: rgba(0, 119, 182, 0.1);
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 220px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30px;
    background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  }
`;

const CardContent = styled.div`
  padding: 30px;
`;

const CardTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 15px;
  color: ${colors.deepBlue};
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

const CardDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: #555;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    line-height: 1.5;
  }
`;

const StatContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 60px 0;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 0 20px;
  flex: 1;
  min-width: 200px;
  margin-bottom: 30px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 20%;
    bottom: 20%;
    width: 1px;
    background: linear-gradient(to bottom, transparent, rgba(0, 48, 87, 0.1), transparent);
  }
  
  &:last-child::after {
    display: none;
  }
`;

const StatNumber = styled.div`
  font-size: 42px;
  font-weight: 700;
  color: ${colors.oceanBlue};
  margin-bottom: 10px;
  display: inline-block;
  position: relative;
  
  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 6px;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 100%;
    height: 6px;
    background-color: rgba(144, 224, 239, 0.3);
    z-index: -1;
    border-radius: 3px;
  }
`;

const StatLabel = styled.div`
  font-size: 0.95rem;
  color: #555;
  max-width: 180px;
  margin: 0 auto;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const InitiativeSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin: 60px 0;
  
  @media (max-width: 768px) {
    flex-direction: ${props => props.reversed ? 'column-reverse' : 'column'};
    gap: 30px;
    margin: 40px 0;
  }
`;

const InitiativeContent = styled.div`
  flex: 1;
  min-width: 300px;
  
  @media (max-width: 768px) {
    min-width: 100%;
    padding: 0 10px;
  }
`;

const InitiativeMedia = styled.div`
  flex: 1;
  min-width: 300px;
  border-radius: 12px;
  overflow: hidden;
  min-height: 450px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  
  @media (max-width: 768px) {
    min-height: 300px;
    min-width: 100%;
    margin: 0 -5px;
  }
`;

const InitiativeTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 20px;
  color: ${colors.oceanBlue};
  position: relative;
  white-space: normal;
  word-break: break-word;
  
  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 16px;
    line-height: 1.4;
  }
`;

const TitleUnderline = styled.div`
  width: 60px;
  height: 4px;
  background-color: ${colors.coral};
  border-radius: 2px;
  margin: 0 0 20px 0;
  display: block;
  
  @media (max-width: 768px) {
    width: 50px;
    margin-bottom: 15px;
  }
`;

const InitiativeDescription = styled.p`
  color: #555;
  line-height: 1.8;
  margin-bottom: 24px;
  font-size: 0.95rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: 20px;
    text-align: left;
  }
`;

const QuoteBox = styled.div`
  background-color: rgba(248, 249, 250, 0.9);
  border-left: 5px solid ${colors.oceanBlue};
  padding: 40px;
  margin: 70px 0;
  font-style: italic;
  color: #555;
  position: relative;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.05);
  border-radius: 0 8px 8px 0;
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    top: -30px;
    left: 40px;
    width: 60px;
    height: 60px;
    background-color: ${colors.white};
    border-radius: 50%;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }
`;

const QuoteIcon = styled(FaQuoteLeft)`
  position: absolute;
  top: -15px;
  left: 57px;
  font-size: 26px;
  color: ${colors.oceanBlue};
  z-index: 2;
`;

const Quote = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 20px;
  color: #444;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    line-height: 1.5;
    margin-bottom: 15px;
  }
`;

const QuoteAuthor = styled.p`
  font-weight: 600;
  text-align: right;
  color: ${colors.deepBlue};
  font-style: normal;
`;

const FullWidthImage = styled.div`
  width: 100%;
  height: 450px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  margin: 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, 
      rgba(0, 48, 87, 0.2),
      rgba(0, 48, 87, 0.1) 50%,
      rgba(0, 48, 87, 0.2)
    );
  }
`;

const CTAButton = styled.a`
  display: inline-block;
  padding: 16px 32px;
  background: ${colors.coral};
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px rgba(246, 173, 85, 0.3);
  
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 12px 24px;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(246, 173, 85, 0.4);
  }
`;

const TransparencyContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  margin: 80px 0;
  position: relative;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 48, 87, 0.1);
`;

const TransparencyHeader = styled.div`
  background: linear-gradient(135deg, ${colors.deepBlue} 0%, ${colors.oceanBlue} 100%);
  padding: 40px;
  color: white;
  position: relative;
`;

const TransparencyTitle = styled.h3`
  font-size: 2.2rem;
  margin-bottom: 15px;
  position: relative;
`;

const TransparencySubtitle = styled.p`
  font-size: 1.1rem;
  margin: 0;
  line-height: 1.6;
  max-width: 700px;
  position: relative;
`;

const TransparencyContent = styled.div`
  padding: 40px;
`;

const TransparencyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 20px;
`;

const TransparencyItem = styled.div`
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 48, 87, 0.1);
  }
`;

const TransparencyIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${colors.oceanBlue} 0%, ${colors.deepBlue} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: white;
  font-size: 24px;
`;

const TransparencyItemTitle = styled.h4`
  font-size: 1.3rem;
  color: ${colors.deepBlue};
  margin-bottom: 15px;
`;

const TransparencyItemDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 12px 25px;
  background: ${colors.deepBlue};
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  margin-top: 30px;
  transition: all 0.3s ease;
  
  svg {
    margin-left: 8px;
  }
  
  &:hover {
    background: ${colors.oceanBlue};
    transform: translateY(-3px);
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

const Sustainability = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SustainabilitySection>
      <HeroSection>
        <HeroContent>
          <PageTitle>Sustainability</PageTitle>
          <Subtitle>
            Our commitment to environmental responsibility and sustainable maritime practices
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
            <SectionTitle>Our Environmental Commitments</SectionTitle>
            <SectionIntro>
              At Ocean Crown, we believe in responsible shipping that minimizes environmental impact.
              Our sustainability initiatives are designed to protect ocean ecosystems while maintaining
              efficient global logistics that connect businesses to worldwide markets.
            </SectionIntro>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <CommitmentGrid>
              <CommitmentCard
                variants={fadeInUp}
              >
                <CardImage src="https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?q=80&w=800" />
                <CardContent>
                  <CardTitle>Carbon Footprint Reduction</CardTitle>
                  <CardDescription>
                    We're committed to reducing our carbon footprint by 30% by 2030 through 
                    vessel optimization, alternative fuels, and operational efficiency across our global fleet.
                  </CardDescription>
                </CardContent>
              </CommitmentCard>

              <CommitmentCard
                variants={fadeInUp}
              >
                <CardImage src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=800" />
                <CardContent>
                  <CardTitle>Sustainable Fleet</CardTitle>
                  <CardDescription>
                    Our growing fleet incorporates the latest eco-friendly technologies, 
                    including hybrid engines and optimized hull designs to reduce fuel consumption and emissions.
                  </CardDescription>
                </CardContent>
              </CommitmentCard>

              <CommitmentCard
                variants={fadeInUp}
              >
                <CardImage src="https://images.unsplash.com/photo-1621451537084-482c73073a0f?q=80&w=800" />
                <CardContent>
                  <CardTitle>Waste Management</CardTitle>
                  <CardDescription>
                    We implement comprehensive waste management systems across our operations
                    to minimize waste, prevent ocean pollution, and ensure proper recycling and disposal.
                  </CardDescription>
                </CardContent>
              </CommitmentCard>

              <CommitmentCard
                variants={fadeInUp}
              >
                <CardImage src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800" />
                <CardContent>
                  <CardTitle>Ocean Conservation</CardTitle>
                  <CardDescription>
                    We actively participate in coastal cleanup initiatives and support 
                    marine conservation projects focused on protecting fragile marine ecosystems across West Africa.
                  </CardDescription>
                </CardContent>
              </CommitmentCard>

              <CommitmentCard
                variants={fadeInUp}
              >
                <CardImage src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800" />
                <CardContent>
                  <CardTitle>Renewable Energy</CardTitle>
                  <CardDescription>
                    Our offices and terminals are increasingly powered by renewable energy sources,
                    with a goal of 50% renewable energy usage by 2025 across all our global operations.
                  </CardDescription>
                </CardContent>
              </CommitmentCard>

              <CommitmentCard
                variants={fadeInUp}
              >
                <CardImage src="https://images.unsplash.com/photo-1527525443983-6e60c75fff46?q=80&w=800" />
                <CardContent>
                  <CardTitle>Community Engagement</CardTitle>
                  <CardDescription>
                    We partner with local communities to promote environmental education
                    and sustainable development in coastal regions that depend on healthy marine environments.
                  </CardDescription>
                </CardContent>
              </CommitmentCard>
            </CommitmentGrid>
          </motion.div>
        </Container>
      </ContentSection>

      <FullWidthImage src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=2070" />

      <ContentSection bgColor={colors.sand}>
        <Container>
          <SectionTitle>Our Transparent Reporting</SectionTitle>
          <SectionIntro>
            We believe in complete transparency about our environmental impact. Every year, 
            we publish detailed sustainability metrics and progress reports that are independently 
            verified and publicly available.
          </SectionIntro>

          <TransparencyContainer>
            <TransparencyHeader>
              <TransparencyTitle>Sustainability Transparency Report</TransparencyTitle>
              <TransparencySubtitle>
                Our commitment to honest, verifiable reporting of our environmental footprint and sustainability progress
              </TransparencySubtitle>
            </TransparencyHeader>
            
            <TransparencyContent>
              <TransparencyGrid>
                <TransparencyItem>
                  <TransparencyIcon>
                    <FaFileAlt />
                  </TransparencyIcon>
                  <TransparencyItemTitle>Annual Reporting</TransparencyItemTitle>
                  <TransparencyItemDescription>
                    We publish comprehensive annual sustainability reports that detail our 
                    environmental impact, initiatives, and progress toward our goals.
                  </TransparencyItemDescription>
                </TransparencyItem>
                
                <TransparencyItem>
                  <TransparencyIcon>
                    <FaChartLine />
                  </TransparencyIcon>
                  <TransparencyItemTitle>Emissions Tracking</TransparencyItemTitle>
                  <TransparencyItemDescription>
                    We measure and report Scope 1, 2, and 3 emissions according to the 
                    Greenhouse Gas Protocol and share this data publicly.
                  </TransparencyItemDescription>
                </TransparencyItem>
                
                <TransparencyItem>
                  <TransparencyIcon>
                    <FaUsers />
                  </TransparencyIcon>
                  <TransparencyItemTitle>Third-Party Verification</TransparencyItemTitle>
                  <TransparencyItemDescription>
                    All our sustainability data and claims are independently verified by 
                    accredited environmental auditors and certification bodies.
                  </TransparencyItemDescription>
                </TransparencyItem>
                
                <TransparencyItem>
                  <TransparencyIcon>
                    <FaCheckCircle />
                  </TransparencyIcon>
                  <TransparencyItemTitle>Transparent Goals</TransparencyItemTitle>
                  <TransparencyItemDescription>
                    We set clear, measurable sustainability targets with specific timelines 
                    and regularly report on our progress, success, and challenges.
                  </TransparencyItemDescription>
                </TransparencyItem>
              </TransparencyGrid>
              
              <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <DownloadButton href="/sustainability-report.pdf">
                  Download our 2023 Sustainability Report
                  <FaExternalLinkAlt />
                </DownloadButton>
              </div>
            </TransparencyContent>
          </TransparencyContainer>

          <StatContainer>
            <StatItem>
              <StatNumber>22%</StatNumber>
              <StatLabel>Carbon Emission Reduction Since 2018</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>15</StatNumber>
              <StatLabel>Beach Cleanup Events Organized Annually</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>35%</StatNumber>
              <StatLabel>Renewable Energy in Our Operations</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>850+</StatNumber>
              <StatLabel>Staff Hours Dedicated to Environmental Training</StatLabel>
            </StatItem>
          </StatContainer>

          <QuoteBox>
            <QuoteIcon />
            <Quote>
              "The shipping industry has a responsibility to lead the way in sustainable
              practices. At Ocean Crown, we're committed to proving that economic growth
              and environmental protection can go hand in hand across the world's oceans."
            </Quote>
            <QuoteAuthor>— Ocean Crown CEO</QuoteAuthor>
          </QuoteBox>
        </Container>
      </ContentSection>

      <FullWidthImage src="https://images.unsplash.com/photo-1596237563267-84ffd99c80e1?q=80&w=2070" />

      <ContentSection>
        <Container>
          <SectionTitle>Our Ocean Initiatives</SectionTitle>
          <SectionIntro>
            Learn more about our key sustainability initiatives that are making a difference
            in Nigeria's waters and across international shipping routes:
          </SectionIntro>

          <InitiativeSection>
            <InitiativeContent>
              <InitiativeTitle>Green Shipping Corridor</InitiativeTitle>
              <TitleUnderline />
              <InitiativeDescription>
                We're proud to be part of the West African Green Shipping Corridor initiative,
                which aims to establish low and zero-carbon maritime routes between Nigeria and 
                key international ports. This collaboration between shipping companies, port 
                authorities, and energy providers is creating the infrastructure necessary for 
                sustainable shipping.
              </InitiativeDescription>
              <InitiativeDescription>
                Through this initiative, we're working to reduce emissions by optimizing routes,
                implementing shore power connections, and transitioning to cleaner fuels in some
                of the world's busiest shipping lanes.
              </InitiativeDescription>
            </InitiativeContent>
            <InitiativeMedia src="https://images.pexels.com/photos/2144326/pexels-photo-2144326.jpeg?auto=compress&cs=tinysrgb&w=900" />
          </InitiativeSection>

          <InitiativeSection reversed>
            <InitiativeContent>
              <InitiativeTitle>Lagos Coastal Conservation Program</InitiativeTitle>
              <TitleUnderline />
              <InitiativeDescription>
                Our Lagos Coastal Conservation Program focuses on protecting marine ecosystems 
                along Nigeria's coastline. Through partnerships with local environmental organizations,
                we conduct regular beach cleanups, mangrove restoration projects, and educational
                workshops for local communities.
              </InitiativeDescription>
              <InitiativeDescription>
                This program has removed over 35 tons of plastic waste from coastal areas since 
                its inception and has planted more than 10,000 mangrove seedlings to protect
                shorelines and provide critical habitat for marine species that are essential to
                ocean health.
              </InitiativeDescription>
            </InitiativeContent>
            <InitiativeMedia src="https://images.pexels.com/photos/2961034/pexels-photo-2961034.jpeg?auto=compress&cs=tinysrgb&w=900" />
          </InitiativeSection>

          <InitiativeSection>
            <InitiativeContent>
              <InitiativeTitle>Sustainable Supply Chain Certification</InitiativeTitle>
              <TitleUnderline />
              <InitiativeDescription>
                We've developed a Sustainable Supply Chain Certification program to help our clients
                verify and improve the environmental performance of their maritime logistics operations.
                This program includes comprehensive assessments, customized improvement plans,
                and regular monitoring to ensure continuous progress toward ocean-friendly practices.
              </InitiativeDescription>
              <InitiativeDescription>
                By participating in this certification, businesses can demonstrate their commitment
                to sustainability and gain a competitive advantage in markets where environmental
                responsibility is increasingly valued, while contributing to healthier oceans.
              </InitiativeDescription>
            </InitiativeContent>
            <InitiativeMedia src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=900" />
          </InitiativeSection>
        </Container>
      </ContentSection>

      <ContentSection bgColor={colors.deepBlue}>
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <SectionTitle light>Join Our Ocean Sustainability Journey</SectionTitle>
            <SectionIntro light>
              We believe in the power of collaboration to protect our oceans. Partner with Ocean Crown 
              to make your supply chain more sustainable and contribute to healthier marine ecosystems 
              around the world, one shipment at a time.
            </SectionIntro>
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <CTAButton href="/quote">
                Get a Sustainable Shipping Quote
              </CTAButton>
            </div>
          </motion.div>
        </Container>
      </ContentSection>
    </SustainabilitySection>
  );
};

export default Sustainability; 