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
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, #F6AD55, #ed8936);
    border-radius: 2px;
    opacity: 1;
  }
`;

export default SectionTitle; 