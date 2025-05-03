import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes, FaCalendarAlt } from 'react-icons/fa';
import { useTranslation } from '../translations/useTranslation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <NavContainer scrolled={scrolled}>
      <NavWrapper>
        <MobileControls>
          <MenuToggle onClick={() => setIsOpen(!isOpen)} scrolled={scrolled}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </MenuToggle>
        </MobileControls>

        <LogoContainer to="/" scrolled={scrolled}>
          <img 
            src="/images/ChatGPT Image Apr 20, 2025, 11_29_19 AM.png" 
            alt={t('footer.logoAlt', 'Ocean Crown Logo')} 
          />
        </LogoContainer>
        
        <NavMenu isOpen={isOpen}>
          <NavItem>
            <NavLinkStyled to="/" end scrolled={scrolled}>
              {t('navigation.home', 'Home')}
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/services" scrolled={scrolled}>
              {t('menu.services', 'Our Services')}
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/industries" scrolled={scrolled}>
              {t('menu.industries', 'Industries')}
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/about" scrolled={scrolled}>
              {t('menu.aboutUs', 'About Us')}
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/sustainability" scrolled={scrolled}>
              {t('menu.sustainability', 'Sustainability')}
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/ebusiness" scrolled={scrolled}>
              {t('menu.ebusiness', 'eBusiness')}
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/faq" scrolled={scrolled}>
              {t('menu.faq', 'FAQ')}
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/contact" scrolled={scrolled}>
              {t('menu.contact', 'Contact Us')}
            </NavLinkStyled>
          </NavItem>
        </NavMenu>
        
        <HeaderButtons>
          <ContactButton to="/contact">
            {t('header.contact', 'Contact')}
          </ContactButton>
          {isMobile ? (
            <IconQuoteButton to="/quote" title={t('header.getQuote', 'Get a Free Quote')}>
              <FaCalendarAlt />
            </IconQuoteButton>
          ) : (
            <QuoteButton to="/quote">
              {t('header.getQuote', 'Get a Free Quote')}
            </QuoteButton>
          )}
        </HeaderButtons>
      </NavWrapper>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: ${props => props.scrolled ? 'white' : '#0c2340'};
  box-shadow: ${props => props.scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
  transition: all 0.3s ease-in-out;
  padding: ${props => props.scrolled ? '5px 0' : '10px 0'};
  height: auto;
`;

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
  
  @media (max-width: 992px) {
    justify-content: space-between;
  }
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  
  img {
    height: 40px;
    transition: all 0.3s ease;
    
    @media (max-width: 992px) {
      height: 30px;
    }
  }
  
  @media (max-width: 992px) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: 992px) {
    flex-direction: column;
    position: fixed;
    top: 60px;
    left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    width: 270px;
    height: 100vh;
    background-color: #0c2340;
    padding: 20px 0;
    transition: left 0.3s ease;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    z-index: 999;
    overflow-y: auto;
  }
`;

const NavItem = styled.li`
  margin: 0 12px;
  
  @media (max-width: 992px) {
    margin: 0;
    width: 100%;
    text-align: left;
  }
`;

const NavLinkStyled = styled(NavLink)`
  color: ${props => props.scrolled ? '#333' : 'white'};
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background-color: #F6AD55;
    transition: width 0.3s ease;
  }
  
  &:hover, &.active {
    color: #F6AD55;
    
    &:after {
      width: 100%;
    }
  }
  
  @media (max-width: 992px) {
    display: block;
    color: white;
    padding: 15px 20px;
    font-size: 14px;
    
    &:hover, &.active {
      background-color: rgba(246, 173, 85, 0.1);
    }
    
    &:after {
      display: none;
    }
  }
`;

const MobileControls = styled.div`
  display: none;
  
  @media (max-width: 992px) {
    display: flex;
    align-items: center;
  }
`;

const MenuToggle = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: white;
  padding: 5px;
  transition: color 0.3s ease;
  
  @media (max-width: 992px) {
    display: block;
  }
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 10px;
  
  @media (max-width: 768px) {
    gap: 5px;
  }
`;

const ContactButton = styled(Link)`
  background: transparent;
  color: #F6AD55;
  padding: 8px 15px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 4px;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(246, 173, 85, 0.1);
  }
  
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px 10px;
  }
`;

const QuoteButton = styled(Link)`
  background: #F6AD55;
  color: #0c2340;
  padding: 8px 15px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 4px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ed8936;
  }
`;

const IconQuoteButton = styled(Link)`
  background: #F6AD55;
  color: #0c2340;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
  
  svg {
    font-size: 16px;
  }
  
  &:hover {
    background: #ed8936;
  }
`;

export default Navbar; 