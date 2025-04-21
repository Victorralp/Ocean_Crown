import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// FAQ Data
const faqData = [
  {
    id: 1,
    question: "What shipping services does Ocean Crown offer?",
    answer: "Ocean Crown provides a comprehensive range of shipping services including ocean freight, air freight, land transportation, and project cargo. We specialize in container shipping, bulk cargo, breakbulk, and specialized shipments for various industries."
  },
  {
    id: 2,
    question: "How can I track my shipment?",
    answer: "You can track your shipment through our online tracking portal using your shipment reference number or container number. Alternatively, you can contact our customer service team who will be happy to provide you with real-time updates on your cargo location."
  },
  {
    id: 3,
    question: "What destinations do you serve?",
    answer: "Ocean Crown has a global network covering major ports and logistics hubs across six continents. Our extensive network allows us to deliver seamless shipping solutions worldwide, with particular strength in routes connecting Africa, Europe, Asia, and the Americas."
  },
  {
    id: 4,
    question: "What documentation is required for international shipping?",
    answer: "Required documentation typically includes: commercial invoice, packing list, bill of lading, certificate of origin, and customs declaration forms. Specific requirements may vary depending on the destination country, type of goods, and shipping method. Our documentation team can provide detailed guidance for your specific shipment."
  },
  {
    id: 5,
    question: "How do you handle customs clearance?",
    answer: "Our dedicated customs clearance experts handle all aspects of the import/export process, ensuring your cargo complies with both origin and destination regulatory requirements. We manage documentation, duty payments, inspections, and address any customs challenges to ensure smooth clearance and delivery."
  },
  {
    id: 6,
    question: "What measures do you take for sustainable shipping?",
    answer: "Ocean Crown is committed to environmental sustainability. We implement fuel-efficient routing, use modern vessels with reduced emissions, offer carbon-offset programs, and continuously seek innovative solutions to minimize our environmental footprint while maintaining service quality."
  },
  {
    id: 7,
    question: "Do you offer insurance for shipments?",
    answer: "Yes, we offer comprehensive cargo insurance options to protect your goods against loss, damage, and delay during transit. Our insurance solutions can be tailored to your specific cargo type, value, and risk factors to ensure appropriate coverage."
  },
  {
    id: 8,
    question: "How do you handle special cargo requirements?",
    answer: "We specialize in handling special cargo including temperature-sensitive goods, hazardous materials, oversized equipment, and high-value items. Our team develops customized shipping solutions incorporating specialized containers, monitoring systems, and handling protocols based on your specific cargo requirements."
  }
];

// Single FAQ Item component
const FAQItem = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button 
        className="w-full py-5 px-4 flex justify-between items-center text-left focus:outline-none"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium text-ocean-dark">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-ocean-orange"
        >
          <FaChevronDown />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 text-gray-600">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  // Track open FAQs - we'll use a Set to allow multiple open items
  const [openItems, setOpenItems] = useState(new Set([1])); // Initially open first item
  
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
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ocean-dark mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our shipping and logistics services. 
            If you can't find what you're looking for, please contact our support team.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {faqData.map((faq) => (
            <FAQItem 
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openItems.has(faq.id)}
              toggleOpen={() => toggleItem(faq.id)}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">Still have questions? We're here to help.</p>
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-ocean-orange hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-orange transition-colors duration-200"
          >
            Contact Our Support Team
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 