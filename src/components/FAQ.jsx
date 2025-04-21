import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaSearch, FaSync, FaPlus, FaMinus, FaExternalLinkAlt, FaAnchor, FaShip, FaCompass, FaWater, FaGlobeAmericas, FaClock, FaSun, FaMoon } from 'react-icons/fa';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';

// FAQ Data with categories
const faqCategories = [
  {
    id: 'shipping',
    name: 'Shipping Services',
    icon: <FaShip />,
    description: 'Learn about our comprehensive shipping services and global coverage',
    color: '#1E88E5'
  },
  {
    id: 'documentation',
    name: 'Documentation & Customs',
    icon: <FaCompass />,
    description: 'Information about required paperwork and customs procedures',
    color: '#43A047'
  },
  {
    id: 'tracking',
    name: 'Tracking & Delivery',
    icon: <FaAnchor />,
    description: 'How to track your shipments and delivery options',
    color: '#E53935'
  },
  {
    id: 'special',
    name: 'Special Cargo',
    icon: <FaWater />,
    description: 'Details on how we handle specialized shipping requirements',
    color: '#8E24AA'
  }
];

const faqData = [
  {
    id: 1,
    category: 'shipping',
    question: "What shipping services does Ocean Crown offer?",
    answer: "Ocean Crown provides a comprehensive range of shipping services including ocean freight, air freight, land transportation, and project cargo. We specialize in container shipping, bulk cargo, breakbulk, and specialized shipments for various industries. Our services include:<ul class='list-disc pl-5 mt-2'><li>FCL (Full Container Load) shipping</li><li>LCL (Less than Container Load) shipping</li><li>Bulk cargo transportation</li><li>Roll-on/Roll-off services</li><li>Project cargo and heavy lift solutions</li></ul>"
  },
  {
    id: 2,
    category: 'tracking',
    question: "How can I track my shipment?",
    answer: "You can track your shipment through our <a href='#' class='text-ocean-blue hover:underline'>online tracking portal</a> using your shipment reference number or container number. Alternatively, you can contact our customer service team who will be happy to provide you with real-time updates on your cargo location. We offer multiple tracking options:<ul class='list-disc pl-5 mt-2'><li>Web-based tracking system</li><li>Mobile app tracking (iOS and Android)</li><li>Email notifications and alerts</li><li>SMS updates for key milestones</li></ul>"
  },
  {
    id: 3,
    category: 'shipping',
    question: "What destinations do you serve?",
    answer: "Ocean Crown has a global network covering major ports and logistics hubs across six continents. Our extensive network allows us to deliver seamless shipping solutions worldwide, with particular strength in routes connecting Africa, Europe, Asia, and the Americas. We serve over 300 ports in 150 countries, with specialized expertise in emerging markets."
  },
  {
    id: 4,
    category: 'documentation',
    question: "What documentation is required for international shipping?",
    answer: "Required documentation typically includes: commercial invoice, packing list, bill of lading, certificate of origin, and customs declaration forms. Specific requirements may vary depending on the destination country, type of goods, and shipping method. Our documentation team can provide detailed guidance for your specific shipment.<br/><br/><strong>Common Required Documents:</strong><div class='grid grid-cols-2 gap-2 mt-2'><div class='bg-gray-100 p-2 rounded'>• Commercial Invoice</div><div class='bg-gray-100 p-2 rounded'>• Packing List</div><div class='bg-gray-100 p-2 rounded'>• Bill of Lading</div><div class='bg-gray-100 p-2 rounded'>• Certificate of Origin</div></div>"
  },
  {
    id: 5,
    category: 'documentation',
    question: "How do you handle customs clearance?",
    answer: "Our dedicated customs clearance experts handle all aspects of the import/export process, ensuring your cargo complies with both origin and destination regulatory requirements. We manage documentation, duty payments, inspections, and address any customs challenges to ensure smooth clearance and delivery. Our customs services include:<ul class='list-disc pl-5 mt-2'><li>Pre-arrival customs clearance</li><li>Duty and tax calculation</li><li>Classification of goods</li><li>Customs bond services</li><li>Expert advice on trade regulations</li></ul>"
  },
  {
    id: 6,
    category: 'shipping',
    question: "What measures do you take for sustainable shipping?",
    answer: "Ocean Crown is committed to environmental sustainability. We implement fuel-efficient routing, use modern vessels with reduced emissions, offer carbon-offset programs, and continuously seek innovative solutions to minimize our environmental footprint while maintaining service quality. Our sustainability initiatives include:<div class='mt-4 p-4 bg-green-50 rounded-lg border border-green-200'><p class='font-semibold text-green-800'>2023-2025 Green Shipping Goals:</p><ul class='list-disc pl-5 mt-2 text-green-700'><li>25% reduction in carbon emissions per shipment</li><li>Implementation of alternative fuels in 30% of fleet</li><li>Zero waste operations at major logistics hubs</li></ul></div>"
  },
  {
    id: 7,
    category: 'documentation',
    question: "Do you offer insurance for shipments?",
    answer: "Yes, we offer comprehensive cargo insurance options to protect your goods against loss, damage, and delay during transit. Our insurance solutions can be tailored to your specific cargo type, value, and risk factors to ensure appropriate coverage. Coverage options range from basic protection to all-risk policies that safeguard against virtually any contingency."
  },
  {
    id: 8,
    category: 'special',
    question: "How do you handle special cargo requirements?",
    answer: "We specialize in handling special cargo including temperature-sensitive goods, hazardous materials, oversized equipment, and high-value items. Our team develops customized shipping solutions incorporating specialized containers, monitoring systems, and handling protocols based on your specific cargo requirements.<br/><br/><strong>Special Cargo Types We Handle:</strong><div class='grid grid-cols-1 md:grid-cols-3 gap-3 mt-3'><div class='border p-3 rounded shadow-sm'><span class='text-red-500 font-bold'>⚠️ Hazardous Materials</span><p class='text-xs mt-1'>IMO certified handling of all dangerous goods classes</p></div><div class='border p-3 rounded shadow-sm'><span class='text-blue-500 font-bold'>❄️ Temperature-Controlled</span><p class='text-xs mt-1'>Precision climate control for sensitive goods</p></div><div class='border p-3 rounded shadow-sm'><span class='text-amber-500 font-bold'>🏗️ Oversized Cargo</span><p class='text-xs mt-1'>Heavy lift and project cargo expertise</p></div></div>"
  },
  {
    id: 9,
    category: 'tracking',
    question: "What is your estimated delivery timeframe?",
    answer: "Delivery timeframes vary based on origin, destination, service type, and current maritime conditions. Typically, our ocean freight services range from 7-45 days depending on the route. For major trade lanes, approximate transit times are:<table class='min-w-full bg-white border mt-3'><thead><tr><th class='border p-2 bg-gray-100'>Route</th><th class='border p-2 bg-gray-100'>Transit Time</th></tr></thead><tbody><tr><td class='border p-2'>Asia to North America</td><td class='border p-2'>14-30 days</td></tr><tr><td class='border p-2'>Europe to North America</td><td class='border p-2'>7-15 days</td></tr><tr><td class='border p-2'>Asia to Europe</td><td class='border p-2'>20-35 days</td></tr><tr><td class='border p-2'>Africa to Europe</td><td class='border p-2'>12-25 days</td></tr></tbody></table>"
  },
  {
    id: 10,
    category: 'tracking',
    question: "Do you offer expedited shipping options?",
    answer: "Yes, we offer expedited shipping solutions for time-sensitive cargo. Options include premium ocean services with priority loading/unloading, combined air-sea solutions, and dedicated express services. Our expedited shipping team works to secure the fastest possible routing while maintaining cost-effectiveness."
  },
  {
    id: 11,
    category: 'special',
    question: "Can you handle refrigerated cargo?",
    answer: "Yes, we have extensive experience with refrigerated (reefer) cargo transportation. Our reefer container services maintain precise temperature, humidity and atmosphere control throughout the entire journey. We offer real-time monitoring systems that track environmental conditions and proactively alert our technical teams to any deviations, ensuring your temperature-sensitive goods arrive in perfect condition."
  },
  {
    id: 12,
    category: 'special',
    question: "How do you manage project cargo logistics?",
    answer: "Our project cargo team specializes in the transportation of oversized, heavy and high-value equipment. We provide end-to-end project management including:<ul class='list-disc pl-5 mt-2'><li>Detailed feasibility studies and route surveys</li><li>Engineering analyses for lifting and securing cargo</li><li>Custom loading/unloading solutions</li><li>Specialized vessel chartering</li><li>Multi-modal transportation coordination</li><li>Permits and escorts for oversize movements</li></ul>Each project is assigned a dedicated project manager who coordinates all aspects of the shipment."
  }
];

