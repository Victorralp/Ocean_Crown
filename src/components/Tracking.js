import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaShip, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaExchangeAlt,
  FaClock,
  FaFileAlt,
  FaBoxOpen,
  FaClipboardCheck,
  FaTruck,
  FaArrowRight,
  FaFilter,
  FaDownload,
  FaGlobe
} from 'react-icons/fa';

// Color palette - consistent with the rest of the application
const colors = {
  deepBlue: '#003057',
  oceanBlue: '#0077b6',
  lightBlue: '#90e0ef',
  skyBlue: '#e6f2ff',
  coral: '#F6AD55',
  sand: '#f8f9fa',
  white: '#ffffff'
};

// Styled Components
const TrackingPageSection = styled.div`
  width: 100%;
  overflow-x: hidden;
  color: #444;
`;

const HeroSection = styled.div`
  background: linear-gradient(rgba(0, 48, 87, 0.7), rgba(0, 48, 87, 0.7)), 
              url('https://images.unsplash.com/photo-1624138784782-796743af7a6b?q=80&w=1000') no-repeat center center;
  background-size: cover;
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-top: 112px;
`;

const GlassContainer = styled.div`
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 48, 87, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeroContent = styled(GlassContainer)`
  text-align: center;
  z-index: 2;
  position: relative;
  max-width: 800px;
  margin: 0 20px;
`;

const PageTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background-color: ${colors.coral};
    margin: 25px auto 0;
    border-radius: 2px;
  }
`;

const ContentSection = styled.section`
  padding: 80px 0;
  background-color: ${props => props.bgColor || colors.white};
  position: relative;
`;

const TrackingContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 30px;
  margin-top: -60px;
  position: relative;
  z-index: 10;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 25px;
`;

const Tab = styled.button`
  padding: 12px 20px;
  background: transparent;
  border: none;
  border-bottom: 3px solid ${props => props.active ? colors.coral : 'transparent'};
  color: ${props => props.active ? colors.deepBlue : '#777'};
  font-weight: ${props => props.active ? '600' : '400'};
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${colors.deepBlue};
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 20px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #333;
  font-size: 15px;
  cursor: pointer;

  input[type="radio"] {
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid #ccc;
    border-radius: 50%;
    margin: 0;
    cursor: pointer;
    position: relative;
    
    &:checked {
      border-color: ${colors.coral};
      
      &:after {
        content: '';
        position: absolute;
        top: 3px;
        left: 3px;
        width: 8px;
        height: 8px;
        background: ${colors.coral};
        border-radius: 50%;
      }
    }
  }
`;

const SearchForm = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const SearchInputContainer = styled.div`
  position: relative;
  flex: 1;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
  font-size: 16px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 20px 15px 45px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 15px;
  color: #333;
  background: #f9f9f9;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: ${colors.oceanBlue};
    background: #fff;
  }
`;

const SearchButton = styled.button`
  padding: 0 30px;
  background: ${colors.coral};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #ed8936;
  }
`;

const InfoText = styled.p`
  margin-top: 15px;
  color: #777;
  font-size: 14px;
`;

const TrackingResultsContainer = styled.div`
  margin-top: 40px;
`;

const TrackingHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const TrackingTitle = styled.h2`
  font-size: 1.8rem;
  color: ${colors.deepBlue};
  font-weight: 600;
`;

const TrackingActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  background: ${props => props.primary ? colors.oceanBlue : colors.white};
  color: ${props => props.primary ? colors.white : colors.deepBlue};
  border: 1px solid ${props => props.primary ? colors.oceanBlue : '#e0e0e0'};
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.primary ? colors.deepBlue : colors.skyBlue};
  }
`;

const ShipmentOverview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  background: ${colors.skyBlue};
  padding: 25px;
  border-radius: 8px;
`;

const ShipmentDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.span`
  font-size: 12px;
  color: #777;
  margin-bottom: 5px;
`;

const DetailValue = styled.span`
  font-size: 16px;
  color: ${colors.deepBlue};
  font-weight: 500;
