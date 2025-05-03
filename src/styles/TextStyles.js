import styled from 'styled-components';

// Headings
export const PageTitle = styled.h1`
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 20px;
  color: ${props => props.color || '#0c2340'};
  
  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 15px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 32px;
  color: #0c2340;
  margin-bottom: 45px;
  text-align: ${props => props.align || 'center'};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: ${props => props.align === 'left' ? '0' : '50%'};
    transform: ${props => props.align === 'left' ? 'none' : 'translateX(-50%)'};
    width: 70px;
    height: 3px;
    background: #05a0e8;
  }
  
  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 35px;
  }
`;

export const SubSectionTitle = styled.h3`
  font-size: 20px;
  color: #0c2340;
  margin-bottom: 15px;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

export const ItemTitle = styled.h4`
  font-size: 18px;
  color: #0c2340;
  margin-bottom: 10px;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 8px;
  }
`;

// Paragraphs
export const HeroSubtitle = styled.p`
  font-size: 18px;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  opacity: 0.9;
  color: ${props => props.color || 'inherit'};
  
  @media (max-width: 768px) {
    font-size: 13px;
    line-height: 1.5;
  }
`;

export const Paragraph = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: ${props => props.color || '#333'};
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    line-height: 1.5;
    margin-bottom: 1.2rem;
  }
`;

export const SmallText = styled.p`
  font-size: 13px;
  line-height: 1.6;
  color: ${props => props.color || '#666'};
  
  @media (max-width: 768px) {
    font-size: 11px;
    line-height: 1.4;
  }
`;

// Button Text
export const ButtonText = styled.span`
  font-size: 14px;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export default {
  PageTitle,
  SectionTitle,
  SubSectionTitle,
  ItemTitle,
  HeroSubtitle,
  Paragraph,
  SmallText,
  ButtonText
}; 