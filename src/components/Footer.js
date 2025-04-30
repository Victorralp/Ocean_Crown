import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube,
  FaWhatsapp
} from 'react-icons/fa';
import { useTranslation } from '../App';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterLogo>
            <img src="/images/ChatGPT Image Apr 20, 2025, 11_29_19 AM.png" alt="Ocean Crown Logo" />
          </FooterLogo>
          <FooterText>
            Ocean Crown delivers comprehensive shipping and logistics services designed to optimize 
            your supply chain and enhance your business performance.
          </FooterText>
          <FooterSocial>
            <SocialLink href="https://www.facebook.com/share/16ZSBRcQno/" target="_blank" rel="noopener noreferrer" title="Visit our Facebook page">
              <FaFacebookF />
            </SocialLink>
            <SocialLink href="https://www.instagram.com/ocmultilink?igsh=MTB3NHY2eDM5bGt2dg==" target="_blank" rel="noopener noreferrer" title="Follow us on Instagram">
              <FaInstagram />
            </SocialLink>
            <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialLink>
            <SocialLink href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </SocialLink>
          </FooterSocial>
        </FooterSection>
        
        <FooterSection>
          <FooterHeading>Quick Links</FooterHeading>
          <FooterLinks>
            <FooterLink as={Link} to="/services">Our Services</FooterLink>
            <FooterLink as={Link} to="/industries">Industries</FooterLink>
            <FooterLink as={Link} to="/about">About Us</FooterLink>
            <FooterLink as={Link} to="/sustainability">Sustainability</FooterLink>
            <FooterLink as={Link} to="/ebusiness">eBusiness</FooterLink>
            <FooterLink as={Link} to="/faq">FAQ</FooterLink>
            <FooterLink as={Link} to="/contact">Contact Us</FooterLink>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterHeading>Contact Us</FooterHeading>
          <ContactInfo>
            <ContactItem>
              <ContactIcon><FaMapMarkerAlt /></ContactIcon>
              <div>
                67 Payne Crescent, Apapa, Lagos, Nigeria<br />
              </div>
            </ContactItem>
            <ContactItem>
              <ContactIcon><FaPhone /></ContactIcon>
              <div>
                <a href="tel:+2348053408828">+234 805 340 8828</a> 
                <ContactLinkWrapper>
                  <ContactLink href="https://wa.me/2348053408828" target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp /> WhatsApp
                  </ContactLink>
                </ContactLinkWrapper>
              </div>
            </ContactItem>
            <ContactItem>
              <ContactIcon><FaPhone /></ContactIcon>
              <div>
                <a href="tel:+2349073560121">+234 907 356 0121</a>
                <small> (Customer Care)</small>
              </div>
            </ContactItem>
            <ContactItem>
              <ContactIcon><FaEnvelope /></ContactIcon>
              <div>
                <a href="mailto:operations@ocmultilinks.com">operations@ocmultilinks.com</a>
              </div>
            </ContactItem>
          </ContactInfo>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <Copyright>
          © {currentYear} OCEAN CROWN MULTILINKS ENTERPRISES LTD. All rights reserved.
        </Copyright>
        <FooterBottomLinks>
          <FooterBottomLink as={Link} to="/privacy-policy">Privacy Policy</FooterBottomLink>
          <FooterBottomLink as={Link} to="/terms-of-service">Terms of Service</FooterBottomLink>
          <FooterBottomLink as={Link} to="/sitemap">Sitemap</FooterBottomLink>
        </FooterBottomLinks>
      </FooterBottom>
    </FooterContainer>
  );
};

// Styled components for the Footer
const FooterContainer = styled.footer`
  background: #1a2a3a;
  color: #e0e0e0;
  padding: 60px 0 20px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20px;
  
  @media (max-width: 768px) {
  flex-direction: column;
    gap: 40px;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 250px;
  margin-bottom: 30px;
  
  &:not(:last-child) {
    margin-right: 40px;
  }
  
  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const FooterLogo = styled.div`
  margin-bottom: 20px;
  
  img {
    height: 50px;
    width: auto;
    filter: brightness(0) invert(1);
  }
`;

const FooterText = styled.p`
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
  opacity: 0.8;
  color: #e0e0e0;
`;

const FooterSocial = styled.div`
  display: flex;
  gap: 12px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: #e0e0e0;
  transition: all 0.3s ease;

  &:hover {
    background: #F6AD55;
    color: white;
    transform: translateY(-2px);
  }
`;

const FooterHeading = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: white;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FooterLink = styled.a`
  color: #e0e0e0;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    color: #F6AD55;
    transform: translateX(2px);
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ContactItem = styled.div`
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: #e0e0e0;
  
  a {
    color: #e0e0e0;
    text-decoration: none;
    transition: color 0.3s ease;

  &:hover {
      color: #F6AD55;
    }
  }
`;

const ContactIcon = styled.div`
  color: #F6AD55;
  font-size: 16px;
  margin-top: 2px;
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 30px auto 0;
  padding: 20px 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const Copyright = styled.div`
  font-size: 13px;
  opacity: 0.7;
  color: #e0e0e0;
`;

const FooterBottomLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const FooterBottomLink = styled.a`
  color: #e0e0e0;
  text-decoration: none;
  font-size: 13px;
  opacity: 0.7;
  transition: all 0.3s ease;

  &:hover {
    color: #F6AD55;
    opacity: 1;
  }
`;

const ContactLinkWrapper = styled.div`
  margin-top: 5px;
  font-size: 13px;
`;

const ContactLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #F6AD55;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: white;
    text-decoration: underline;
  }
  
  svg {
    font-size: 14px;
  }
`;

export default Footer; 