// Premium styled components with advanced visual elements
const StyledFAQSection = styled.section`
  padding: 0;
  background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 500px;
    background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%);
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 300px;
    background: url('/images/wave-pattern.svg') repeat-x bottom;
    background-size: contain;
    opacity: 0.05;
    z-index: 0;
  }
`;

const ParallaxHero = styled.div`
  position: relative;
  height: 80vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 1;
`;

const ParallaxLayer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  z-index: ${props => props.zIndex || 0};
  opacity: ${props => props.opacity || 1};
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(11, 34, 57, 0.5) 0%, rgba(11, 34, 57, 0.9) 100%);
  z-index: 2;
`;

const FloatingShip = styled(motion.div)`
  position: absolute;
  width: 400px;
  height: 300px;
  right: 5%;
  top: 30%;
  background-image: url('/images/ship-illustration.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 3;
  
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
  
  @media (max-width: 992px) {
    width: 300px;
    height: 225px;
    top: auto;
    bottom: 10%;
    right: 50%;
    transform: translateX(50%);
  }
`;

const OceanSurface = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 150px;
  background: linear-gradient(to bottom, rgba(30, 144, 255, 0.2), rgba(30, 144, 255, 0.4));
  z-index: 3;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: rgba(255, 255, 255, 0.4);
  }
`;

const WaveAnimation = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background-image: url('/images/wave-animated.svg');
  background-size: 1200px 120px;
  background-repeat: repeat-x;
  z-index: 4;
  opacity: 0.6;
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 5;
  color: white;
  max-width: 800px;
  text-align: center;
  padding: 0 24px;
`;

const GlowingTitle = styled(motion.h1)`
  font-size: 5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #ffffff, #F6AD55, #ffffff);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  position: relative;
  text-shadow: 0 0 30px rgba(246, 173, 85, 0.3);
  letter-spacing: -1px;
  line-height: 1.1;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

// Floating elements for visual flair
const FloatingElement = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
  filter: blur(8px);
  z-index: 1;
`;

const FAQContainer = styled.div`
  position: relative;
  z-index: 5;
  max-width: 1200px;
  margin: -100px auto 0;
  padding: 0 24px 100px;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 5;
  padding: 40px 0;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 40px;
  perspective: 1000px;
`;

const CategoryButton = styled(motion.button)`
  padding: 1.2rem 1.6rem;
  border-radius: 16px;
  border: none;
  background: ${props => props.active ? props.color || '#F6AD55' : 'rgba(255, 255, 255, 0.95)'};
  color: ${props => props.active ? 'white' : '#1a2a3a'};
  box-shadow: ${props => props.active ? 
    `0 20px 25px -5px ${props.color}40, 0 10px 10px -5px ${props.color}30` : 
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'};
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  transform: ${props => props.active ? 'translateZ(20px)' : 'translateZ(0)'};
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
    transform: translateZ(10px);
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
    transform: translateX(-100%) rotate(45deg);
    transition: transform 0.6s ease;
  }

  &:hover {
    transform: ${props => props.active ? 'translateZ(30px) scale(1.05)' : 'translateZ(20px) scale(1.05)'};
    box-shadow: ${props => props.active ? 
      `0 25px 30px -5px ${props.color}50, 0 15px 15px -10px ${props.color}40` : 
      '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'};
      
    &::after {
      transform: translateX(100%) rotate(45deg);
    }
  }
  
  .category-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    font-size: 20px;
    filter: ${props => props.active ? 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' : 'none'};
  }
  
  .category-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    height: 28px;
    padding: 0 8px;
    border-radius: 14px;
    font-size: 14px;
    font-weight: 600;
    background: ${props => props.active ? 'rgba(255, 255, 255, 0.25)' : props.color + '20' || 'rgba(26, 42, 58, 0.1)'};
    color: ${props => props.active ? 'white' : props.color || '#1a2a3a'};
    margin-left: 6px;
    box-shadow: ${props => props.active ? 'inset 0 0 0 1px rgba(255, 255, 255, 0.25)' : 'none'};
    transition: all 0.3s ease;
  }
