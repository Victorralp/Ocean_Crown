import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FaSearch, FaGlobe, FaBars, FaClipboardList, FaEnvelope, FaPhone,
  FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube,
  FaMapMarkerAlt, FaWhatsapp
} from 'react-icons/fa';
import Services from './components/Services';
import WorldMap from './components/WorldMap';
import Certificates from './components/Certificates';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Stats from './components/Stats';
import Industries from './components/Industries';
import AboutUs from './components/AboutUs';
import Sustainability from './components/Sustainability';
import EBusiness from './components/EBusiness';
import GetFreeQuote from './components/GetFreeQuote';
import { useTranslation } from './translations/useTranslation';

// Re-export the hook for backward compatibility - many components import from App.js
export { useTranslation };

// Create Language Context with translations
export const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
});

// Styled components
const AppContainer = styled.div`
  font-family: 'Inter', sans-serif;
  color: #333;
`;

const MainNav = styled.nav`
  background: ${props => props.scrolled ? 'white' : 'rgba(0, 0, 0, 0.05)'};
  padding: 15px 40px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;

  &.scrolled {
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.scrolled ? '#333' : 'white'};
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
`;

const Logo = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  
  img {
    height: 60px;
    width: auto;
    object-fit: contain;
    filter: ${props => props.scrolled ? 'none' : 'brightness(0) invert(1)'};
    transition: all 0.3s ease;
  }
  
  @media (max-width: 768px) {
    img {
      height: 50px;
    }
  }
  
  @media (max-width: 576px) {
    img {
      height: 40px;
    }
  }
`;

const UtilityNav = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  
  @media (max-width: 768px) {
    gap: 10px;
  }
  
  @media (max-width: 576px) {
    gap: 5px;
  }
`;

const UtilityLink = styled.a`
  color: ${props => props.scrolled ? '#333' : 'white'};
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 11px;
  gap: 2px;
  transition: all 0.3s ease;
  opacity: 0.85;

  svg {
    font-size: 16px;
  }

  &:hover {
    color: ${props => props.scrolled ? '#F6AD55' : '#f0f0f0'};
    opacity: 1;
  }
`;

const LanguageButton = styled(UtilityLink)`
  padding: 5px;
  background: transparent;
  border: none;
  
  svg {
    filter: ${props => props.scrolled ? 'none' : 'brightness(0) invert(0.8) sepia(0.8) saturate(5) hue-rotate(335deg)'};
    transition: all 0.3s ease;
    opacity: 0.9;
    color: ${props => props.scrolled ? '#F6AD55' : '#F6AD55'};
  }
  
  &:hover {
    svg {
      color: #F6AD55;
      opacity: 1;
    }
  }
  
  @media (max-width: 576px) {
    span {
      display: none;
    }
  }
`;

const ContactButton = styled(UtilityLink)`
  padding: 5px;
  background: transparent;
  border: none;
  
  svg {
    filter: ${props => props.scrolled ? 'none' : 'brightness(0) invert(0.8) sepia(0.8) saturate(5) hue-rotate(335deg)'};
    transition: all 0.3s ease;
    opacity: 0.9;
    color: ${props => props.scrolled ? '#F6AD55' : '#F6AD55'};
  }
  
  &:hover {
    svg {
      color: #F6AD55;
      opacity: 1;
    }
  }
  
  @media (max-width: 576px) {
    display: none;
  }
`;

const UtilityButton = styled(UtilityLink)`
  background: #F6AD55;
  padding: 8px 16px;
  border-radius: 4px;
  color: white;

  &:hover {
    background: #ed8936;
    color: white;
  }
  
  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 10px;
    white-space: nowrap;
  }
  
  @media (max-width: 576px) {
    padding: 6px 8px;
    font-size: 9px;
  }
`;

const Hero = styled.section`
  position: relative;
  height: 100vh;
  background: url('https://images.unsplash.com/photo-1524522173746-f628baad3644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1831&q=80') center/cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  padding-top: 0;
  margin-top: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.65) 40%,
      rgba(0, 0, 0, 0.5) 100%
    );
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 2rem;
  text-align: left;
  margin-top: 160px;
`;

