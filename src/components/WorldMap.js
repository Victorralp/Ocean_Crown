import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix the default icon issue in Leaflet with webpack
// This is needed because webpack handles assets differently
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapSection = styled.section`
  padding: 100px 0;
  background-color: #f7f9fc;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 70px;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  color: #0c2340;
  margin-bottom: 20px;
  font-weight: 700;
`;

const SectionDescription = styled.p`
  font-size: 18px;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const LeafletMapContainer = styled.div`
  width: 100%;
  height: 550px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  .leaflet-container {
    width: 100%;
    height: 100%;
  }
`;

const RegionTabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const RegionTab = styled.button`
  background: ${props => props.active ? '#05a0e8' : 'transparent'};
  color: ${props => props.active ? '#fff' : '#666'};
  border: 2px solid ${props => props.active ? '#05a0e8' : '#ddd'};
  padding: 10px 20px;
  margin: 0 8px 10px;
  border-radius: 30px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#05a0e8' : 'rgba(5, 160, 232, 0.1)'};
    border-color: #05a0e8;
    color: ${props => props.active ? '#fff' : '#05a0e8'};
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 70px;
  flex-wrap: wrap;
  gap: 20px;
`;

const StatItem = styled.div`
  flex: 1;
  min-width: 180px;
  text-align: center;
  padding: 20px 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const StatNumber = styled.div`
  font-size: 42px;
  font-weight: 700;
  color: #05a0e8;
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  font-size: 16px;
  color: #666;
  font-weight: 500;
`;

const WorldMap = () => {
  const [activeRegion, setActiveRegion] = useState('all');
  const [mapCenter, setMapCenter] = useState([20, 0]);
  const [mapZoom, setMapZoom] = useState(2);
  const [map, setMap] = useState(null);

  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'americas', name: 'Americas' },
    { id: 'europe', name: 'Europe' },
    { id: 'asia', name: 'Asia Pacific' },
    { id: 'africa', name: 'Africa & Middle East' }
  ];

  const locations = [
    {
      id: 1,
      name: 'New York',
      address: '175 Water Street, New York, NY 10038, USA',
      phone: '+1 (212) 555-7890',
      email: 'newyork@oceancrown.com',
      position: [40.7028, -74.0111],
      region: 'americas'
    },
    {
      id: 2,
      name: 'Rotterdam',
      address: 'Wilhelminakade 909, 3072 AP Rotterdam, Netherlands',
      phone: '+31 10 555 7890',
      email: 'rotterdam@oceancrown.com',
      position: [51.9070, 4.4822],
      region: 'europe'
    },
    {
      id: 3,
      name: 'Singapore',
      address: '1 Maritime Square, Harbourfront Centre, Singapore 099253',
      phone: '+65 6123 4567',
      email: 'singapore@oceancrown.com',
      position: [1.2657, 103.8200],
      region: 'asia'
    },
    {
      id: 4,
      name: 'Shanghai',
      address: '501 Middle Yincheng Road, Pudong, Shanghai, China',
      phone: '+86 21 5888 7890',
      email: 'shanghai@oceancrown.com',
      position: [31.2304, 121.4737],
      region: 'asia'
    },
    {
      id: 5,
      name: 'Dubai',
      address: 'Jebel Ali Free Zone, Dubai, United Arab Emirates',
      phone: '+971 4 555 7890',
      email: 'dubai@oceancrown.com',
      position: [25.0153, 55.0717],
      region: 'africa'
    },
    {
      id: 6,
      name: 'Hamburg',
      address: 'Am Sandtorkai 41, 20457 Hamburg, Germany',
      phone: '+49 40 555 7890',
      email: 'hamburg@oceancrown.com',
      position: [53.5432, 9.9966],
      region: 'europe'
    },
    {
      id: 7,
      name: 'Los Angeles',
      address: '2050 Harbor Ave, Long Beach, CA 90810, USA',
      phone: '+1 (310) 555-7890',
      email: 'losangeles@oceancrown.com',
      position: [33.7668, -118.2262],
      region: 'americas'
    },
    {
      id: 8,
      name: 'Sydney',
      address: '201 Kent Street, Sydney, NSW 2000, Australia',
      phone: '+61 2 5555 7890',
      email: 'sydney@oceancrown.com',
      position: [-33.8688, 151.2093],
      region: 'asia'
    },
    {
      id: 9,
      name: 'Lagos',
      address: '7/9, Payne Crescent, Apapa, Lagos, Nigeria',
      phone: '+234 90 555 7890',
      email: 'lagos@oceancrown.com',
      position: [6.4579, 3.3606],
      region: 'africa'
    }
  ];

  const stats = [
    { number: '60+', label: 'Countries Served' },
    { number: '120+', label: 'Major Ports' },
    { number: '25+', label: 'Years Experience' },
    { number: '500K+', label: 'TEUs Annually' }
  ];

  useEffect(() => {
    if (map) {
      // Set region-specific view when region changes
      if (activeRegion === 'americas') {
        map.setView([30, -90], 3);
      } else if (activeRegion === 'europe') {
        map.setView([50, 10], 4);
      } else if (activeRegion === 'asia') {
        map.setView([20, 100], 3);
      } else if (activeRegion === 'africa') {
        map.setView([10, 20], 3);
      } else {
        // All regions
        map.setView([20, 0], 2);
      }
    }
  }, [activeRegion, map]);

  const filteredLocations = activeRegion === 'all' 
    ? locations 
    : locations.filter(location => location.region === activeRegion);

  return (
    <MapSection>
      <Container>
        <SectionHeader>
          <SectionTitle>Our Global Network</SectionTitle>
          <SectionDescription>
            Ocean Crown operates worldwide with strategic offices in key locations to provide seamless logistics services across the globe.
          </SectionDescription>
        </SectionHeader>
        
        <RegionTabs>
          {regions.map(region => (
            <RegionTab 
              key={region.id} 
              active={activeRegion === region.id}
              onClick={() => setActiveRegion(region.id)}
            >
              {region.name}
            </RegionTab>
          ))}
        </RegionTabs>
        
        <LeafletMapContainer>
          <MapContainer 
            center={mapCenter} 
            zoom={mapZoom} 
            scrollWheelZoom={true}
            whenCreated={setMap}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredLocations.map(location => (
              <Marker 
                key={location.id} 
                position={location.position}
                icon={customIcon}
              >
                <Popup>
                  <div>
                    <h3 style={{ margin: '0 0 8px 0', color: '#0c2340', fontSize: '16px' }}>{location.name}</h3>
                    <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>{location.address}</p>
                    <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666' }}>
                      <strong style={{ color: '#0c2340' }}>Phone:</strong> {location.phone}
                    </p>
                    <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                      <strong style={{ color: '#0c2340' }}>Email:</strong> {location.email}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </LeafletMapContainer>
        
        <StatsContainer>
          {stats.map((stat, index) => (
            <StatItem key={index}>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatItem>
          ))}
        </StatsContainer>
      </Container>
    </MapSection>
  );
};

export default WorldMap; 