`;

const TrackingTimeline = styled.div`
  margin-top: 40px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 20px;
    width: 2px;
    background: #e0e0e0;
  }
`;

const TimelineEvent = styled.div`
  display: flex;
  padding: 20px 0;
  position: relative;
`;

const EventIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.isActive ? colors.coral : colors.white};
  border: 2px solid ${props => props.isActive ? colors.coral : '#e0e0e0'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  z-index: 1;
  color: ${props => props.isActive ? colors.white : '#aaa'};
`;

const EventContent = styled.div`
  flex: 1;
`;

const EventDate = styled.div`
  font-size: 14px;
  color: #777;
  margin-bottom: 5px;
`;

const EventTitle = styled.div`
  font-size: 16px;
  color: ${props => props.isActive ? colors.deepBlue : '#333'};
  font-weight: ${props => props.isActive ? '600' : '400'};
  margin-bottom: 5px;
`;

const EventLocation = styled.div`
  font-size: 14px;
  color: #555;
`;

const MapSection = styled.div`
  margin-top: 50px;
`;

const MapContainer = styled.div`
  height: 400px;
  background: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MapPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #777;
  
  svg {
    font-size: 40px;
    margin-bottom: 15px;
    color: ${colors.oceanBlue};
  }
`;

const AdditionalInfoSection = styled.div`
  margin-top: 60px;
`;

const InfoCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const InfoCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 48, 87, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const CardIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: ${colors.skyBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  
  svg {
    font-size: 22px;
    color: ${colors.oceanBlue};
  }
`;

const CardTitle = styled.h3`
  font-size: 18px;
  color: ${colors.deepBlue};
  margin: 0;
`;

const CardContent = styled.div`
  color: #555;
  line-height: 1.6;
  
  p {
    margin: 0 0 15px 0;
  }
  
  a {
    color: ${colors.oceanBlue};
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    
    svg {
      margin-left: 5px;
      font-size: 12px;
    }
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Tracking = () => {
  const [activeTab, setActiveTab] = useState('tracking');
  const [trackingType, setTrackingType] = useState('container');
  const [searchValue, setSearchValue] = useState('');
  const [showResults, setShowResults] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      setShowResults(true);
    }
  };
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowResults(false);
  };
  
  const handleTrackingTypeChange = (type) => {
    setTrackingType(type);
    setShowResults(false);
  };
  
  return (
    <TrackingPageSection>
      <HeroSection>
        <HeroContent>
          <PageTitle>Shipment Tracking</PageTitle>
          <Subtitle>
            Real-time visibility of your cargo throughout the entire shipping journey
          </Subtitle>
        </HeroContent>
      </HeroSection>
      
      <Container>
        <TrackingContainer>
          <TabContainer>
            <Tab 
              active={activeTab === 'tracking'} 
              onClick={() => handleTabChange('tracking')}
            >
              Tracking
            </Tab>
            <Tab 
              active={activeTab === 'schedules'} 
              onClick={() => handleTabChange('schedules')}
            >
              Schedules
            </Tab>
            <Tab 
              active={activeTab === 'quotes'} 
              onClick={() => handleTabChange('quotes')}
            >
              Get Quote
            </Tab>
          </TabContainer>
          
          <RadioGroup>
            <RadioLabel>
              <input 
                type="radio" 
                name="trackingType" 
                checked={trackingType === 'container'} 
                onChange={() => handleTrackingTypeChange('container')}
              />
              Container / Bill of Lading Number
            </RadioLabel>
            <RadioLabel>
              <input 
                type="radio" 
                name="trackingType" 
                checked={trackingType === 'booking'} 
                onChange={() => handleTrackingTypeChange('booking')}
              />
              Booking Number
            </RadioLabel>
          </RadioGroup>
          
          <form onSubmit={handleSearch}>
            <SearchForm>
              <SearchInputContainer>
                <SearchIcon>
                  <FaSearch />
                </SearchIcon>
                <SearchInput 
                  type="text" 
                  placeholder={trackingType === 'container' ? "Enter container or bill of lading number" : "Enter booking number"} 
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </SearchInputContainer>
              <SearchButton type="submit">Track</SearchButton>
            </SearchForm>
          </form>
          
          <InfoText>
            Enter a {trackingType === 'container' ? 'container or bill of lading' : 'booking'} number to track your shipment. 
            For multiple tracking numbers, separate with commas.
          </InfoText>
        </TrackingContainer>
      </Container>
      
      {showResults && (
        <ContentSection>
          <Container>
            <TrackingResultsContainer>
              <TrackingHeader>
                <TrackingTitle>
                  Tracking Results for: <span style={{ color: colors.coral }}>MEDU3322889</span>
                </TrackingTitle>
                <TrackingActions>
                  <ActionButton>
                    <FaFilter />
                    Filter
                  </ActionButton>
                  <ActionButton primary>
                    <FaDownload />
                    Export
                  </ActionButton>
                </TrackingActions>
              </TrackingHeader>
              
              <ShipmentOverview>
                <ShipmentDetail>
                  <DetailLabel>Container Number</DetailLabel>
                  <DetailValue>MEDU3322889</DetailValue>
                </ShipmentDetail>
                <ShipmentDetail>
                  <DetailLabel>Bill of Lading</DetailLabel>
                  <DetailValue>OCN78612345</DetailValue>
                </ShipmentDetail>
                <ShipmentDetail>
                  <DetailLabel>Vessel</DetailLabel>
                  <DetailValue>MSC Elizabeth</DetailValue>
                </ShipmentDetail>
                <ShipmentDetail>
                  <DetailLabel>Voyage</DetailLabel>
                  <DetailValue>WA344E</DetailValue>
                </ShipmentDetail>
                <ShipmentDetail>
                  <DetailLabel>Status</DetailLabel>
                  <DetailValue style={{ color: '#22c55e' }}>In Transit</DetailValue>
                </ShipmentDetail>
                <ShipmentDetail>
                  <DetailLabel>ETD</DetailLabel>
                  <DetailValue>Apr 20, 2023</DetailValue>
                </ShipmentDetail>
                <ShipmentDetail>
                  <DetailLabel>ETA</DetailLabel>
                  <DetailValue>May 12, 2023</DetailValue>
                </ShipmentDetail>
                <ShipmentDetail>
                  <DetailLabel>Route</DetailLabel>
                  <DetailValue>Lagos → Rotterdam</DetailValue>
                </ShipmentDetail>
              </ShipmentOverview>
              
              <TrackingTimeline>
                <TimelineEvent>
                  <EventIcon isActive={true}>
                    <FaShip />
                  </EventIcon>
                  <EventContent>
                    <EventDate>May 1, 2023 • 14:22 GMT</EventDate>
                    <EventTitle isActive={true}>Vessel Departed</EventTitle>
                    <EventLocation>Port of Lagos, Nigeria</EventLocation>
                  </EventContent>
                </TimelineEvent>
                
                <TimelineEvent>
                  <EventIcon isActive={true}>
                    <FaBoxOpen />
                  </EventIcon>
                  <EventContent>
                    <EventDate>Apr 28, 2023 • 09:15 GMT</EventDate>
                    <EventTitle isActive={true}>Container Loaded on Vessel</EventTitle>
                    <EventLocation>Port of Lagos, Nigeria</EventLocation>
                  </EventContent>
                </TimelineEvent>
                
                <TimelineEvent>
                  <EventIcon isActive={true}>
                    <FaClipboardCheck />
                  </EventIcon>
                  <EventContent>
                    <EventDate>Apr 26, 2023 • 11:40 GMT</EventDate>
                    <EventTitle isActive={true}>Customs Clearance Completed</EventTitle>
                    <EventLocation>Lagos Customs Zone, Nigeria</EventLocation>
                  </EventContent>
                </TimelineEvent>
                
                <TimelineEvent>
                  <EventIcon isActive={true}>
                    <FaTruck />
                  </EventIcon>
                  <EventContent>
                    <EventDate>Apr 24, 2023 • 08:30 GMT</EventDate>
                    <EventTitle isActive={true}>Delivered to Port Terminal</EventTitle>
                    <EventLocation>Lagos Port Complex, Nigeria</EventLocation>
                  </EventContent>
                </TimelineEvent>
                
                <TimelineEvent>
                  <EventIcon isActive={true}>
                    <FaFileAlt />
                  </EventIcon>
                  <EventContent>
                    <EventDate>Apr 20, 2023 • 14:55 GMT</EventDate>
                    <EventTitle isActive={true}>Booking Confirmed</EventTitle>
                    <EventLocation>Ocean Crown Logistics, Lagos</EventLocation>
                  </EventContent>
                </TimelineEvent>
              </TrackingTimeline>
              
              <MapSection>
                <TrackingTitle style={{ marginBottom: '20px' }}>Shipment Route</TrackingTitle>
                <MapContainer>
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000" alt="Shipment Route Map" />
                  <MapPlaceholder>
                    <FaMapMarkerAlt />
                    <p>Interactive map loading...</p>
                  </MapPlaceholder>
                </MapContainer>
              </MapSection>
              
              <AdditionalInfoSection>
                <TrackingTitle style={{ marginBottom: '20px' }}>Additional Information</TrackingTitle>
                <InfoCards>
                  <InfoCard>
                    <CardHeader>
                      <CardIcon>
                        <FaFileAlt />
                      </CardIcon>
                      <CardTitle>Documentation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Access all shipping documents related to this shipment, including bill of lading, commercial invoice, and customs documentation.</p>
                      <a href="#">View Documents <FaArrowRight /></a>
                    </CardContent>
                  </InfoCard>
                  
                  <InfoCard>
                    <CardHeader>
                      <CardIcon>
                        <FaExchangeAlt />
                      </CardIcon>
                      <CardTitle>Transport Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>View detailed information about the vessel, route, and intermodal connections for your shipment.</p>
                      <a href="#">View Transport Details <FaArrowRight /></a>
                    </CardContent>
                  </InfoCard>
                  
                  <InfoCard>
                    <CardHeader>
                      <CardIcon>
                        <FaClock />
                      </CardIcon>
                      <CardTitle>Estimated Delays</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Currently, there are no known delays affecting this shipment. The vessel is on schedule to arrive at the destination port on May 12, 2023.</p>
                      <a href="#">View Schedule Reliability <FaArrowRight /></a>
                    </CardContent>
                  </InfoCard>
                </InfoCards>
              </AdditionalInfoSection>
            </TrackingResultsContainer>
          </Container>
        </ContentSection>
      )}
      
      <ContentSection bgColor={colors.sand}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TrackingTitle style={{ textAlign: 'center', marginBottom: '30px' }}>
              Tracking Features
            </TrackingTitle>
            <InfoCards>
              <InfoCard>
                <CardHeader>
                  <CardIcon>
                    <FaMapMarkerAlt />
                  </CardIcon>
                  <CardTitle>Real-Time Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Monitor your shipments with real-time status updates at every key milestone in the shipping journey, from booking confirmation to final delivery.</p>
                </CardContent>
              </InfoCard>
              
              <InfoCard>
                <CardHeader>
                  <CardIcon>
                    <FaGlobe />
                  </CardIcon>
                  <CardTitle>Global Visibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Track shipments across multiple carriers, routes, and transportation modes with our comprehensive global tracking system.</p>
                </CardContent>
              </InfoCard>
              
              <InfoCard>
                <CardHeader>
                  <CardIcon>
                    <FaCalendarAlt />
                  </CardIcon>
                  <CardTitle>Event History</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Access a detailed chronological record of all logistics events for complete transparency and documentation of your shipment's journey.</p>
                </CardContent>
              </InfoCard>
              
              <InfoCard>
                <CardHeader>
                  <CardIcon>
                    <FaDownload />
                  </CardIcon>
                  <CardTitle>Data Export</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Export tracking data in multiple formats for reporting, analysis, or integration with your own systems and processes.</p>
                </CardContent>
              </InfoCard>
            </InfoCards>
          </motion.div>
        </Container>
      </ContentSection>
    </TrackingPageSection>
  );
};

export default Tracking; 