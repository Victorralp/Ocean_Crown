import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRocket, 
  FaClock, 
  FaBell, 
  FaEnvelope,
  FaArrowRight,
  FaGlobe, 
  FaShieldAlt
} from 'react-icons/fa';

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 0.5; }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const gradientBg = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const ComingSoonSection = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-45deg, #0c2340, #05a0e8, #F6AD55, #ed8936);
  background-size: 400% 400%;
  animation: ${gradientBg} 15s ease infinite;
  position: relative;
  overflow: hidden;
`;

const GlowingOrb = styled.div`
  position: absolute;
  width: ${props => props.size || '300px'};
  height: ${props => props.size || '300px'};
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
  border-radius: 50%;
  top: ${props => props.top};
  left: ${props => props.left};
  animation: ${pulse} ${props => props.duration || '3s'} ease-in-out infinite;
  z-index: 1;
`;

const ContentWrapper = styled.div`
  text-align: center;
  color: white;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  padding: 40px 20px;
`;

const RocketIcon = styled(motion.div)`
  font-size: 80px;
  margin-bottom: 30px;
  color: #F6AD55;
  display: inline-block;
  animation: ${float} 6s ease-in-out infinite;
  filter: drop-shadow(0 0 20px rgba(246, 173, 85, 0.5));
`;

const Title = styled(motion.h1)`
  font-size: 5rem;
  font-weight: 800;
  margin-bottom: 20px;
  background: linear-gradient(to right, #ffffff, #F6AD55);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  line-height: 1.6;
  margin-bottom: 60px;
  color: rgba(255, 255, 255, 0.9);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const FeatureGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin: 50px auto;
  max-width: 1200px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 40px 30px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: ${shimmer} 2s infinite;
  }

  svg {
    font-size: 50px;
    margin-bottom: 20px;
    color: #F6AD55;
    filter: drop-shadow(0 0 10px rgba(246, 173, 85, 0.3));
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 15px;
  color: white;
  }

  p {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
  }
`;

const NotifyButton = styled(motion.button)`
  background: linear-gradient(45deg, #F6AD55, #ed8936);
  border: none;
  padding: 20px 40px;
  font-size: 1.2rem;
  color: white;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: inline-flex;
  align-items: center;
  gap: 15px;
  margin-top: 40px;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover:before {
    left: 100%;
  }

  svg {
    font-size: 1.2rem;
  }
`;

const ProgressBar = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(to right, #F6AD55, #ed8936);
  width: ${props => props.progress}%;
`;

const EBusiness = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 150);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <FaGlobe />,
      title: "Digital Solutions",
      description: "Transforming logistics with cutting-edge digital innovations and smart technology integration"
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Platform",
      description: "Enterprise-grade security ensuring your data and operations are protected 24/7"
    },
    {
      icon: <FaBell />,
      title: "Smart Notifications",
      description: "Stay informed with real-time alerts and intelligent updates about your shipments"
    }
  ];

  const orbs = [
    { size: '400px', top: '-10%', left: '-10%', duration: '4s' },
    { size: '300px', top: '60%', left: '80%', duration: '5s' },
    { size: '200px', top: '40%', left: '-5%', duration: '6s' },
  ];

  return (
    <ComingSoonSection>
      {orbs.map((orb, index) => (
        <GlowingOrb key={index} {...orb} />
      ))}
      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <RocketIcon
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FaRocket />
          </RocketIcon>
          
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            eBusiness Solutions
          </Title>
          
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            We're crafting something extraordinary. Our digital platform is being engineered to revolutionize your logistics experience with cutting-edge technology and seamless integration.
          </Subtitle>

          <FeatureGrid
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {feature.icon}
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </FeatureCard>
            ))}
          </FeatureGrid>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <NotifyButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope />
              Get Early Access
              <FaArrowRight />
              <ProgressBar 
                progress={progress}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </NotifyButton>
          </motion.div>
        </motion.div>
      </ContentWrapper>
    </ComingSoonSection>
  );
};

export default EBusiness; 