const HeroTitle = styled.div`
  text-align: left;
  margin-bottom: 40px;

  h2 {
    font-size: 52px;
    font-weight: 700;
    margin-bottom: 5px;
    color: white;
    
    @media (max-width: 768px) {
      font-size: 42px;
    }
    
    @media (max-width: 576px) {
      font-size: 32px;
    }
  }

  h3 {
    font-size: 24px;
    font-weight: 500;
    margin: 10px 0;
    color: #F6AD55;
    letter-spacing: 2px;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
    position: relative;
    display: inline-block;
    
    @media (max-width: 768px) {
      font-size: 20px;
    }
    
    @media (max-width: 576px) {
      font-size: 18px;
      letter-spacing: 1px;
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 80px;
      height: 2px;
      background: #F6AD55;
      
      @media (max-width: 576px) {
        width: 60px;
      }
    }
  }

  h1 {
    font-size: 36px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: white;
    margin: 20px 0 0 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    
    @media (max-width: 768px) {
      font-size: 28px;
    }
    
    @media (max-width: 576px) {
      font-size: 22px;
      letter-spacing: 0.5px;
    }
  }
`;

const MainContent = styled.main`
  padding-top: 0;
`;

const DropdownNav = styled.div`
  position: fixed;
  top: 70px;
  left: 0;
  width: 480px;
  background: linear-gradient(135deg, rgba(246, 173, 85, 0.92), rgba(237, 137, 54, 0.85));
  transform: translateY(${props => props.isOpen ? '0' : '-100%'});
  opacity: ${props => props.isOpen ? '1' : '0'};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 998;
  box-shadow: 2px 2px 20px rgba(237, 137, 54, 0.25);
  max-height: 520px;
  border-right: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

const DropdownContainer = styled.div`
  padding: 40px 0;
  position: relative;
  margin-left: 80px;
  width: 320px;
`;

const MainLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const MainNavLink = styled.a`
  color: rgba(255, 255, 255, 0.95);
  text-decoration: none;
  font-size: 36px;
  font-weight: 300;
  transition: all 0.3s ease;
  display: block;
  line-height: 1;
  letter-spacing: -0.5px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  
  &:hover {
    color: #ffffff;
    transform: translateX(2px);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  margin: 35px 0 25px 0;
`;

const QuickLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const QuickLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s ease;
  white-space: nowrap;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  
  svg {
    font-size: 16px;
    color: #ffffff;
    transition: transform 0.2s ease;
  }
  
  &:hover {
    color: #ffffff;
    
    svg {
      transform: translateX(2px);
      color: #ffffff;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 40px;
  left: -40px;
  background: none;
  border: none;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-weight: 200;
  line-height: 1;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);

  &:hover {
    color: #ED8936;
    transform: scale(1.1);
  }
`;

// New Scroll To Top component to handle navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Updated LanguageDropdown component
const LanguageDropdown = ({ isOpen, onClose }) => {
  const { language, setLanguage } = useContext(LanguageContext);
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ];
  
  if (!isOpen) return null;
  
  return (
    <div style={{
      position: 'absolute',
      top: '80px',
      right: '100px',
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      padding: '15px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      minWidth: '180px'
    }}>
      {languages.map(lang => (
        <button 
          key={lang.code}
          onClick={() => {
            setLanguage(lang.code);
            onClose();
          }}
          style={{ 
            padding: '10px 15px',
            background: language === lang.code ? '#F6AD55' : 'transparent',
            color: language === lang.code ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textAlign: 'left',
            width: '100%'
          }}
        >
          <span style={{ fontSize: '18px' }}>{lang.flag}</span>
          <span>{lang.name}</span>
        </button>
      ))}
    </div>
  );
};

