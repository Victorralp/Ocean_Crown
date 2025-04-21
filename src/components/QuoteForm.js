import React, { useState } from 'react';
import styled from 'styled-components';
import { FaShip, FaTruck, FaPlane, FaWarehouse, FaPaperPlane } from 'react-icons/fa';

const QuoteSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
              url('/images/MSC Michelle Cappellini in sunset view.jpg') center/cover no-repeat fixed;
  color: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  h2 {
    font-size: 42px;
    font-weight: 600;
    margin-bottom: 16px;
  }
  
  p {
    font-size: 18px;
    max-width: 700px;
    margin: 0 auto;
    opacity: 0.9;
    line-height: 1.6;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 60px;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const LeftContent = styled.div`
  flex: 1;
`;

const RightContent = styled.div`
  flex: 1;
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 40px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const FormGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 15px;
  opacity: 0.9;
`;

const Input = styled.input`
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: white;
  font-size: 15px;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: #F6AD55;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Select = styled.select`
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: white;
  font-size: 15px;
  transition: all 0.3s ease;
  appearance: none;
  
  &:focus {
    outline: none;
    border-color: #F6AD55;
    background: rgba(255, 255, 255, 0.15);
  }
  
  option {
    background: #333;
    color: white;
  }
`;

const Textarea = styled.textarea`
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: white;
  font-size: 15px;
  transition: all 0.3s ease;
  min-height: 120px;
  resize: vertical;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: #F6AD55;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const SubmitButton = styled.button`
  padding: 16px;
  background: #F6AD55;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
  
  &:hover {
    background: #ED8936;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #A0AEC0;
    cursor: not-allowed;
    transform: none;
  }
`;

const ServiceCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const ServiceCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 25px;
  transition: all 0.3s ease;
  display: flex;
  gap: 20px;
  align-items: center;
  border-left: 3px solid ${props => props.active ? '#F6AD55' : 'transparent'};
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(5px);
  }
`;

const ServiceIcon = styled.div`
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${props => props.active ? '#F6AD55' : 'white'};
  transition: all 0.3s ease;
  
  ${ServiceCard}:hover & {
    color: #F6AD55;
  }
`;

const ServiceContent = styled.div`
  flex: 1;
`;

const ServiceTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const ServiceDescription = styled.p`
  font-size: 14px;
  opacity: 0.8;
  line-height: 1.5;
`;

const services = [
  {
    id: 'ocean',
    title: 'Ocean Freight',
    description: 'Global container shipping with reliable schedules and competitive rates',
    icon: <FaShip />
  },
  {
    id: 'road',
    title: 'Road Transport',
    description: 'Efficient road transportation services with extensive coverage',
    icon: <FaTruck />
  },
  {
    id: 'air',
    title: 'Air Freight',
    description: 'Fast and reliable air freight solutions for time-sensitive shipments',
    icon: <FaPlane />
  },
  {
    id: 'warehouse',
    title: 'Warehousing',
    description: 'Strategic warehousing and distribution center solutions',
    icon: <FaWarehouse />
  },
];

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'ocean',
    origin: '',
    destination: '',
    message: ''
  });
  
  const [activeService, setActiveService] = useState('ocean');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const selectService = (serviceId) => {
    setActiveService(serviceId);
    setFormData(prev => ({ ...prev, service: serviceId }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      console.log('Form submitted:', formData);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: activeService,
          origin: '',
          destination: '',
          message: ''
        });
      }, 3000);
    }, 1500);
  };
  
  return (
    <QuoteSection id="get-quote">
      <Container>
        <SectionTitle>
          <h2>Request a Quote</h2>
          <p>Get a personalized shipping quote for your logistics needs. Our team will provide a detailed solution tailored to your requirements.</p>
        </SectionTitle>
        
        <ContentWrapper>
          <LeftContent>
            <FormContainer>
              <Form onSubmit={handleSubmit}>
                <FormRow>
                  <FormGroup>
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      placeholder="Your full name" 
                      required 
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      placeholder="Your email address" 
                      required 
                    />
                  </FormGroup>
                </FormRow>
                
                <FormRow>
                  <FormGroup>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      placeholder="Your phone number" 
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="company">Company</Label>
                    <Input 
                      type="text" 
                      id="company" 
                      name="company" 
                      value={formData.company} 
                      onChange={handleChange} 
                      placeholder="Your company name" 
                    />
                  </FormGroup>
                </FormRow>
                
                <FormGroup>
                  <Label htmlFor="service">Service Type</Label>
                  <Select 
                    id="service" 
                    name="service" 
                    value={formData.service} 
                    onChange={handleChange}
                  >
                    <option value="ocean">Ocean Freight</option>
                    <option value="road">Road Transport</option>
                    <option value="air">Air Freight</option>
                    <option value="warehouse">Warehousing</option>
                  </Select>
                </FormGroup>
                
                <FormRow>
                  <FormGroup>
                    <Label htmlFor="origin">Origin</Label>
                    <Input 
                      type="text" 
                      id="origin" 
                      name="origin" 
                      value={formData.origin} 
                      onChange={handleChange} 
                      placeholder="Origin city or port" 
                      required 
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="destination">Destination</Label>
                    <Input 
                      type="text" 
                      id="destination" 
                      name="destination" 
                      value={formData.destination} 
                      onChange={handleChange} 
                      placeholder="Destination city or port" 
                      required 
                    />
                  </FormGroup>
                </FormRow>
                
                <FormGroup>
                  <Label htmlFor="message">Additional Information</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Please provide any additional details about your shipment" 
                  />
                </FormGroup>
                
                <SubmitButton type="submit" disabled={submitting || submitted}>
                  {submitting ? 'Submitting...' : submitted ? 'Quote Requested!' : (
                    <>
                      <FaPaperPlane /> Request Quote
                    </>
                  )}
                </SubmitButton>
              </Form>
            </FormContainer>
          </LeftContent>
          
          <RightContent>
            <ServiceCards>
              {services.map(service => (
                <ServiceCard 
                  key={service.id} 
                  active={activeService === service.id}
                  onClick={() => selectService(service.id)}
                >
                  <ServiceIcon active={activeService === service.id}>
                    {service.icon}
                  </ServiceIcon>
                  <ServiceContent>
                    <ServiceTitle>{service.title}</ServiceTitle>
                    <ServiceDescription>{service.description}</ServiceDescription>
                  </ServiceContent>
                </ServiceCard>
              ))}
            </ServiceCards>
          </RightContent>
        </ContentWrapper>
      </Container>
    </QuoteSection>
  );
};

export default QuoteForm; 