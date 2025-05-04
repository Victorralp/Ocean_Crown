import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaCheck, FaInfoCircle } from 'react-icons/fa';

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

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 40px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  margin: 0 auto;
`;

const ServiceSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
`;

const ServiceCard = styled.div`
  background: ${props => props.selected ? 'rgba(246, 173, 85, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${props => props.selected ? '#F6AD55' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    background: ${props => props.selected ? 'rgba(246, 173, 85, 0.2)' : 'rgba(255, 255, 255, 0.15)'};
  }
`;

const ServiceTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ServiceDescription = styled.p`
  font-size: 14px;
  opacity: 0.8;
  line-height: 1.5;
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  
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
  margin-top: 20px;
  width: 100%;
  
  &:hover {
    background: #ED8936;
    transform: translateY(-2px);
  }
`;

const SelectedServicesInfo = styled.div`
  margin-top: 15px;
  padding: 10px 15px;
  background: rgba(246, 173, 85, 0.1);
  border-radius: 6px;
  border-left: 3px solid #F6AD55;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SelectionNote = styled.p`
  margin: 5px 0 15px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const GetFreeQuote = () => {
  const services = [
    {
      id: 'ocean',
      title: 'Ocean Freight',
      description: 'Comprehensive ocean freight solutions for all your shipping needs.'
    },
    {
      id: 'air',
      title: 'Air Freight',
      description: 'Fast and reliable air freight services worldwide.'
    },
    {
      id: 'inland',
      title: 'Inland Transportation',
      description: 'Efficient inland transportation for your cargo.'
    },
    {
      id: 'warehousing',
      title: 'Warehousing & Distribution',
      description: 'Secure and efficient warehousing solutions.'
    },
    {
      id: 'import',
      title: 'Import & Export',
      description: 'Comprehensive import and export services.'
    },
    {
      id: 'customs',
      title: 'Customs Clearance',
      description: 'Expert customs clearance services.'
    }
  ];

  const [selectedServices, setSelectedServices] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const handleServiceSelect = (service) => {
    setSelectedServices(prev => {
      // Check if service is already selected
      const isSelected = prev.some(s => s.id === service.id);
      
      if (isSelected) {
        // Remove if already selected
        return prev.filter(s => s.id !== service.id);
      } else {
        // Add if not selected
        return [...prev, service];
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare email body
    const servicesText = selectedServices.length > 0 
      ? selectedServices.map(s => s.title).join(', ')
      : 'Not specified';
      
    const subject = `Quote Request: ${servicesText}`;
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company}
Services: ${servicesText}

Message:
${formData.message}
    `;
    
    // Create mailto link
    const mailtoLink = `mailto:operations@ocmultilink.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open mail client
    window.location.href = mailtoLink;
  };

  return (
    <QuoteSection id="get-quote">
      <Container>
        <SectionTitle>
          <h2>Get a Free Quote</h2>
          <p>Select services and fill out the form below to receive a personalized quote from our team.</p>
        </SectionTitle>
        
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <h3 style={{ marginBottom: '20px', fontSize: '20px' }}>Select Services</h3>
            <SelectionNote>
              <FaInfoCircle size={14} />
              Click multiple services to select more than one option
            </SelectionNote>
            <ServiceSelector>
              {services.map((service) => (
                <ServiceCard 
                  key={service.id} 
                  selected={selectedServices.some(s => s.id === service.id)}
                  onClick={() => handleServiceSelect(service)}
                >
                  <ServiceTitle>
                    {service.title}
                    {selectedServices.some(s => s.id === service.id) && <FaCheck color="#F6AD55" />}
                  </ServiceTitle>
                  <ServiceDescription>{service.description}</ServiceDescription>
                </ServiceCard>
              ))}
            </ServiceSelector>
            
            {selectedServices.length > 0 && (
              <SelectedServicesInfo>
                <FaCheck color="#F6AD55" />
                <div>
                  <strong>Selected Services:</strong> {selectedServices.map(s => s.title).join(', ')}
                </div>
              </SelectedServicesInfo>
            )}
            
            <h3 style={{ margin: '30px 0 20px', fontSize: '20px' }}>Your Information</h3>
            <FormRow>
              <FormGroup>
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleInputChange}
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
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="company">Company Name</Label>
                <Input 
                  type="text" 
                  id="company" 
                  name="company" 
                  placeholder="Your company"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </FormRow>
            
            <FormGroup>
              <Label htmlFor="message">Additional Details</Label>
              <Textarea 
                id="message" 
                name="message" 
                placeholder="Please provide any additional details about your shipping needs..."
                value={formData.message}
                onChange={handleInputChange}
              />
            </FormGroup>
            
            <SubmitButton type="submit">
              <FaEnvelope />
              Get a Free Quote
            </SubmitButton>
          </form>
        </FormContainer>
      </Container>
    </QuoteSection>
  );
};

export default GetFreeQuote; 