// Simple Contact component that doesn't require a backend
const Contact = () => {
  const { t } = useTranslation();

  return (
    <>
      <div style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3") no-repeat center center',
        backgroundSize: 'cover',
        height: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginTop: '0',
        color: 'white',
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '40px',
          background: 'rgba(12, 35, 64, 0.5)',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            marginBottom: '1rem',
            fontWeight: '600',
            color: 'white',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>Contact Us</h1>
          <p style={{
            fontSize: '1.25rem',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: '300',
            position: 'relative',
            paddingBottom: '30px',
          }}>
            We'd love to hear from you. Please reach out to us using any of the methods below.
            <span style={{
              display: 'block',
              width: '100px',
              height: '4px',
              background: '#05a0e8',
              margin: '20px auto 0',
              borderRadius: '2px',
              position: 'absolute',
              bottom: '0',
              left: '50%',
              transform: 'translateX(-50%)',
            }}></span>
          </p>
        </div>
      </div>

      <section style={{ 
        padding: '80px 0', 
        backgroundColor: '#f9f9f9' 
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ 
              fontSize: '18px', 
              marginBottom: '30px',
              color: '#666'
            }}>
              Get in touch with our team of logistics experts. We're here to help you with all your shipping and transportation needs.
            </p>
          </div>
          
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center',
            gap: '30px' 
          }}>
            <div style={{ 
              flex: '1 1 300px',
              padding: '30px', 
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <FaEnvelope style={{ fontSize: '40px', color: '#F6AD55', marginBottom: '20px' }} />
              <h3 style={{ 
                marginBottom: '15px', 
                fontSize: '22px',
                color: '#333'
              }}>Email Us</h3>
              <p style={{ 
                marginBottom: '20px', 
                color: '#666'
              }}>
                Our team typically responds within 24 hours.
              </p>
              <a 
                href="mailto:operations@ocmultilink.com" 
                style={{ 
                  display: 'inline-block',
                  padding: '12px 25px',
                  backgroundColor: '#F6AD55',
                  color: 'white',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
              >
                Send Email
              </a>
            </div>
            
            <div style={{ 
              flex: '1 1 300px',
              padding: '30px', 
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <FaPhone style={{ fontSize: '40px', color: '#F6AD55', marginBottom: '20px' }} />
              <h3 style={{ 
                marginBottom: '15px', 
                fontSize: '22px',
                color: '#333'
              }}>Call Us</h3>
              <p style={{ 
                marginBottom: '20px', 
                color: '#666'
              }}>
                Available Monday-Friday, 9am-5pm
              </p>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'center'
              }}>
                <a 
                  href="tel:+2348053408828" 
                  style={{ 
                    display: 'inline-block',
                    padding: '12px 25px',
                    backgroundColor: '#F6AD55',
                    color: 'white',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}
                >
                  +234 805 340 8828
                </a>
                <a 
                  href="https://wa.me/2348053408828" 
                  style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 15px',
                    backgroundColor: '#25D366',
                    color: 'white',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontWeight: '500',
                    fontSize: '14px'
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp /> Chat on WhatsApp
                </a>
                <p style={{ marginTop: '10px', marginBottom: '5px', fontSize: '15px', color: '#666' }}>
                  Customer Care:
                </p>
                <a 
                  href="tel:+2349073560121" 
                  style={{ 
                    display: 'inline-block',
                    padding: '8px 15px',
                    backgroundColor: '#0c2340',
                    color: 'white',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontWeight: '500',
                    fontSize: '14px'
                  }}
                >
                  +234 907 356 0121
                </a>
              </div>
            </div>
          </div>
          
          <div style={{ 
            marginTop: '20px', 
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '30px',
            textAlign: 'center'
          }}>
            <h3 style={{ 
              marginBottom: '20px', 
              fontSize: '22px',
              color: '#333'
            }}>Corporate Headquarters</h3>
            <p style={{ 
              fontSize: '16px', 
              lineHeight: '1.6',
              color: '#666'
            }}>
              OCEAN CROWN MULTILINKS ENTERPRISES LTD<br />
              Shipping Services<br />
              📍 67 Payne Crescent<br />
              📍 7/9, Payne Crescent<br />
              📍 No 29, Payne Crescent<br />
              Apapa, Lagos, Nigeria
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [language, setLanguage] = useState(() => {
    // Get language from localStorage or default to English
    return localStorage.getItem('language') || 'en';
  });
  
  // Create refs for the dropdown nav and menu button
  const dropdownNavRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Add click outside handler for nav dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close nav if click is outside nav and not on the menu button
      if (
        isNavOpen && 
        dropdownNavRef.current && 
        !dropdownNavRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsNavOpen(false);
      }
    };
    
    // Add event listener when nav is open
    if (isNavOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Clean up event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNavOpen]);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // Update document language attribute
    document.documentElement.lang = language;
    
    // Handle RTL for Arabic
    const dir = ['ar', 'he', 'fa', 'ur'].includes(language) ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
  }, [language]);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Get current language flag
  const getLanguageFlag = () => {
    const flags = {
      en: '🇬🇧',
      fr: '🇫🇷',
      es: '🇪🇸',
      ar: '🇸🇦',
      zh: '🇨🇳',
      de: '🇩🇪',
      ja: '🇯🇵',
      ru: '🇷🇺'
    };
    return flags[language] || flags.en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <Router>
        <AppContainer>
          <ScrollToTop />
          <MainNav className={scrolled ? 'scrolled' : ''} scrolled={scrolled}>
            <MenuButton 
              ref={menuButtonRef}
              scrolled={scrolled} 
              onClick={toggleNav}
            >
              <FaBars />
            </MenuButton>
            <Logo scrolled={scrolled}>
              <Link to="/">
                <img src="/images/ChatGPT Image Apr 20, 2025, 11_29_19 AM.png" alt="Ocean Crown Logo" />
              </Link>
            </Logo>
            <UtilityNav>
              <LanguageButton 
                as="button" 
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)} 
                scrolled={scrolled}
              >
                <FaGlobe />
                {getLanguageFlag()}
              </LanguageButton>
              <LanguageDropdown 
                isOpen={isLangDropdownOpen} 
                onClose={() => setIsLangDropdownOpen(false)} 
              />
              <ContactButton as={Link} to="/contact" scrolled={scrolled}>
                <FaEnvelope />
                Contact
              </ContactButton>
              <UtilityButton as={Link} to="/quote" scrolled={scrolled}>
                Get a Free Quote
              </UtilityButton>
            </UtilityNav>
          </MainNav>

          <DropdownNav 
            ref={dropdownNavRef}
            isOpen={isNavOpen}
          >
            <DropdownContainer>
              <CloseButton onClick={toggleNav}>✕</CloseButton>
              <MainLinks>
                <MainNavLink as={Link} to="/services" onClick={toggleNav}>
                  <MenuTranslation keyPath="menu.solutions" />
                </MainNavLink>
                <MainNavLink as={Link} to="/industries" onClick={toggleNav}>
                  <MenuTranslation keyPath="menu.industries" />
                </MainNavLink>
                <MainNavLink as={Link} to="/ebusiness" onClick={toggleNav}>
                  <MenuTranslation keyPath="menu.ebusiness" />
                </MainNavLink>
                <MainNavLink as={Link} to="/sustainability" onClick={toggleNav}>
                  <MenuTranslation keyPath="menu.sustainability" />
                </MainNavLink>
                <MainNavLink as={Link} to="/about" onClick={toggleNav}>
                  <MenuTranslation keyPath="menu.aboutUs" />
                </MainNavLink>
                <MainNavLink as={Link} to="/quote" onClick={toggleNav}>
                  Get a Free Quote
                </MainNavLink>
              </MainLinks>
              <Divider />
              <QuickLinks>
                <QuickLink as={Link} to="/blog" onClick={toggleNav}>
                  <FaClipboardList />
                  FAQ
                </QuickLink>
                <QuickLink as={Link} to="/contact" onClick={toggleNav}>
                  <FaEnvelope />
                  Contact
                </QuickLink>
              </QuickLinks>
            </DropdownContainer>
          </DropdownNav>

          <MainContent>
            <Routes>
              {/* Home page with all components */}
              <Route path="/" element={
                <>
                  <Hero>
                    <HeroContent>
                      <HeroTitle>
                        <h2>OCEAN CROWN</h2>
                        <h1>MULTILINKS ENTERPRISES LTD</h1>
                        <h3>SHIPPING AND LOGISTICS</h3>
                      </HeroTitle>
                    </HeroContent>
                  </Hero>

                  <Services />
                  <Stats />
                  <Industries />
                  <WorldMap />
                  <Certificates />
                  <FAQ />
                  <GetFreeQuote />
                </>
              } />

              {/* Individual component routes */}
              <Route path="/services" element={<Services />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/global-network" element={<WorldMap />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/blog" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/quote" element={<GetFreeQuote />} />
              
              {/* Other static pages */}
              <Route path="/ebusiness" element={<EBusiness />} />
              <Route path="/sustainability" element={<Sustainability />} />
              <Route path="/about" element={<AboutUs />} />
            </Routes>
          </MainContent>
          <Footer />
        </AppContainer>
      </Router>
    </LanguageContext.Provider>
  );
}

// Helper components for translations
const UtilityTranslation = ({ keyPath }) => {
  const { t } = useTranslation();
  return <>{t(keyPath)}</>;
};

const MenuTranslation = ({ keyPath }) => {
  const { t } = useTranslation();
  return <>{t(keyPath)}</>;
};

const HeroTranslation = ({ keyPath }) => {
  const { t } = useTranslation();
  return <>{t(keyPath)}</>;
};

export default App;
