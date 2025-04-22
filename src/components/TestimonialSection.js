import React, { useState } from "react";
import styled from "styled-components";
import { FaQuoteLeft, FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import { useTranslation } from "../App";

const TestimonialsSection = styled.section`
  padding: 30px 5%;
  background-color: #f8fafc;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  text-align: center;
  margin-bottom: 20px;
  color: #0f172a;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background-color: #05a0e8;
  }
`;

const TestimonialCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  margin: 0 5px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
  }
`;

const QuoteIcon = styled.div`
  color: #0284c7;
  font-size: 18px;
  margin-bottom: 10px;
`;

const TestimonialText = styled.p`
  font-size: 0.75rem;
  color: #475569;
  line-height: 1.6;
  margin-bottom: 15px;
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
`;

const AuthorImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.h4`
  font-size: 0.8rem;
  color: #0f172a;
  margin-bottom: 2px;
`;

const AuthorRole = styled.p`
  font-size: 0.65rem;
  color: #64748b;
`;

const RatingStars = styled.div`
  display: flex;
  margin-bottom: 10px;
  color: #facc15;
  font-size: 0.8rem;
`;

const TestimonialSlider = styled.div`
  position: relative;
  margin: 0 -5px;
`;

const TestimonialContainer = styled.div`
  display: flex;
  overflow-x: hidden;
`;

const SliderControls = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`;

const SliderButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #0284c7;
  
  &:hover {
    background-color: #0284c7;
    color: white;
    border-color: #0284c7;
  }
  
  &:disabled {
    background-color: #f5f5f5;
    color: #d1d5db;
    cursor: not-allowed;
    border-color: #e0e0e0;
  }
`;

const TestimonialSection = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      text: "testimonials.client1.text",
      author: "testimonials.client1.name",
      role: "testimonials.client1.role",
      avatar: "/images/client-1.jpg",
      rating: 5
    },
    {
      id: 2,
      text: "testimonials.client2.text",
      author: "testimonials.client2.name",
      role: "testimonials.client2.role",
      avatar: "/images/client-2.jpg",
      rating: 5
    },
    {
      id: 3,
      text: "testimonials.client3.text",
      author: "testimonials.client3.name",
      role: "testimonials.client3.role",
      avatar: "/images/client-3.jpg",
      rating: 4
    }
  ];
  
  const slidesToShow = window.innerWidth < 768 ? 1 : 3;
  const maxIndex = Math.max(0, testimonials.length - slidesToShow);
  
  const handlePrev = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1));
  };
  
  return (
    <TestimonialsSection id="testimonials">
      <Container>
        <SectionTitle>{t("testimonials.title")}</SectionTitle>
        
        <TestimonialSlider>
          <TestimonialContainer
            style={{
              transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
              display: "grid",
              gridTemplateColumns: `repeat(${testimonials.length}, ${100 / slidesToShow}%)`,
              transition: "transform 0.3s ease"
            }}
          >
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id}>
                <QuoteIcon>
                  <FaQuoteLeft />
                </QuoteIcon>
                <RatingStars>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} color={i < testimonial.rating ? "#facc15" : "#e2e8f0"} />
                  ))}
                </RatingStars>
                <TestimonialText>{t(testimonial.text)}</TestimonialText>
                <TestimonialAuthor>
                  <AuthorAvatar>
                    <AuthorImage src={testimonial.avatar} alt={t(testimonial.author)} />
                  </AuthorAvatar>
                  <AuthorInfo>
                    <AuthorName>{t(testimonial.author)}</AuthorName>
                    <AuthorRole>{t(testimonial.role)}</AuthorRole>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialContainer>
          
          <SliderControls>
            <SliderButton onClick={handlePrev} disabled={currentIndex === 0}>
              <FaArrowLeft />
            </SliderButton>
            <SliderButton onClick={handleNext} disabled={currentIndex === maxIndex}>
              <FaArrowRight />
            </SliderButton>
          </SliderControls>
        </TestimonialSlider>
      </Container>
    </TestimonialsSection>
  );
};

export default TestimonialSection;