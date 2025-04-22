import styled from 'styled-components';

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 60px;
  font-size: 42px;
  color: #0c2340;
  position: relative;
  font-weight: 700;
  width: 100%;
  display: block;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 4px;
    background: #05a0e8;
    border-radius: 2px;
    transform-origin: center;
    animation: ${props => props.isHome ? 'expandWidth 1.5s ease-out forwards' : 'none'};
    box-shadow: 0 2px 10px rgba(5, 160, 232, 0.3);
    opacity: ${props => props.isHome ? 1 : 0};
  }

  @keyframes expandWidth {
    0% {
      width: 0;
      opacity: 0;
    }
    100% {
      width: 60%;
      opacity: 1;
    }
  }
`;

export default SectionTitle; 