`;

const CategoryDescription = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 24px 32px;
  margin-bottom: 40px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    background: ${props => props.color || '#F6AD55'};
    border-radius: 6px 0 0 6px;
  }
  
  .category-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    font-size: 28px;
    color: white;
    background: ${props => props.color || '#F6AD55'};
    border-radius: 16px;
    margin-right: 16px;
    box-shadow: 0 10px 15px -3px ${props => props.color + '40' || 'rgba(246, 173, 85, 0.4)'};
  }
  
  h3 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 8px;
    color: #1a2a3a;
  }
  
  p {
    font-size: 18px;
    line-height: 1.6;
    color: #4a5568;
    margin: 0;
  }
`;

const AccordionContainer = styled(motion.div)`
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 -10px 50px -12px rgba(0, 0, 0, 0.05);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: linear-gradient(to right, #1e3a5f, #3498db, #1e3a5f);
    opacity: 0.7;
  }
`;

const AccordionHeader = styled.div`
  padding: 24px 32px;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
`;

const AccordionFilters = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  background: ${props => props.active ? '#1e3a5f' : 'white'};
  color: ${props => props.active ? 'white' : '#1e3a5f'};
  border: 1px solid #e2e8f0;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? '#1e3a5f' : '#f7fafc'};
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  
  svg {
    font-size: 12px;
  }
`;

const ResultsCounter = styled.div`
  font-size: 14px;
  color: #718096;
