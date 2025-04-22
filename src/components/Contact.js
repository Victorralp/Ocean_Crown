import React, { useState } from "react";
import styled from "styled-components";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaCheck } from "react-icons/fa";
import { useTranslation } from "../App";

const ContactSection = styled.section`
  padding: 60px 5%;
  background-color: #f1f5f9;
`;

const ContactContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
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
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
    
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
    
    // Reset success message after 5 seconds
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
    <ContactSection id="contact">
      <ContactContainer>
        <SectionTitle>{t("contact.title")}</SectionTitle>
        
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
      </ContactContainer>
    </ContactSection>
  );
};

export default Contact; 