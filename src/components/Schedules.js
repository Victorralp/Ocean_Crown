import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaSearch, FaShip, FaExchangeAlt, FaCalendarAlt, FaArrowRight, FaAnchor } from 'react-icons/fa';
import { BiFilterAlt } from 'react-icons/bi';
import { MdAccessTime, MdSailing } from 'react-icons/md';
import { BsClockHistory } from 'react-icons/bs';
import { TbAnchor, TbRoute } from 'react-icons/tb';

// Color palette
const colors = {
  primary: '#0047AB',
  secondary: '#00BFFF',
  accent: '#007FFF',
  dark: '#003366',
  light: '#E6F2FF',
  white: '#FFFFFF',
  grey: '#F5F5F5',
  darkGrey: '#333333',
  lightGrey: '#EEEEEE',
  success: '#28a745',
};

// Styled Components
const SchedulesPageSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;
`;

const HeroSection = styled.div`
  width: 100%;
  height: 350px;
  background-image: linear-gradient(to right, rgba(0, 71, 171, 0.8), rgba(0, 127, 255, 0.7)), 
    url('/images/ocean-vessel.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  margin-bottom: 40px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  max-width: 800px;
  line-height: 1.5;
`;

const SearchContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: -60px auto 40px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 30px;
  z-index: 10;
  position: relative;
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  color: ${colors.darkGrey};

  svg {
    margin-right: 8px;
    color: ${colors.primary};
  }
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 71, 171, 0.2);
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  background-color: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 71, 171, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 28px;
`;

const FilterButton = styled.button`
  padding: 12px 20px;
  background-color: ${colors.light};
  color: ${colors.primary};
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;

  svg {
    margin-right: 8px;
  }

  &:hover {
    background-color: ${colors.lightGrey};
  }
`;

const SearchButton = styled.button`
  padding: 12px 30px;
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  flex-grow: 1;

  svg {
    margin-right: 10px;
  }

  &:hover {
    background-color: ${colors.dark};
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 30px;
  color: ${colors.darkGrey};
  text-align: center;
  position: relative;
  padding-bottom: 15px;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: ${colors.primary};
  }
`;

const RecentSearches = styled.div`
  margin-top: 20px;
`;

const RecentSearchTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  color: ${colors.darkGrey};
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
    color: ${colors.primary};
  }
`;

const RecentSearchList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const RecentSearchItem = styled.button`
  padding: 8px 16px;
  background-color: ${colors.light};
  color: ${colors.primary};
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.secondary};
    color: white;
  }
`;

const ResultsSection = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto 40px;
  display: ${props => props.visible ? 'block' : 'none'};
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ResultsCount = styled.p`
  font-size: 16px;
  color: ${colors.darkGrey};
  font-weight: 500;
`;

const SortSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
`;

const ScheduleTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  overflow: hidden;
`;

const TableHeader = styled.thead`
  background-color: ${colors.primary};
  color: white;
`;

const Th = styled.th`
  padding: 16px;
  text-align: left;
  font-weight: 600;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: ${colors.light};
  }

  &:hover {
    background-color: ${colors.lightGrey};
  }
`;

const Td = styled.td`
  padding: 16px;
  border-top: 1px solid #eee;
`;

const ServiceName = styled.div`
  font-weight: 600;
  color: ${colors.primary};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RouteDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const RouteItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
`;

const PortName = styled.span`
  font-weight: 500;
`;

const Date = styled.span`
  color: #666;
  font-size: 13px;
`;

const TransitTime = styled.div`
  padding: 6px 12px;
  background-color: ${colors.success};
  color: white;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const PaginationButton = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.active ? colors.primary : 'white'};
  color: ${props => props.active ? 'white' : colors.darkGrey};
  border: 1px solid ${props => props.active ? colors.primary : '#ddd'};
  border-radius: ${props => props.left ? '4px 0 0 4px' : props.right ? '0 4px 4px 0' : '0'};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.active ? colors.primary : colors.light};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const InfoSection = styled.div`
  background-color: ${colors.light};
  padding: 60px 0;
  width: 100%;
`;

const InfoContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const InfoTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 40px;
  color: ${colors.darkGrey};
  text-align: center;
`;

const InfoCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const InfoCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 30px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  background-color: ${colors.light};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  svg {
    font-size: 28px;
    color: ${colors.primary};
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: ${colors.darkGrey};
`;

