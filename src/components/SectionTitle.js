import React from 'react';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  text-align: center;
  margin-bottom: ${props => props.noMargin ? '0' : '40px'};
`;

const Title = styled.h2`
  font-size: 36px;
  color: #0c2340;
  margin-bottom: ${props => props.subtitle ? '15px' : '0'};
  position: relative;
  display: inline-block;
  
  ${props => props.withLine && `
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
  `}
  
  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: ${props => props.subtitle ? '10px' : '0'};
  }
`;

const SubtitleText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const SectionTitle = ({ title, subtitle, noMargin, withLine = true }) => {
  return (
    <TitleWrapper noMargin={noMargin}>
      <Title subtitle={subtitle} withLine={withLine && !subtitle}>
        {title}
      </Title>
      {subtitle && <SubtitleText>{subtitle}</SubtitleText>}
    </TitleWrapper>
  );
};

export default SectionTitle; 