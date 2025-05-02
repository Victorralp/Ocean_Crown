import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHome, FaShip, FaIndustry, FaGlobe, FaCertificate, FaQuestion, FaEnvelope, FaFileAlt, FaLeaf, FaDesktop } from 'react-icons/fa';

const PageWrapper = styled.div`
  width: 100%;
`;

const HeaderImage = styled.div`
  width: 100%;
  height: 320px;
  background: linear-gradient(rgba(12, 35, 64, 0.7), rgba(12, 35, 64, 0.8)), 
              url('/images/footer-pages/sitemap-header.jpg') no-repeat center center;
  background-size: cover;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const HeaderTitle = styled.h1`
  font-size: 48px;
  color: white;
  text-align: center;
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
  margin: 0;
  padding: 0;
`;

const SitemapContainer = styled.div`
  max-width: 1100px;
  margin: 50px auto 60px;
  padding: 0 20px;
`;

const PageTitle = styled.h1`
  font-size: 36px;
  color: #0c2340;
  margin-bottom: 30px;
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
`;

const SectionDescription = styled.p`
  font-size: 18px;
  text-align: center;
  max-width: 700px;
  margin: 30px auto 50px;
  color: #555;
  line-height: 1.6;
`;

const ContentImage = styled.div`
  width: 100%;
  height: 250px;
  background-image: url('/images/footer-pages/sitemap-content.jpg');
  background-size: cover;
  background-position: center;
  margin: 0 0 40px 0;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ImageCaption = styled.p`
  text-align: center;
  font-style: italic;
  color: #666;
  margin-top: -5px;
  margin-bottom: 30px;
  font-size: 14px;
`;

const SitemapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`;

const SitemapSection = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 25px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  color: #0c2340;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  
  svg {
    color: #05a0e8;
  }
`;

const LinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SitemapLink = styled(Link)`
  color: #555;
  text-decoration: none;
  display: block;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.2s ease;
  border-left: 2px solid transparent;
  
  &:hover {
    background: #f5f9ff;
    color: #05a0e8;
    border-left: 2px solid #05a0e8;
    padding-left: 15px;
  }
`;

const Sitemap = () => {
  return (
    <PageWrapper>
      <HeaderImage>
        <HeaderTitle>Sitemap</HeaderTitle>
      </HeaderImage>
      
      <SitemapContainer>
        <SectionDescription>
          Use this sitemap to navigate to all the pages and sections of our website.
        </SectionDescription>
        
        <ContentImage />
        <ImageCaption>Find your way through our website with this comprehensive sitemap.</ImageCaption>
        
        <SitemapGrid>
          <SitemapSection>
            <SectionTitle><FaHome /> Main Pages</SectionTitle>
            <LinksList>
              <LinkItem>
                <SitemapLink to="/">Home</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/about">About Us</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/contact">Contact Us</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/quote">Get a Free Quote</SitemapLink>
              </LinkItem>
            </LinksList>
          </SitemapSection>
          
          <SitemapSection>
            <SectionTitle><FaShip /> Services</SectionTitle>
            <LinksList>
              <LinkItem>
                <SitemapLink to="/services">All Services</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/services#ocean">Ocean Freight</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/services#air">Air Freight</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/services#inland">Inland Transportation</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/services#warehousing">Warehousing & Distribution</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/services#import">Import & Export</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/services#customs">Customs Clearance</SitemapLink>
              </LinkItem>
            </LinksList>
          </SitemapSection>
          
          <SitemapSection>
            <SectionTitle><FaIndustry /> Industries</SectionTitle>
            <LinksList>
              <LinkItem>
                <SitemapLink to="/industries">All Industries</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/industries#automotive">Automotive</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/industries#electronics">Electronics</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/industries#retail">Retail</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/industries#pharmaceutical">Pharmaceutical</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/industries#manufacturing">Manufacturing</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/industries#energy">Energy</SitemapLink>
              </LinkItem>
            </LinksList>
          </SitemapSection>
          
          <SitemapSection>
            <SectionTitle><FaGlobe /> Global Network</SectionTitle>
            <LinksList>
              <LinkItem>
                <SitemapLink to="/global-network">Global Network Map</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/global-network#locations">Key Locations</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/global-network#partners">Partner Network</SitemapLink>
              </LinkItem>
            </LinksList>
          </SitemapSection>
          
          <SitemapSection>
            <SectionTitle><FaCertificate /> Certificates</SectionTitle>
            <LinksList>
              <LinkItem>
                <SitemapLink to="/certificates">All Certificates</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/certificates#nepc">Export Registration Certificate</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/certificates#cac-oil">Certificate of Incorporation (Oil)</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/certificates#npa-license">Clearing & Forwarding License</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/certificates#cac-multilinks">Certificate of Incorporation (Multi-Links)</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/certificates#customs-license">Customs Agent License</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/certificates#export-license">Export License</SitemapLink>
              </LinkItem>
            </LinksList>
          </SitemapSection>
          
          <SitemapSection>
            <SectionTitle><FaQuestion /> Support</SectionTitle>
            <LinksList>
              <LinkItem>
                <SitemapLink to="/blog">FAQ</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/contact">Contact Support</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/privacy-policy">Privacy Policy</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/terms-of-service">Terms of Service</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/sitemap">Sitemap</SitemapLink>
              </LinkItem>
            </LinksList>
          </SitemapSection>
          
          <SitemapSection>
            <SectionTitle><FaEnvelope /> Contact</SectionTitle>
            <LinksList>
              <LinkItem>
                <SitemapLink to="/contact">Contact Us</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/quote">Get a Free Quote</SitemapLink>
              </LinkItem>
            </LinksList>
          </SitemapSection>
          
          <SitemapSection>
            <SectionTitle><FaLeaf /> Sustainability</SectionTitle>
            <LinksList>
              <LinkItem>
                <SitemapLink to="/sustainability">Sustainability Overview</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/sustainability#initiatives">Our Initiatives</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/sustainability#goals">Sustainability Goals</SitemapLink>
              </LinkItem>
            </LinksList>
          </SitemapSection>
          
          <SitemapSection>
            <SectionTitle><FaDesktop /> E-Business</SectionTitle>
            <LinksList>
              <LinkItem>
                <SitemapLink to="/ebusiness">E-Business Overview</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/ebusiness#solutions">Digital Solutions</SitemapLink>
              </LinkItem>
              <LinkItem>
                <SitemapLink to="/ebusiness#platforms">Platforms & Integration</SitemapLink>
              </LinkItem>
            </LinksList>
          </SitemapSection>
        </SitemapGrid>
      </SitemapContainer>
    </PageWrapper>
  );
};

export default Sitemap; 