const CardText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #666;
`;

// Schedules Component
const Schedules = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    setShowResults(true);
    // In a real app, we would make an API call here to fetch actual schedules
  };

  // Sample recent searches
  const recentSearches = [
    'Lagos to Rotterdam', 
    'Port Harcourt to Singapore', 
    'Lagos to Tema', 
    'Apapa to Shanghai'
  ];

  // Sample schedule results (would come from API in real app)
  const scheduleResults = [
    {
      id: 1,
      serviceName: 'West Africa Express',
      vessel: 'Ocean Crown Voyager',
      origin: 'Lagos',
      originDate: '2025-05-10',
      destination: 'Rotterdam',
      destinationDate: '2025-05-24',
      transitTime: '14 days',
    },
    {
      id: 2,
      serviceName: 'Africa-Europe Line',
      vessel: 'MSC Leanne',
      origin: 'Lagos',
      originDate: '2025-05-12',
      destination: 'Rotterdam',
      destinationDate: '2025-05-28',
      transitTime: '16 days',
    },
    {
      id: 3,
      serviceName: 'Gulf of Guinea Service',
      vessel: 'Maersk Kotka',
      origin: 'Lagos',
      originDate: '2025-05-15',
      destination: 'Rotterdam',
      destinationDate: '2025-05-31',
      transitTime: '16 days',
    },
    {
      id: 4,
      serviceName: 'West Africa Connect',
      vessel: 'CMA CGM Africa Four',
      origin: 'Lagos',
      originDate: '2025-05-18',
      destination: 'Rotterdam',
      destinationDate: '2025-06-01',
      transitTime: '14 days',
    },
  ];

  return (
    <SchedulesPageSection>
      <HeroSection>
        <Container>
          <HeroTitle>Sailing Schedules</HeroTitle>
          <HeroSubtitle>
            Find the perfect shipping solution with our comprehensive schedule search.
            Plan your cargo transportation with Ocean Crown's reliable services.
          </HeroSubtitle>
        </Container>
      </HeroSection>

      <Container>
        <SearchContainer>
          <SearchForm onSubmit={handleSearch}>
            <FormGroup>
              <Label><FaAnchor /> Origin</Label>
              <Input 
                type="text" 
                placeholder="e.g. Lagos" 
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label><FaAnchor /> Destination</Label>
              <Input 
                type="text" 
                placeholder="e.g. Rotterdam" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label><FaCalendarAlt /> Departure Date</Label>
              <Input 
                type="date" 
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label><MdSailing /> Service Type</Label>
              <Select>
                <option value="all">All Services</option>
                <option value="direct">Direct Services</option>
                <option value="transshipment">Transshipment</option>
                <option value="express">Express Services</option>
              </Select>
            </FormGroup>
            <ButtonGroup>
              <FilterButton type="button">
                <BiFilterAlt /> Filters
              </FilterButton>
              <SearchButton type="submit">
                <FaSearch /> Search Schedules
              </SearchButton>
            </ButtonGroup>
          </SearchForm>

          <RecentSearches>
            <RecentSearchTitle>
              <BsClockHistory /> Recent Searches
            </RecentSearchTitle>
            <RecentSearchList>
              {recentSearches.map((search, index) => (
                <RecentSearchItem key={index} onClick={() => {
                  const [orig, dest] = search.split(' to ');
                  setOrigin(orig);
                  setDestination(dest);
                  setShowResults(true);
                }}>
                  {search}
                </RecentSearchItem>
              ))}
            </RecentSearchList>
          </RecentSearches>
        </SearchContainer>

        <ResultsSection visible={showResults}>
          <SectionTitle>Available Sailings</SectionTitle>
          
          <ResultsHeader>
            <ResultsCount>4 sailings found</ResultsCount>
            <SortSelect>
              <option value="departure">Sort by Departure Date</option>
              <option value="arrival">Sort by Arrival Date</option>
              <option value="transit">Sort by Transit Time</option>
            </SortSelect>
          </ResultsHeader>

          <ScheduleTable>
            <TableHeader>
              <tr>
                <Th>Service</Th>
                <Th>Route Details</Th>
                <Th>Transit Time</Th>
              </tr>
            </TableHeader>
            <tbody>
              {scheduleResults.map((schedule) => (
                <Tr key={schedule.id}>
                  <Td>
                    <ServiceName>
                      <FaShip />
                      {schedule.serviceName}
                    </ServiceName>
                    <div style={{ fontSize: '14px', marginTop: '8px', color: '#666' }}>
                      {schedule.vessel}
                    </div>
                  </Td>
                  <Td>
                    <RouteDetails>
                      <RouteItem>
                        <FaAnchor size={14} color={colors.primary} />
                        <PortName>{schedule.origin}</PortName>
                        <Date>{new Date(schedule.originDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</Date>
                      </RouteItem>
                      <div style={{ marginLeft: '10px', color: colors.primary }}>
                        <FaArrowRight size={12} />
                      </div>
                      <RouteItem>
                        <FaAnchor size={14} color={colors.primary} />
                        <PortName>{schedule.destination}</PortName>
                        <Date>{new Date(schedule.destinationDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</Date>
                      </RouteItem>
                    </RouteDetails>
                  </Td>
                  <Td>
                    <TransitTime>
                      <MdAccessTime />
                      {schedule.transitTime}
                    </TransitTime>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </ScheduleTable>

          <PaginationContainer>
            <PaginationButton disabled left>Previous</PaginationButton>
            <PaginationButton active>1</PaginationButton>
            <PaginationButton>2</PaginationButton>
            <PaginationButton>3</PaginationButton>
            <PaginationButton right>Next</PaginationButton>
          </PaginationContainer>
        </ResultsSection>
      </Container>

      <InfoSection>
        <InfoContainer>
          <InfoTitle>Our Shipping Services</InfoTitle>
          <InfoCards>
            <InfoCard>
              <IconContainer>
                <TbRoute />
              </IconContainer>
              <CardTitle>Weekly Departures</CardTitle>
              <CardText>
                Benefit from our frequent weekly departures between major ports in West Africa and key destinations worldwide. 
                Reliable scheduling helps you plan your supply chain with confidence.
              </CardText>
            </InfoCard>
            <InfoCard>
              <IconContainer>
                <FaExchangeAlt />
              </IconContainer>
              <CardTitle>Transshipment Options</CardTitle>
              <CardText>
                Access a vast network of destinations through our strategic transshipment hubs. 
                Connect to ports without direct services and optimize your shipping routes.
              </CardText>
            </InfoCard>
            <InfoCard>
              <IconContainer>
                <MdAccessTime />
              </IconContainer>
              <CardTitle>Express Services</CardTitle>
              <CardText>
                Choose our express services for time-sensitive cargo. Faster transit times and 
                prioritized handling ensure your goods reach their destination as quickly as possible.
              </CardText>
            </InfoCard>
          </InfoCards>
        </InfoContainer>
      </InfoSection>
    </SchedulesPageSection>
  );
};

export default Schedules; 