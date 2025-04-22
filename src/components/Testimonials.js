import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useTranslation } from "../App";

const TestimonialsSection = styled.section`
  padding: 60px 5%;
  background-color: #f8fafc;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 40px;
  color: #0f172a;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: #05a0e8;
  }
`;

const TestimonialsContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
`;

const TestimonialSlider = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const Testimonial = styled.div`
  min-width: 100%;
  padding: 30px;
  background-color: white;
  transform: translateX(${props => props.offset}%);
  transition: transform 0.5s ease;
`;

const TestimonialContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const QuoteIcon = styled(FaQuoteLeft)`
  font-size: 1.5rem;
  color: #05a0e8;
  margin-bottom: 15px;
`;

const TestimonialText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #334155;
  margin-bottom: 20px;
`;

const CustomerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomerName = styled.h4`
  font-size: 1rem;
  color: #0f172a;
  margin-bottom: 5px;
`;

const CustomerRole = styled.p`
  font-size: 0.8rem;
  color: #64748b;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: #334155;
  z-index: 2;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #05a0e8;
    color: white;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  ${props => props.direction === 'prev' ? `
    left: -18px;
  ` : `
    right: -18px;
  `}
  
  @media (max-width: 768px) {
    ${props => props.direction === 'prev' ? `
      left: -10px;
    ` : `
      right: -10px;
    `}
  }
`;

const IndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 8px;
`;

const Indicator = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#05a0e8' : '#cbd5e1'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  
  &:hover {
    background-color: ${props => props.active ? '#05a0e8' : '#94a3b8'};
  }
`;

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();
  
  const testimonials = [
    {
      id: 1,
      text: "testimonials.1.text",
      name: "testimonials.1.name",
      role: "testimonials.1.role"
    },
    {
      id: 2,
      text: "testimonials.2.text",
      name: "testimonials.2.name",
      role: "testimonials.2.role"
    },
    {
      id: 3,
      text: "testimonials.3.text",
      name: "testimonials.3.name",
      role: "testimonials.3.role"
    }
  ];
  
  const handlePrev = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const handleNext = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);
  
  return (
    <TestimonialsSection id="testimonials">
      <SectionTitle>{t("testimonials.title")}</SectionTitle>
      
      <TestimonialsContainer>
        <NavButton 
          direction="prev" 
          onClick={handlePrev}
        >
          <FaChevronLeft />
        </NavButton>
        
        <TestimonialSlider>
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={testimonial.id}
              offset={-100 * currentIndex}
            >
              <TestimonialContent>
                <QuoteIcon />
                <TestimonialText>
                  {t(testimonial.text)}
                </TestimonialText>
                <CustomerInfo>
                  <CustomerName>{t(testimonial.name)}</CustomerName>
                  <CustomerRole>{t(testimonial.role)}</CustomerRole>
                </CustomerInfo>
              </TestimonialContent>
            </Testimonial>
          ))}
        </TestimonialSlider>
        
        <NavButton 
          direction="next" 
          onClick={handleNext}
        >
          <FaChevronRight />
        </NavButton>
        
        <IndicatorContainer>
          {testimonials.map((_, index) => (
            <Indicator 
              key={index}
              active={currentIndex === index}
              onClick={() => goToSlide(index)}
            />
          ))}
        </IndicatorContainer>
      </TestimonialsContainer>
    </TestimonialsSection>
  );
};

export default Testimonials; 