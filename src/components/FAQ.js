import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaAnchor, FaShip, FaCompass, FaWater } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import SectionTitle from './shared/SectionTitle';

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
    answer: "Ocean Crown provides a comprehensive range of shipping services including ocean freight, air freight, land transportation, and project cargo. We specialize in container shipping, bulk cargo, breakbulk, and specialized shipments for various industries."
  },
  {
    id: 2,
    category: 'tracking',
    question: "How can I track my shipment?",
    answer: "You can track your shipment through our online tracking portal using your shipment reference number or container number. Alternatively, you can contact our customer service team who will be happy to provide you with real-time updates on your cargo location."
  },
  {
    id: 3,
    category: 'shipping',
    question: "What destinations do you serve?",
    answer: "Ocean Crown has a global network covering major ports and logistics hubs across six continents. Our extensive network allows us to deliver seamless shipping solutions worldwide, with particular strength in routes connecting Africa, Europe, Asia, and the Americas."
  },
  {
    id: 4,
    category: 'documentation',
    question: "What documentation is required for international shipping?",
    answer: "Required documentation typically includes: commercial invoice, packing list, bill of lading, certificate of origin, and customs declaration forms. Specific requirements may vary depending on the destination country, type of goods, and shipping method."
  },
  {
    id: 5,
    category: 'documentation',
    question: "How do you handle customs clearance?",
    answer: "Our dedicated customs clearance experts handle all aspects of the import/export process, ensuring your cargo complies with both origin and destination regulatory requirements. We manage documentation, duty payments, inspections, and address any customs challenges to ensure smooth clearance and delivery."
  },
  {
    id: 6,
    category: 'shipping',
    question: "What measures do you take for sustainable shipping?",
    answer: "Ocean Crown is committed to environmental sustainability. We implement fuel-efficient routing, use modern vessels with reduced emissions, offer carbon-offset programs, and continuously seek innovative solutions to minimize our environmental footprint while maintaining service quality."
  },
  {
    id: 7,
    category: 'documentation',
    question: "Do you offer insurance for shipments?",
    answer: "Yes, we offer comprehensive cargo insurance options to protect your goods against loss, damage, and delay during transit. Our insurance solutions can be tailored to your specific cargo type, value, and risk factors to ensure appropriate coverage."
  },
  {
    id: 8,
    category: 'special',
    question: "How do you handle special cargo requirements?",
    answer: "We specialize in handling special cargo including temperature-sensitive goods, hazardous materials, oversized equipment, and high-value items. Our team develops customized shipping solutions incorporating specialized containers, monitoring systems, and handling protocols based on your specific cargo requirements."
  },
  {
    id: 9,
    category: 'tracking',
    question: "What is your estimated delivery timeframe?",
    answer: "Delivery timeframes vary based on origin, destination, service type, and current maritime conditions. Typically, our ocean freight services range from 7-45 days depending on the route."
  },
  {
    id: 10,
    category: 'tracking',
    question: "Do you offer expedited shipping options?",
    answer: "Yes, we offer expedited shipping solutions for time-sensitive cargo. Options include premium ocean services with priority loading/unloading, combined air-sea solutions, and dedicated express services."
  },
  {
    id: 11,
    category: 'special',
    question: "Can you handle refrigerated cargo?",
    answer: "Yes, we have extensive experience with refrigerated (reefer) cargo transportation. Our reefer container services maintain precise temperature, humidity and atmosphere control throughout the entire journey."
  },
  {
    id: 12,
    category: 'special',
    question: "How do you manage project cargo logistics?",
    answer: "Our project cargo team specializes in the transportation of oversized, heavy and high-value equipment. We provide end-to-end project management including feasibility studies, route surveys, engineering analyses, and specialized vessel chartering."
  }
];

// Styled components
const FAQContainer = styled.section`
  padding: 80px 0;
  background-color: #f9f9f9;
`;

const FAQContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const CategoryDistribution = styled.div`
  margin-bottom: 40px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  background: white;
`;

const CategoryHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
  padding: 20px;
  background: #f0f4f8;
`;

const CategoryBar = styled.div`
  height: 45px;
  display: flex;
  width: 100%;
  overflow: hidden;
`;

const CategorySegment = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex: ${props => props.percentage};
  background-color: ${props => props.color};
  position: relative;
  padding: 0 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    filter: brightness(1.1);
  }
`;

const CategoryInfo = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const CategoryName = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
  
  svg {
    color: ${props => props.color};
  }
`;

const CategoryCount = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const CategoryPercent = styled.div`
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.percentage}%;
    background-color: ${props => props.color};
    border-radius: 3px;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 30px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const FilterTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 15px;
  color: #333;
