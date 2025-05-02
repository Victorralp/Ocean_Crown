import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  width: 100%;
`;

const HeaderImage = styled.div`
  width: 100%;
  height: 320px;
  background: linear-gradient(rgba(12, 35, 64, 0.7), rgba(12, 35, 64, 0.8)), 
              url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80') no-repeat center center;
  background-size: cover;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const HeaderTitle = styled.h1`
  font-size: 48px;
  color: white;
  text-align: center;
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
  margin: 0;
  padding: 0;
`;

const TermsContainer = styled.div`
  max-width: 1100px;
  margin: 50px auto 60px;
  padding: 0 20px;
`;

const PageTitle = styled.h1`
  font-size: 36px;
  color: #0c2340;
  margin-bottom: 30px;
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: #05a0e8;
  }
`;

const LastUpdated = styled.p`
  text-align: center;
  font-style: italic;
  color: #777;
  margin-bottom: 40px;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  color: #0c2340;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  margin-bottom: 20px;
  line-height: 1.7;
  color: #444;
`;

const UnorderedList = styled.ul`
  margin-bottom: 20px;
  padding-left: 20px;
  
  li {
    margin-bottom: 10px;
    line-height: 1.7;
    color: #444;
  }
`;

const OrderedList = styled.ol`
  margin-bottom: 20px;
  padding-left: 20px;
  
  li {
    margin-bottom: 10px;
    line-height: 1.7;
    color: #444;
  }
`;

const ContentImage = styled.div`
  width: 100%;
  height: 250px;
  background-image: url('https://images.unsplash.com/photo-1607703703520-bb638e84caf2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80');
  background-size: cover;
  background-position: center;
  margin: 30px 0;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ImageCaption = styled.p`
  text-align: center;
  font-style: italic;
  color: #666;
  margin-top: -5px;
  margin-bottom: 30px;
  font-size: 14px;
