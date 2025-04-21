import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useTranslation } from '../App';
import LanguageDropdown from './LanguageDropdown';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    setIsOpen(false);
  }, [location]);

  return (
    <NavContainer scrolled={scrolled}>
      <NavWrapper>
        <LogoContainer to="/">
          <img 
            src="/images/ChatGPT Image Apr 20, 2025, 11_29_19 AM.png" 
            alt="Ocean Crown Logo" 
          />
        </LogoContainer>
        
        <NavMenu isOpen={isOpen}>
          <NavItem>
            <NavLinkStyled to="/" end>
              {t('home')}
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/services">
              {t('services')}
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/industries">
              {t('industries')}
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/about">
              {t('about')}
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/sustainability">
              {t('sustainability')}
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/ebusiness">
              {t('ebusiness')}
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/faq">
              FAQ
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/contact">
              {t('contact')}
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <LanguageDropdown />
          </NavItem>
        </NavMenu>
        
        <MobileControls>
          <LanguageDropdown mobile />
          <MenuToggle onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </MenuToggle>
        </MobileControls>
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
  background-color: ${props => props.scrolled ? 'white' : 'transparent'};
  box-shadow: ${props => props.scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
  transition: all 0.3s ease-in-out;
  padding: ${props => props.scrolled ? '10px 0' : '20px 0'};
`;

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  
  img {
    height: 40px;
    filter: ${props => props.scrolled ? 'none' : 'brightness(0) invert(1)'};
    transition: filter 0.3s ease;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  
  @media (max-width: 992px) {
    flex-direction: column;
    position: fixed;
    top: 70px;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    width: 280px;
    height: calc(100vh - 70px);
    background-color: white;
    padding: 20px 0;
    transition: right 0.3s ease;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    z-index: 999;
    overflow-y: auto;
  }
`;

const NavItem = styled.li`
  margin: 0 12px;
  
  @media (max-width: 992px) {
    margin: 5px 0;
    width: 100%;
    text-align: center;
  }
`;

const NavLinkStyled = styled(NavLink)`
  color: ${props => props.scrolled ? '#333' : 'white'};
  text-decoration: none;
  font-weight: 500;
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
    color: #333;
    padding: 12px 20px;
    
    &:hover, &.active {
      background-color: rgba(246, 173, 85, 0.1);
    }
  }
`;

const MobileControls = styled.div`
  display: none;
  align-items: center;
  
  @media (max-width: 992px) {
    display: flex;
  }
`;

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  padding: 5px;
  margin-left: 15px;
  
  @media (max-width: 992px) {
    display: block;
  }
`;

export default Navbar; 