`;

const FilterHint = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

const FilterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
`;

const CategoryButton = styled.button`
  padding: 10px 20px;
  border-radius: 30px;
  border: none;
  background: ${props => props.active ? props.color : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  font-weight: ${props => props.active ? '600' : '400'};
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .count {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 2px 8px;
    font-size: 12px;
    margin-left: 5px;
  }
`;

const FAQHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #f0f4f8;
  border-radius: 8px 8px 0 0;
`;

const FAQCount = styled.div`
  font-size: 14px;
  color: #666;
`;

const ResetButton = styled.button`
  background: none;
  border: none;
  color: #3182ce;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const FAQList = styled.div`
  background: white;
  border-radius: 0 0 8px 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const FAQItem = styled.div`
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  text-align: left;
  padding: 20px;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  color: #333;
  
  &:hover {
    background: #f9f9f9;
  }
  
  .icon {
    transition: transform 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
    color: #3182ce;
  }
`;

const FAQAnswer = styled.div`
  padding: ${props => props.isOpen ? '0 20px 20px' : '0 20px'};
  color: #666;
  max-height: ${props => props.isOpen ? '1000px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
`;

// FAQ Component
const FAQ = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState(new Set([1]));
  
  // Calculate category counts and percentages
  const totalQuestions = faqData.length;
  const categoryCount = faqData.reduce((acc, faq) => {
    acc[faq.category] = (acc[faq.category] || 0) + 1;
    return acc;
  }, {});
  
  const categoryStats = faqCategories.map(cat => ({
    ...cat,
    count: categoryCount[cat.id] || 0,
    percentage: ((categoryCount[cat.id] || 0) / totalQuestions) * 100
  }));
  
  // Toggle FAQ item open/closed
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
  };
  
  // Filter FAQs based on active category
  const filteredFaqs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory);
    
  return (
    <FAQContainer>
      <FAQContent>
        <SectionTitle isHome={isHome}>FAQ Category Distribution</SectionTitle>
        <CategoryDistribution>
          <CategoryBar>
            {categoryStats.map(cat => (
              <CategorySegment 
                key={cat.id}
                percentage={cat.percentage}
                color={cat.color}
              >
                {cat.icon}
              </CategorySegment>
            ))}
          </CategoryBar>
          
          {categoryStats.map(cat => (
            <CategoryInfo key={cat.id}>
              <CategoryName color={cat.color}>
                {cat.icon} {cat.name}
              </CategoryName>
              <CategoryCount>{cat.count} questions</CategoryCount>
              <CategoryPercent percentage={cat.percentage} color={cat.color} />
              <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                {cat.percentage.toFixed(0)}%
              </div>
            </CategoryInfo>
          ))}
        </CategoryDistribution>
        
        <FilterSection>
          <FilterTitle>Filter by Category</FilterTitle>
          <FilterHint>Select a category to narrow down your search</FilterHint>
          
          <FilterButtons>
            <CategoryButton 
              active={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
              color="#4a5568"
            >
              All Categories
              <span className="count">{totalQuestions}</span>
            </CategoryButton>
            
            {faqCategories.map(category => (
              <CategoryButton 
                key={category.id}
                active={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
                color={category.color}
              >
                {category.icon} {category.name}
                <span className="count">{categoryCount[category.id] || 0}</span>
              </CategoryButton>
            ))}
          </FilterButtons>
        </FilterSection>
        
        <FAQContainer>
          <FAQHeader>
            <FAQCount>
              {filteredFaqs.length} FAQs in {activeCategory === 'all' ? 'All Categories' : faqCategories.find(c => c.id === activeCategory)?.name}
            </FAQCount>
            
            {activeCategory !== 'all' && (
              <ResetButton onClick={resetFilters}>
                <FaChevronDown style={{ transform: 'rotate(90deg)' }} /> Reset
              </ResetButton>
            )}
          </FAQHeader>
          
          <FAQList>
            {filteredFaqs.map(faq => (
              <FAQItem key={faq.id}>
                <FAQQuestion 
                  isOpen={openItems.has(faq.id)}
                  onClick={() => toggleItem(faq.id)}
                >
                  {faq.question}
                  <FaChevronDown className="icon" />
                </FAQQuestion>
                
                <FAQAnswer isOpen={openItems.has(faq.id)}>
                  {faq.answer}
                </FAQAnswer>
              </FAQItem>
            ))}
          </FAQList>
        </FAQContainer>
      </FAQContent>
    </FAQContainer>
  );
};

export default FAQ; 