`;

const TermsOfService = () => {
  return (
    <PageWrapper>
      <HeaderImage>
        <HeaderTitle>Terms of Service</HeaderTitle>
      </HeaderImage>
      
      <TermsContainer>
        <LastUpdated>Last Updated: June 15, 2023</LastUpdated>
        
        <Section>
          <Paragraph>
            Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the website operated by Ocean Crown ("us", "we", or "our").
          </Paragraph>
          <Paragraph>
            Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
          </Paragraph>
          <Paragraph>
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
          </Paragraph>
        </Section>
        
        <ContentImage />
        <ImageCaption>Our terms ensure clear understanding between Ocean Crown and our customers.</ImageCaption>
        
        <Section>
          <SectionTitle>1. Services</SectionTitle>
          <Paragraph>
            Ocean Crown provides logistics and freight forwarding services including but not limited to:
          </Paragraph>
          <UnorderedList>
            <li>Ocean freight shipping</li>
            <li>Air freight shipping</li>
            <li>Inland transportation</li>
            <li>Customs clearance</li>
            <li>Warehousing and distribution</li>
            <li>Import and export services</li>
            <li>Logistics consulting</li>
          </UnorderedList>
          <Paragraph>
            The specific services provided by Ocean Crown will be outlined in a separate Service Agreement between Ocean Crown and the customer. These Terms of Service apply to all services provided by Ocean Crown, including the website and online portals.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>2. Quotations and Rates</SectionTitle>
          <OrderedList>
            <li>Rates and quotes provided by Ocean Crown are based on information supplied by the customer and are subject to change if the information provided is inaccurate or incomplete.</li>
            <li>Quotations are valid for 30 days from the date of issue unless stated otherwise.</li>
            <li>Rates are subject to change due to factors beyond our control, including but not limited to fuel surcharges, currency fluctuations, and changes in governmental regulations.</li>
            <li>All rates exclude duties, taxes, and other charges imposed by customs or other governmental authorities, which shall be the responsibility of the customer.</li>
          </OrderedList>
        </Section>
        
        <Section>
          <SectionTitle>3. Customer Responsibilities</SectionTitle>
          <Paragraph>
            The customer is responsible for:
          </Paragraph>
          <OrderedList>
            <li>Providing accurate and complete information regarding shipments, including cargo details, special handling requirements, and destination information.</li>
            <li>Properly packaging, marking, and labeling cargo in accordance with all applicable regulations.</li>
            <li>Ensuring that shipments do not contain prohibited or restricted items.</li>
            <li>Providing all necessary documentation required for customs clearance and international shipping.</li>
            <li>Payment of all charges, including freight, duties, taxes, and any additional fees.</li>
            <li>Inspecting cargo upon delivery and reporting any damage or discrepancies within 48 hours.</li>
          </OrderedList>
        </Section>
        
        <Section>
          <SectionTitle>4. Liability and Insurance</SectionTitle>
          <OrderedList>
            <li>Ocean Crown's liability for loss or damage is limited in accordance with applicable international conventions and national laws governing transport by sea, air, road, or rail.</li>
            <li>Ocean Crown strongly recommends that customers obtain cargo insurance to cover the full value of their shipments.</li>
            <li>Ocean Crown shall not be liable for any consequential, indirect, incidental, or special damages arising from the provision of services, even if Ocean Crown has been advised of the possibility of such damages.</li>
            <li>Claims for loss or damage must be submitted in writing within 14 days of delivery or, in the case of non-delivery, within 90 days from the expected delivery date.</li>
          </OrderedList>
        </Section>
        
        <Section>
          <SectionTitle>5. Force Majeure</SectionTitle>
          <Paragraph>
            Ocean Crown shall not be liable for any failure to perform its obligations due to circumstances beyond its reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, riots, civil unrest, strikes, lockouts, government actions, port congestion, carrier delays, or other events that render performance commercially impracticable.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>6. Payment Terms</SectionTitle>
          <OrderedList>
            <li>Payment is due within 30 days of the invoice date, unless otherwise specified in the Service Agreement.</li>
            <li>Ocean Crown reserves the right to require advance payment or payment upon delivery for new customers or customers with a history of late payments.</li>
            <li>Late payments may be subject to interest charges at a rate of 1.5% per month.</li>
            <li>Ocean Crown reserves the right to withhold delivery of cargo or documents until payment is received in full.</li>
          </OrderedList>
        </Section>
        
        <Section>
          <SectionTitle>7. Website Usage</SectionTitle>
          <OrderedList>
            <li>The content on our website is provided for general information purposes only. While we strive to keep information up to date and accurate, we make no representations or warranties about the completeness, accuracy, reliability, suitability, or availability of the website or the information, products, services, or related graphics contained on the website.</li>
            <li>Users must not attempt to gain unauthorized access to our website, the server on which our website is stored, or any server, computer, or database connected to our website.</li>
            <li>Users must not attack our website via a denial-of-service attack or a distributed denial-of-service attack.</li>
          </OrderedList>
        </Section>
        
        <Section>
          <SectionTitle>8. Intellectual Property</SectionTitle>
          <Paragraph>
            All content on the Ocean Crown website, including text, graphics, logos, images, videos, and software, is the property of Ocean Crown or its content suppliers and is protected by international copyright laws. Unauthorized use of any materials may violate copyright, trademark, and other laws.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>9. Governing Law</SectionTitle>
          <Paragraph>
            These Terms shall be governed by and construed in accordance with the laws of Nigeria, without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Nigeria.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>10. Modifications</SectionTitle>
          <Paragraph>
            Ocean Crown reserves the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>11. Contact Us</SectionTitle>
          <Paragraph>
            If you have any questions about these Terms, please contact us:
          </Paragraph>
          <Paragraph>
            <strong>Email:</strong> info@oceancrown.com<br />
            <strong>Phone:</strong> +234 123 456 7890<br />
            <strong>Address:</strong> 123 Ocean Street, Lagos, Nigeria
          </Paragraph>
        </Section>
      </TermsContainer>
    </PageWrapper>
  );
};

export default TermsOfService; 