`;

// Enhanced FAQ Item component with advanced 3D effects and micro-interactions
const FAQItem = ({ question, answer, isOpen, toggleOpen, highlighted = false, category }) => {
  const contentRef = useRef(null);
  const itemRef = useRef(null);
  const categoryData = faqCategories.find(cat => cat.id === category);
  const categoryColor = categoryData ? categoryData.color : '#F6AD55';
  
  // Mouse move effect for 3D card tilt
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };
  
  // Clean plain text for preview
  const plainTextAnswer = answer.replace(/<[^>]*>?/gm, '');
  
  return (
    <motion.div 
      ref={itemRef}
      layout
      className="relative mb-6 last:mb-0 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0.5, y: 0.5 })}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-80"
        style={{
          background: highlighted 
            ? `linear-gradient(120deg, ${categoryColor}15, ${categoryColor}30)`
            : `linear-gradient(120deg, #f8fafc, #f1f5f9)`,
          zIndex: -1,
          transform: isOpen 
            ? 'none' 
            : `rotateX(${(mousePosition.y - 0.5) * 5}deg) rotateY(${(mousePosition.x - 0.5) * 5}deg)`,
          boxShadow: isOpen
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 -10px 50px -12px rgba(0, 0, 0, 0.05), 0 0 0 2px ${categoryColor}30`
            : '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 -5px 20px -10px rgba(0, 0, 0, 0.05)'
        }}
        animate={{
          background: highlighted 
            ? [
                `linear-gradient(120deg, ${categoryColor}15, ${categoryColor}30)`,
                `linear-gradient(140deg, ${categoryColor}20, ${categoryColor}35)`,
                `linear-gradient(120deg, ${categoryColor}15, ${categoryColor}30)`
              ]
            : isOpen
              ? [
                  `linear-gradient(120deg, #f8fafc, #f1f5f9)`,
                  `linear-gradient(140deg, ${categoryColor}10, #f8fafc)`,
                  `linear-gradient(120deg, #f8fafc, #f1f5f9)`
                ]
              : `linear-gradient(120deg, #f8fafc, #f1f5f9)`
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Highlight indicator */}
      {highlighted && (
        <motion.div 
          style={{ 
            position: 'absolute', 
            left: '0', 
            top: '0', 
            width: '4px', 
            height: '100%', 
            background: '#ECC94B',
            zIndex: 0
          }}
          animate={{
            opacity: [0.7, 1, 0.7],
            height: ['100%', '98%', '100%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      <div className={`rounded-2xl overflow-hidden backdrop-blur-sm ${isOpen ? 'pb-6' : ''}`}>
        <button 
          className="w-full py-6 px-8 flex justify-between items-start text-left focus:outline-none"
          onClick={toggleOpen}
          aria-expanded={isOpen}
          style={{ color: isOpen ? categoryColor : '#1a2a3a' }}
        >
          <div className="flex items-start gap-5 flex-1">
            {categoryData && (
              <div className="mt-1">
                <motion.div
                  className="flex items-center justify-center w-12 h-12 rounded-xl"
                  style={{ 
                    background: isOpen 
                      ? `linear-gradient(135deg, ${categoryColor}, ${categoryColor}cc)`
                      : 'rgba(226, 232, 240, 0.8)',
                    color: isOpen ? 'white' : '#718096',
                    boxShadow: isOpen 
                      ? `0 10px 15px -3px ${categoryColor}40, 0 4px 6px -4px ${categoryColor}30`
                      : '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)'
                  }}
                  animate={{ 
                    scale: isOpen ? [1, 1.1, 1] : 1,
                    rotate: isOpen ? [0, 5, 0] : 0,
                    y: isOpen ? [0, -2, 0] : 0
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    animate={isOpen ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, 0]
                    } : {}}
                    transition={{
                      duration: 1.5,
                      repeat: isOpen ? Infinity : 0,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                    style={{ fontSize: '1.5rem' }}
                  >
                    {categoryData.icon}
                  </motion.div>
                </motion.div>
              </div>
            )}
            
            <div className="flex-1">
              <motion.h3 
                className="text-xl font-semibold transition-all duration-300"
                style={{ 
                  transformOrigin: 'left center',
                }}
                animate={isOpen ? {
                  scale: 1.05,
                  fontWeight: 700
                } : {
                  scale: 1,
                  fontWeight: 600
                }}
                transition={{ duration: 0.3 }}
                dangerouslySetInnerHTML={{ __html: question }} 
              />
              
              {/* Preview of answer when closed with fade effect */}
              {!isOpen && (
                <motion.p 
                  className="text-gray-500 mt-2 text-sm relative overflow-hidden"
                  style={{ maxHeight: '2.5rem' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {plainTextAnswer.substring(0, 140)}...
                  <span 
                    className="absolute bottom-0 right-0 left-0 h-full" 
                    style={{ 
                      background: 'linear-gradient(to right, transparent 0%, #f8fafc 80%)',
                      width: '100%', 
                      zIndex: 1,
                      pointerEvents: 'none'
                    }}
                  />
                </motion.p>
              )}
            </div>
          </div>
          
          <div className="flex items-center ml-4">
            <motion.div
              className="relative"
              animate={isOpen ? {
                rotate: 180,
              } : {
                rotate: 0,
              }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Wave circle effect on click */}
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ scale: 0, opacity: 1 }}
                animate={isOpen ? {
                  scale: [0, 2.5],
                  opacity: [1, 0]
                } : {
                  scale: 0,
                  opacity: 0
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ background: categoryColor, zIndex: -1 }}
              />
              
              <motion.div
                className="flex items-center justify-center w-10 h-10 rounded-full"
                style={{ 
                  background: isOpen ? categoryColor : 'rgba(226, 232, 240, 0.8)',
                  color: isOpen ? 'white' : '#4a5568',
                  boxShadow: isOpen 
                    ? `0 4px 6px -1px ${categoryColor}40, 0 2px 4px -2px ${categoryColor}30`
                    : 'none'
                }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: isOpen 
                    ? `0 8px 10px -1px ${categoryColor}40, 0 4px 6px -2px ${categoryColor}30`
                    : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.05)'
                }}
                transition={{ duration: 0.2 }}
              >
                <FaChevronDown />
              </motion.div>
            </motion.div>
          </div>
        </button>
        
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              ref={contentRef}
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: "auto", 
                opacity: 1,
                transition: { 
                  height: { duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] },
                  opacity: { duration: 0.4, delay: 0.1 }
                }
              }}
              exit={{ 
                height: 0, 
                opacity: 0,
                transition: { 
                  height: { duration: 0.3, ease: "easeIn" },
                  opacity: { duration: 0.2 }
                }
              }}
              className="overflow-hidden"
            >
              <motion.div 
                className="px-8 pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                {/* Line separator with animation */}
                <motion.div 
                  className="w-full h-px mb-6"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  style={{ 
                    background: `linear-gradient(to right, ${categoryColor}40, ${categoryColor}10)`,
                    transformOrigin: 'left'
                  }}
                />
                
                <div 
                  className="prose prose-lg max-w-none text-gray-600 relative"
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
                
                {/* Glowing orb behind the content for visual interest */}
                <motion.div
                  className="absolute z-0 rounded-full opacity-10 blur-3xl"
                  style={{
                    background: categoryColor,
                    width: '40%',
                    height: '50%',
                    top: '25%',
                    left: '10%',
                    pointerEvents: 'none'
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.05, 0.08, 0.05],
                    x: [0, 20, 0]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div 
                  className="mt-6 pt-4 flex justify-between items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  style={{ borderTop: `1px solid ${categoryColor}20` }}
                >
                  <div className="flex items-center text-sm text-gray-500">
                    <motion.div
                      whileHover={{
                        scale: 1.1,
                        color: categoryColor,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <FaClock className="mr-2" /> Last updated: June 2023
                    </motion.div>
                  </div>
                  
                  <motion.button 
                    className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors px-3 py-1 rounded-full overflow-hidden relative"
                    whileHover={{ 
                      scale: 1.05,
                      color: categoryColor
                    }}
                    style={{
                      perspective: '1000px'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = "/contact";
                    }}
                  >
                    {/* Animated background on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      initial={{ opacity: 0 }}
                      whileHover={{ 
                        opacity: 0.1,
                        background: categoryColor
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    <span>Need more assistance?</span>
                    <motion.div
                      whileHover={{
                        x: [0, 5, 0],
                        transition: { duration: 0.6, repeat: Infinity }
                      }}
                    >
                      <FaExternalLinkAlt size={12} />
                    </motion.div>
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// No results component with fancy animation
const NoResults = ({ resetFilters }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="text-center py-20 px-8 bg-white rounded-2xl shadow-xl flex flex-col items-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
      }}
    >
      {/* Background patterns */}
      <motion.div 
        className="absolute w-full h-full top-0 left-0 z-0"
        style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(246, 173, 85, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(66, 153, 225, 0.1) 0%, transparent 50%)'
        }}
        animate={{
          backgroundPosition: ['0% 0%, 0% 0%', '10% 10%, -10% -10%', '0% 0%, 0% 0%']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="text-8xl mb-10 relative"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 5, 0, -5, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1))',
          transformStyle: 'preserve-3d'
        }}
      >
        <span className="block relative transform" style={{ transformStyle: 'preserve-3d' }}>
          🔍
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              opacity: [0, 0.7, 0],
              scale: [1, 2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut"
            }}
            style={{
              color: '#3182CE',
              fontSize: '1.5rem'
            }}
          >
            <FaSearch />
          </motion.div>
        </span>
      </motion.div>
      
      <h3 className="text-3xl font-bold mb-4 text-gray-800 relative z-10">No FAQs Found</h3>
      <p className="text-gray-600 mb-10 text-xl max-w-lg relative z-10">
        We couldn't find any questions matching your criteria. Try adjusting your search or browse all FAQs.
      </p>
      
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
        whileTap={{ scale: 0.98 }}
        className="px-10 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all relative z-10 overflow-hidden"
        onClick={resetFilters}
        style={{
          background: 'linear-gradient(135deg, #3182CE 0%, #2C5282 100%)',
          color: 'white'
        }}
      >
        <motion.span
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(135deg, #3182CE 0%, #2C5282 100%)',
              'linear-gradient(135deg, #3182CE 20%, #2C5282 120%)',
              'linear-gradient(135deg, #3182CE 0%, #2C5282 100%)'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <span className="relative z-10 flex items-center gap-2">
          <motion.span
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <FaSync />
          </motion.span>
          Reset Filters
        </span>
      </motion.button>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 z-10">
        <div className="h-full w-full bg-gradient-to-r from-blue-100 via-blue-500 to-blue-100 opacity-50" />
      </div>
    </motion.div>
  );
};

