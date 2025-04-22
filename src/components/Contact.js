import React, { useState } from "react";
import styled from "styled-components";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaCheck } from "react-icons/fa";
import { useTranslation } from "../App";
import { useLocation } from 'react-router-dom';
import SectionTitle from './shared/SectionTitle';

const HeroSection = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)),
              url('/images/contact-hero.jpg') no-repeat center center;
  background-size: cover;
  height: 60vh;
  margin-top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  padding-top: 80px;
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 2;
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
  background: rgba(12, 35, 64, 0.5);
  border-radius: 16px;
  padding: 40px;
  backdrop-filter: blur(10px);
`;

const PageTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  
  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 4px;
    background: #05a0e8;
    margin: 20px auto 0;
    border-radius: 2px;
  }
`;

const ContactContainer = styled.section`
  padding: 80px 0;
  background-color: #f9f9f9;
`;

const ContactContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  height: fit-content;
`;

const InfoTitle = styled.h3`
  font-size: 1.2rem;
  color: #0f172a;
  margin-bottom: 15px;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const InfoItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const IconBox = styled.div`
  width: 38px;
  height: 38px;
  background-color: #e0f2fe;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: #0284c7;
  flex-shrink: 0;
`;

const ItemContent = styled.div``;

const ItemTitle = styled.h4`
  font-size: 0.95rem;
  color: #0f172a;
  margin-bottom: 5px;
`;

const ItemText = styled.p`
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.5;
`;

const FormContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const FormTitle = styled.h3`
  font-size: 1.2rem;
  color: #0f172a;
  margin-bottom: 15px;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  grid-column: ${props => props.fullWidth ? "1 / -1" : "auto"};
`;

const FormLabel = styled.label`
  display: block;
  font-size: 0.85rem;
  margin-bottom: 5px;
  color: #0f172a;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 0.9rem;
  color: #0f172a;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #0284c7;
    box-shadow: 0 0 0 2px rgba(2, 132, 199, 0.2);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  font-size: 0.9rem;
  color: #0f172a;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  transition: all 0.2s;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #0284c7;
    box-shadow: 0 0 0 2px rgba(2, 132, 199, 0.2);
  }
`;

const SubmitButton = styled.button`
  display: inline-block;
  background-color: #0284c7;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 10px;
  
  &:hover {
    background-color: #0369a1;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.3);
  }
  
  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  background-color: #dcfce7;
  color: #166534;
  padding: 12px 15px;
  border-radius: 6px;
  margin-top: 15px;
  font-size: 0.9rem;
`;

const CheckIcon = styled(FaCheck)`
  margin-right: 10px;
`;

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();
  const isStandalonePage = location.pathname === '/contact';
  const isHome = location.pathname === '/';
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
    
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };
  
  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: "contact.info.address.title",
      text: "contact.info.address.text"
    },
    {
      icon: <FaPhone />,
      title: "contact.info.phone.title",
      text: "contact.info.phone.text"
    },
    {
      icon: <FaEnvelope />,
      title: "contact.info.email.title",
      text: "contact.info.email.text"
    }
  ];

  return (
    <>
      {isStandalonePage && (
        <HeroSection>
          <HeroContent>
            <PageTitle>Contact Us</PageTitle>
            <Subtitle>
              Get in touch with our team of logistics experts. We're here to help you with all your shipping and transportation needs.
            </Subtitle>
          </HeroContent>
        </HeroSection>
      )}
      
      <ContactContainer>
        <ContactContent>
          <SectionTitle isHome={isHome}>{t("contact.title")}</SectionTitle>
          
          <ContactGrid>
            <ContactInfo>
              <InfoTitle>{t("contact.info.title")}</InfoTitle>
              <InfoList>
                {contactInfo.map((item, index) => (
                  <InfoItem key={index}>
                    <IconBox>{item.icon}</IconBox>
                    <ItemContent>
                      <ItemTitle>{t(item.title)}</ItemTitle>
                      <ItemText>{t(item.text)}</ItemText>
                    </ItemContent>
                  </InfoItem>
                ))}
              </InfoList>
            </ContactInfo>
            
            <FormContainer>
              <FormTitle>{t("contact.form.title")}</FormTitle>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <FormLabel>{t("contact.form.name")}</FormLabel>
                  <FormInput
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>{t("contact.form.email")}</FormLabel>
                  <FormInput
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>{t("contact.form.phone")}</FormLabel>
                  <FormInput
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>{t("contact.form.subject")}</FormLabel>
                  <FormInput
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup fullWidth>
                  <FormLabel>{t("contact.form.message")}</FormLabel>
                  <FormTextarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <SubmitButton type="submit">
                    {t("contact.form.submit")}
                  </SubmitButton>
                </FormGroup>
              </Form>
              
              {submitted && (
                <SuccessMessage>
                  <CheckIcon />
                  {t("contact.form.success")}
                </SuccessMessage>
              )}
            </FormContainer>
          </ContactGrid>
        </ContactContent>
      </ContactContainer>
    </>
  );
};

export default Contact; 