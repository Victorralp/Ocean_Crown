import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaLock, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Styled components
const LoginSection = styled.section`
  padding: 120px 20px 80px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 40px;
  color: #2d3748;
`;

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const InfoPanel = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #3182ce, #2c5282);
  color: white;
  padding: 60px 40px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/images/MSC Michelle Cappellini in sunset view.jpg') center/cover;
    opacity: 0.2;
    z-index: 0;
  }
`;

const InfoContent = styled.div`
  position: relative;
  z-index: 1;
`;

const InfoTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
  line-height: 1.3;
`;

const InfoText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 30px;
  opacity: 0.9;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 40px 0;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 16px;
  
  &::before {
    content: '✓';
    display: inline-block;
    margin-right: 10px;
    font-size: 18px;
    color: #F6AD55;
  }
`;

const RegisterLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: white;
  font-weight: 600;
  text-decoration: none;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  transition: all 0.3s ease;
  
  svg {
    margin-left: 8px;
    transition: transform 0.2s ease;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    
    svg {
      transform: translateX(4px);
    }
  }
`;

const FormPanel = styled.div`
  flex: 1;
  padding: 60px 40px;
`;

const FormTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
  color: #2d3748;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 15px 15px 45px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #F6AD55;
    box-shadow: 0 0 0 3px rgba(246, 173, 85, 0.2);
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
  font-size: 16px;
`;

const RememberRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
  input {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
  
  label {
    font-size: 14px;
    color: #4a5568;
    cursor: pointer;
  }
`;

const ForgotPassword = styled(Link)`
  font-size: 14px;
  color: #3182ce;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LoginButton = styled.button`
  padding: 15px;
  background: #F6AD55;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  
  &:hover {
    background: #ED8936;
  }
`;

const AlternateLogin = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const AlternateText = styled.p`
  font-size: 14px;
  color: #718096;
  position: relative;
  margin-bottom: 20px;
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 30%;
    height: 1px;
    background: #e2e8f0;
  }
  
  &::before {
    left: 0;
  }
  
  &::after {
    right: 0;
  }
`;

const SSOButton = styled.button`
  padding: 12px 20px;
  background: #edf2f7;
  color: #4a5568;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    background: #e2e8f0;
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password, rememberMe });
    // Authentication logic would go here
  };

  return (
    <LoginSection>
      <Container>
        <div>
          <PageTitle>myOcean Crown Portal</PageTitle>
          
          <CardContainer>
            <InfoPanel>
              <InfoContent>
                <InfoTitle>Your digital shipping platform</InfoTitle>
                <InfoText>
                  Gain instant access to all our shipping services in one place. Manage your shipments, bookings, and documentation with ease.
                </InfoText>
                
                <BenefitsList>
                  <BenefitItem>Real-time tracking and notifications</BenefitItem>
                  <BenefitItem>Online booking and quotation</BenefitItem>
                  <BenefitItem>Electronic Bill of Lading</BenefitItem>
                  <BenefitItem>Personalized dashboards</BenefitItem>
                  <BenefitItem>Historical shipment data</BenefitItem>
                </BenefitsList>
                
                <RegisterLink to="/register">
                  Create an account <FaArrowRight />
                </RegisterLink>
              </InfoContent>
            </InfoPanel>
            
            <FormPanel>
              <FormTitle>Log in to your account</FormTitle>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <InputIcon>
                    <FaEnvelope />
                  </InputIcon>
                  <Input 
                    type="email" 
                    placeholder="Email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <InputIcon>
                    <FaLock />
                  </InputIcon>
                  <Input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </FormGroup>
                
                <RememberRow>
                  <Checkbox>
                    <input 
                      type="checkbox" 
                      id="remember" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="remember">Remember me</label>
                  </Checkbox>
                  
                  <ForgotPassword to="/forgot-password">
                    Forgot password?
                  </ForgotPassword>
                </RememberRow>
                
                <LoginButton type="submit">Log In</LoginButton>
              </Form>
              
              <AlternateLogin>
                <AlternateText>Or continue with</AlternateText>
                <SSOButton>
                  Single Sign-On (SSO)
                </SSOButton>
              </AlternateLogin>
            </FormPanel>
          </CardContainer>
        </div>
      </Container>
    </LoginSection>
  );
};

export default LoginPage; 