// Premium contact section with 3D and animation effects
const ContactSection = styled(motion.div)`
  margin-top: 80px;
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;
`;

const ContactBackground = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #0b2239 0%, #1e3a5f 80%, #2c4d6e 100%);
  z-index: 0;
`;

const ContactGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image: url('/images/ocean-grid.svg');
  background-size: cover;
  opacity: 0.1;
  z-index: 1;
`;

const ContactContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 64px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  @media (min-width: 768px) {
    flex-direction: row;
    padding: 64px;
    text-align: left;
    align-items: flex-start;
  }
`;

const ContactInfo = styled.div`
  flex: 1;
  color: white;
  margin-bottom: 40px;
  
  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 48px;
  }
`;

const ContactTitle = styled(motion.h3)`
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 24px;
  color: white;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 0;
    width: 80px;
    height: 4px;
    background: #F6AD55;
    border-radius: 2px;
    
    @media (max-width: 768px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const ContactText = styled(motion.p)`
  font-size: 18px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 32px;
  max-width: 500px;
`;

const ContactFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 32px;
`;

const ContactFeature = styled(motion.div)`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 16px;
  gap: 12px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  .icon {
    color: #F6AD55;
    font-size: 20px;
  }
  
  .text {
    font-size: 15px;
    font-weight: 500;
    color: white;
  }
`;

const ContactButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ContactButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  gap: 8px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover::before {
    transform: translateX(100%);
  }
`;

const PrimaryButton = styled(ContactButton)`
  background: white;
  color: #1a2a3a;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: #f8fafc;
    transform: translateY(-2px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  }
`;

const SecondaryButton = styled(ContactButton)`
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  
  &:hover {
    border-color: white;
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  }
`;

const FloatingShips = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 180px;
  height: 120px;
  z-index: 3;
  opacity: 0.2;
  pointer-events: none;
  
  @media (min-width: 768px) {
    width: 240px;
    height: 160px;
    bottom: 40px;
    right: 40px;
  }
`;

const Particles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 8 + 2,
            height: Math.random() * 8 + 2,
            background: `rgba(246, 173, 85, ${Math.random() * 0.4 + 0.1})`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: 'blur(1px)'
          }}
          animate={{
            y: [0, -Math.random() * 100 - 50],
            x: [0, (Math.random() - 0.5) * 50],
            opacity: [0, Math.random() * 0.5 + 0.2, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const WaterMovement = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.05))'
        }}
      />
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 left-0 right-0 h-16"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.03))',
            opacity: 0.5,
            y: i * 5
          }}
          animate={{
            x: [`-${Math.random() * 30}%`, `${Math.random() * 30}%`, `-${Math.random() * 30}%`]
          }}
          transition={{
            duration: 10 + i * 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const InformationTooltip = ({ children, text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative inline-block"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute z-30 bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg shadow-xl whitespace-nowrap"
            style={{ maxWidth: "200px" }}
          >
            {text}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main FAQ Component with enhanced UI
const FAQ = () => {
  // State management
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState(new Set([1])); // Initially open first item
  const [filteredFaqs, setFilteredFaqs] = useState(faqData);
  const [highlightedIds, setHighlightedIds] = useState(new Set());
  const [searchCount, setSearchCount] = useState(0);
  const [view3D, setView3D] = useState(true);
  const [nightMode, setNightMode] = useState(false);
  
  // Parallax scrolling effect
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const y3 = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);
  
  // 3D stats and visualization
  const totalQuestions = faqData.length;
  const categoryStats = faqCategories.map(cat => ({
    ...cat,
    count: faqData.filter(faq => faq.category === cat.id).length,
    percentage: (faqData.filter(faq => faq.category === cat.id).length / totalQuestions) * 100
  }));
  
  // Filter FAQs based on category and search term
  useEffect(() => {
    const highlightIds = new Set();
    let filtered = [...faqData];
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(faq => {
        const matchesQuestion = faq.question.toLowerCase().includes(term);
        const matchesAnswer = faq.answer.toLowerCase().includes(term);
        
        // Add to highlighted IDs if matches search term
        if (matchesQuestion || matchesAnswer) {
          highlightIds.add(faq.id);
        }
        
        return matchesQuestion || matchesAnswer;
      });
      
      // Open all items that match search
      setOpenItems(new Set(filtered.map(faq => faq.id)));
      setSearchCount(filtered.length);
    } else {
      setSearchCount(0);
    }
    
    setFilteredFaqs(filtered);
    setHighlightedIds(highlightIds);
  }, [activeCategory, searchTerm]);
  
  // Toggle function for opening/closing FAQs
  const toggleItem = (id) => {
    setOpenItems(prevOpenItems => {
      const newOpenItems = new Set(prevOpenItems);
      if (newOpenItems.has(id)) {
        newOpenItems.delete(id);
      } else {
        newOpenItems.add(id);
      }
      return newOpenItems;
    });
  };
  
  // Reset filters
  const resetFilters = () => {
    setActiveCategory('all');
    setSearchTerm('');
    setOpenItems(new Set([1]));
  };
  
  // Count FAQs by category
  const categoryCount = faqData.reduce((acc, faq) => {
    acc[faq.category] = (acc[faq.category] || 0) + 1;
    return acc;
  }, {});
  
  return (
    <StyledFAQSection 
      style={{
        background: nightMode 
          ? 'linear-gradient(to bottom, #0f172a, #1e293b)'
          : 'linear-gradient(to bottom, #f7f9fc, #edf2f7)'
      }}
    >
      {/* Floating UI controls */}
      <motion.div 
        className="fixed right-6 top-1/4 z-50 flex flex-col gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <InformationTooltip text="Toggle 3D effects">
          <motion.button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg text-gray-700 hover:shadow-xl"
            onClick={() => setView3D(!view3D)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div animate={{ rotateY: view3D ? 0 : 180 }} transition={{ duration: 0.5 }}>
              <FaGlobeAmericas />
            </motion.div>
          </motion.button>
        </InformationTooltip>
        
        <InformationTooltip text={nightMode ? "Light mode" : "Night mode"}>
          <motion.button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg text-gray-700 hover:shadow-xl"
            onClick={() => setNightMode(!nightMode)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {nightMode ? <FaSun /> : <FaMoon />}
          </motion.button>
        </InformationTooltip>
      </motion.div>
      
      <Particles />
      <WaterMovement />
      
      {/* Premium 3D Parallax Hero Section */}
      <ParallaxHero>
        {/* Deep ocean background */}
        <ParallaxLayer 
          style={{ 
            backgroundImage: nightMode 
              ? "url('/images/night-ocean.jpg')" 
              : "url('/images/deep-ocean.jpg')",
            y: view3D ? y1 : 0
          }}
          zIndex={1}
        />
        
        {/* Gradient overlay */}
        <GradientOverlay 
          style={{ 
            background: nightMode 
              ? 'radial-gradient(circle at center, rgba(2, 8, 20, 0.5) 0%, rgba(2, 8, 20, 0.9) 100%)'
              : 'radial-gradient(circle at center, rgba(11, 34, 57, 0.5) 0%, rgba(11, 34, 57, 0.9) 100%)'
          }}
        />
        
        {/* Animated lights */}
        {nightMode && (
          <motion.div
            className="absolute inset-0 z-2"
            animate={{
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: 'radial-gradient(circle at 70% 20%, rgba(255, 255, 255, 0.1), transparent 50%)'
            }}
          />
        )}
        
        {/* Floating elements for depth */}
        {view3D && (
          <>
            <FloatingElement 
              style={{ top: '20%', left: '10%', width: '150px', height: '150px', opacity: 0.2 }}
              animate={{ y: [0, 20, 0], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <FloatingElement 
              style={{ top: '60%', right: '15%', width: '100px', height: '100px', opacity: 0.15 }}
              animate={{ y: [0, -15, 0], opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <FloatingElement 
              style={{ top: '30%', right: '25%', width: '80px', height: '80px', opacity: 0.1 }}
              animate={{ y: [0, 25, 0], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </>
        )}
        
        {/* 3D Floating Ship */}
        {view3D && (
          <FloatingShip 
            initial={{ y: 20, rotate: 2 }}
            animate={{ y: [20, 0, 20], rotate: [2, -2, 2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ 
              y: y2, 
              scale,
              filter: nightMode ? 'brightness(0.8) drop-shadow(0 0 15px rgba(255, 255, 255, 0.1))' : 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))'
            }}
          />
        )}
        
        {/* Animated ocean surface */}
        <OceanSurface 
          style={{ 
            y: view3D ? y3 : 0,
            background: nightMode 
              ? 'linear-gradient(to bottom, rgba(10, 40, 80, 0.2), rgba(10, 40, 80, 0.4))'
              : 'linear-gradient(to bottom, rgba(30, 144, 255, 0.2), rgba(30, 144, 255, 0.4))'
          }}
        />
        
        {/* Animated waves */}
        <WaveAnimation 
          animate={{ backgroundPositionX: ['0px', '-1200px'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            opacity: nightMode ? 0.4 : 0.6
          }}
        />
        
        {/* Hero content */}
        <HeroContent style={{ opacity, y: view3D ? y2 : 0 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 bg-white bg-opacity-10 text-white rounded-full text-sm font-semibold mb-4 backdrop-blur-sm border border-white border-opacity-20">
              Advanced Knowledge Center
            </span>
          </motion.div>
          
          <GlowingTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              background: nightMode
                ? 'linear-gradient(to right, #ffffff, #64B5F6, #ffffff)'
                : 'linear-gradient(to right, #ffffff, #F6AD55, #ffffff)',
              textShadow: nightMode
                ? '0 0 30px rgba(100, 181, 246, 0.5)'
                : '0 0 30px rgba(246, 173, 85, 0.3)'
            }}
          >
            Frequently Asked <span className="text-white">Questions</span>
          </GlowingTitle>
          
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Navigate our comprehensive knowledge base to find answers about shipping services, documentation, tracking, and specialized cargo handling.
          </HeroSubtitle>
          
          {/* Enhanced search */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                <motion.div
                  animate={searchTerm ? { rotate: [0, 360] } : {}}
                  transition={{ duration: 2, repeat: searchTerm ? Infinity : 0, ease: "linear" }}
                >
                  <FaSearch className={`text-xl ${nightMode ? 'text-blue-300' : 'text-orange-300'}`} />
                </motion.div>
              </div>
              
              <motion.input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-14 pr-14 py-5 border-none rounded-full shadow-xl focus:outline-none focus:ring-2 text-lg"
                placeholder="Search for answers or keywords..."
                style={{ 
                  boxShadow: nightMode 
                    ? "0 15px 35px rgba(0,0,0,0.5)"
                    : "0 15px 35px rgba(0,0,0,0.2)",
                  background: nightMode
                    ? "rgba(30, 41, 59, 0.8)"
                    : "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(10px)",
                  color: nightMode ? "white" : "inherit"
                }}
                animate={{
                  boxShadow: searchTerm 
                    ? [
                        nightMode ? "0 15px 35px rgba(0,0,0,0.5)" : "0 15px 35px rgba(0,0,0,0.2)",
                        nightMode ? "0 15px 35px rgba(59, 130, 246, 0.3)" : "0 15px 35px rgba(246, 173, 85, 0.3)",
                        nightMode ? "0 15px 35px rgba(0,0,0,0.5)" : "0 15px 35px rgba(0,0,0,0.2)"
                      ]
                    : nightMode ? "0 15px 35px rgba(0,0,0,0.5)" : "0 15px 35px rgba(0,0,0,0.2)",
                }}
                transition={{
                  duration: 2,
                  repeat: searchTerm ? Infinity : 0,
                  ease: "easeInOut"
                }}
                initial={{
                  y: 50,
                  opacity: 0
                }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                    ease: [0.23, 1, 0.32, 1]
                  }
                }}
                viewport={{ once: true }}
              />
              
              {searchTerm && (
                <motion.button
                  className="absolute inset-y-0 right-0 pr-5 flex items-center z-10"
                  onClick={() => setSearchTerm('')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className={nightMode ? 'text-blue-300' : 'text-orange-300'}
                  >
                    <FaSync />
                  </motion.div>
                </motion.button>
              )}
              
              {/* Search pulse animation */}
              {searchTerm && (
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  animate={{
                    boxShadow: [
                      `0 0 0 0 ${nightMode ? 'rgba(59, 130, 246, 0)' : 'rgba(246, 173, 85, 0)'}`,
                      `0 0 0 10px ${nightMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(246, 173, 85, 0.2)'}`,
                      `0 0 0 20px ${nightMode ? 'rgba(59, 130, 246, 0)' : 'rgba(246, 173, 85, 0)'}`,
                    ]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              )}
            </div>
            
            {searchTerm && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-blue-100 mt-4 text-lg"
              >
                Found <span className="font-bold">{searchCount}</span> {searchCount === 1 ? 'result' : 'results'} for "{searchTerm}"
              </motion.div>
            )}
          </motion.div>
        </HeroContent>
      </ParallaxHero>
      
      <FAQContainer>
        <ContentWrapper>
          {/* Interactive Data Visualization */}
          <motion.div
            className={`mb-20 p-8 rounded-2xl overflow-hidden relative ${nightMode ? 'bg-gray-900/70' : 'bg-white/80'}`}
            style={{
              backdropFilter: "blur(10px)",
              boxShadow: nightMode 
                ? "0 25px 50px -12px rgba(0, 0, 0, 0.3)"
                : "0 25px 50px -12px rgba(0, 0, 0, 0.1)"
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className={`text-2xl font-bold mb-6 ${nightMode ? 'text-white' : 'text-gray-800'}`}>
              FAQ Category Distribution
            </h3>
            
            <div className="flex flex-wrap gap-4 justify-center">
              {categoryStats.map((category) => (
                <motion.div
                  key={category.id}
                  className={`relative overflow-hidden rounded-xl p-4 flex-1 min-w-[200px] ${nightMode ? 'bg-gray-800' : 'bg-gray-50'}`}
                  style={{
                    boxShadow: `0 4px 6px -1px ${category.color}20, 0 2px 4px -2px ${category.color}20`
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: `0 10px 15px -3px ${category.color}30, 0 4px 6px -4px ${category.color}30`
                  }}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {/* Progress bar background */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gray-200 dark:bg-gray-700 w-full"
                    style={{ zIndex: 0 }}
                  />
                  
                  {/* Animated progress bar */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1"
                    style={{ 
                      width: `${category.percentage}%`,
                      background: category.color,
                      zIndex: 1
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${category.percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                  
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                      style={{ background: category.color }}
                    >
                      {category.icon}
                    </div>
                    <h4 className={`font-semibold ${nightMode ? 'text-white' : 'text-gray-800'}`}>{category.name}</h4>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <p className={`text-sm ${nightMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {category.count} questions
                    </p>
                    <p className="text-xl font-bold" style={{ color: category.color }}>
                      {Math.round(category.percentage)}%
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Category filters */}
          <motion.div 
            className="relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-bold ${nightMode ? 'text-white' : 'text-gray-800'}`}>
                Filter by Category
              </h2>
              <p className={`mt-2 ${nightMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Select a category to narrow down your search
              </p>
            </div>
            
            <CategoryContainer style={{ perspective: view3D ? '1000px' : 'none' }}>
              <CategoryButton
                as={motion.button}
                whileHover={{ scale: view3D ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                active={activeCategory === 'all'}
                onClick={() => setActiveCategory('all')}
                color="#1a2a3a"
                layout
                style={{
                  transform: view3D && activeCategory === 'all' ? 'translateZ(20px)' : 'translateZ(0)',
                  background: nightMode && !activeCategory === 'all' ? 'rgba(30, 41, 59, 0.8)' : ''
                }}
              >
                <span className="category-icon">
                  <FaGlobeAmericas />
                </span>
                All Categories 
                <span className="category-count">
                  {faqData.length}
                </span>
              </CategoryButton>
              
              {faqCategories.map((category) => (
                <CategoryButton
                  key={category.id}
                  as={motion.button}
                  whileHover={{ scale: view3D ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  active={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                  color={category.color}
                  layout
                  style={{
                    transform: view3D && activeCategory === category.id ? 'translateZ(20px)' : 'translateZ(0)',
                    background: nightMode && activeCategory !== category.id ? 'rgba(30, 41, 59, 0.8)' : ''
                  }}
                >
                  <span className="category-icon">
                    {category.icon}
                  </span> 
                  {category.name}
                  <span className="category-count">
                    {categoryCount[category.id] || 0}
                  </span>
                </CategoryButton>
              ))}
            </CategoryContainer>
          </motion.div>
          
          {/* FAQs with premium styling */}
          <AccordionContainer
            layout
            transition={{ layout: { duration: 0.3, type: "spring" } }}
          >
            <AccordionHeader>
              <ResultsCounter>
                {filteredFaqs.length} {filteredFaqs.length === 1 ? 'FAQ' : 'FAQs'} {activeCategory !== 'all' ? `in ${faqCategories.find(c => c.id === activeCategory)?.name}` : ''}
              </ResultsCounter>
              
              <AccordionFilters>
                <FilterButton onClick={resetFilters}>
                  <FaSync /> Reset
                </FilterButton>
                {searchTerm && (
                  <FilterButton active>
                    Search: "{searchTerm.length > 15 ? searchTerm.substring(0, 15) + '...' : searchTerm}" ✕
                  </FilterButton>
                )}
              </AccordionFilters>
            </AccordionHeader>
            
            {filteredFaqs.length > 0 ? (
              <motion.div layout>
                <AnimatePresence initial={false}>
                  {filteredFaqs.map((faq) => (
                    <FAQItem 
                      key={faq.id}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openItems.has(faq.id)}
                      toggleOpen={() => toggleItem(faq.id)}
                      highlighted={highlightedIds.has(faq.id) && searchTerm.trim() !== ''}
                      category={faq.category}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <NoResults resetFilters={resetFilters} />
            )}
          </AccordionContainer>
          
          {/* Premium contact section */}
          <ContactSection
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <ContactBackground />
            <ContactGrid />
            
            <motion.div 
              className="absolute inset-0 z-2"
              style={{ 
                background: 'radial-gradient(circle at bottom right, rgba(246, 173, 85, 0.15), transparent 50%)'
              }}
              animate={{
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute z-3"
              style={{
                bottom: '20px',
                right: '20px',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(246, 173, 85, 0.2), transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(40px)'
              }}
              animate={{
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <FloatingShips>
              <motion.img 
                src="/images/ship-silhouette.svg" 
                alt="Ship" 
                style={{ position: 'absolute', width: '100%', height: '100%' }}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 2, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </FloatingShips>
            
            <ContactContent>
              <ContactInfo>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <span className="inline-block px-4 py-2 bg-white bg-opacity-10 text-blue-200 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm border border-white border-opacity-20">
                    24/7 Support
                  </span>
                </motion.div>
                
                <ContactTitle
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Still have questions?
                </ContactTitle>
                
                <ContactText
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Our global support team is available around the clock to help with your shipping requirements. Contact us for personalized assistance from our logistics experts.
                </ContactText>
                
                <ContactFeatures>
                  {[
                    { icon: <FaShip />, text: "Shipping Expertise" },
                    { icon: <FaGlobeAmericas />, text: "Global Support" },
                    { icon: <FaClock />, text: "24/7 Availability" }
                  ].map((feature, index) => (
                    <ContactFeature
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="icon">{feature.icon}</span>
                      <span className="text">{feature.text}</span>
                    </ContactFeature>
                  ))}
                </ContactFeatures>
                
                <ContactButtons>
                  <SecondaryButton
                    href="/contact"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    Live Chat Support
                  </SecondaryButton>
                  
                  <PrimaryButton
                    href="/documentation"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    viewport={{ once: true }}
                  >
                    View Documentation <FaExternalLinkAlt size={12} />
                  </PrimaryButton>
                </ContactButtons>
              </ContactInfo>
              
              <motion.div
                className="w-full md:w-1/2 flex justify-center"
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="max-w-sm w-full">
                  <img
                    src="/images/customer-support.svg"
                    alt="Customer Support"
                    className="w-full drop-shadow-2xl"
                  />
                </div>
              </motion.div>
            </ContactContent>
          </ContactSection>
          
          {/* Footer spacer */}
          <div className="h-16"></div>
        </ContentWrapper>
      </FAQContainer>
    </StyledFAQSection>
  );
};

export default FAQ; 