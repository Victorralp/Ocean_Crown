import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup, Polyline, ZoomControl } from 'react-leaflet';
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

// Custom marker icons based on region
const createCustomIcon = (color) => {
  return new L.Icon({
    iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
};

const icons = {
  americas: createCustomIcon('red'),
  europe: createCustomIcon('blue'),
  asia: createCustomIcon('green'),
  africa: createCustomIcon('orange'),
  headquarters: createCustomIcon('violet')
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MapSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(to bottom, #f0f8ff, #e6f0f9);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(to right, #05a0e8, #0077cc);
    z-index: 2;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  animation: ${fadeIn} 0.8s ease-out forwards;
`;

const SectionTitle = styled.h2`
  font-size: 42px;
  color: #0c2340;
  margin-bottom: 20px;
  font-weight: 800;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, #F6AD55, #ed8936);
    border-radius: 2px;
    opacity: 1;
  }
`;

const SectionDescription = styled.p`
  font-size: 18px;
  color: #334155;
  max-width: 700px;
  margin: 30px auto 0;
  line-height: 1.7;
`;

const LeafletMapContainer = styled.div`
  width: 100%;
  height: 550px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  position: relative;
  transform: translateY(0);
  transition: all 0.5s ease;
  border: 1px solid rgba(5, 160, 232, 0.1);
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: 0.2s;
  opacity: 0;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(5, 160, 232, 0.2);
  }
  
  .leaflet-container {
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: #cad2d3;
  }
  
  .leaflet-popup-content-wrapper {
    border-radius: 10px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    padding: 0;
    overflow: hidden;
  }
  
  .leaflet-popup-content {
    margin: 0;
    width: 280px !important;
  }
  
  .leaflet-popup-tip {
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  }
`;

const MapOverlay = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 999;
  background: white;
  border-radius: 6px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  max-width: 180px;
  pointer-events: auto;
  
  h3 {
    margin: 0 0 8px 0;
    font-size: 13px;
    color: #0c2340;
  }
  
  p {
    margin: 0;
    font-size: 11px;
    color: #666;
  }
`;

const RegionTabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 12px;
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: 0.1s;
  opacity: 0;
`;

const RegionTab = styled.button`
  background: ${props => props.active ? 'linear-gradient(135deg, #05a0e8, #0077cc)' : 'white'};
  color: ${props => props.active ? '#fff' : '#555'};
  border: none;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.active ? '0 8px 20px rgba(5, 160, 232, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.05)'};
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #05a0e8, #0077cc)' : 'rgba(5, 160, 232, 0.1)'};
    color: ${props => props.active ? '#fff' : '#05a0e8'};
    transform: translateY(-3px);
    box-shadow: ${props => props.active ? '0 12px 24px rgba(5, 160, 232, 0.5)' : '0 8px 20px rgba(5, 160, 232, 0.2)'};
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 70px;
  flex-wrap: wrap;
  gap: 30px;
`;

const StatItem = styled.div`
  flex: 1;
  min-width: 180px;
  text-align: center;
  padding: 30px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  animation: ${slideInRight} 0.6s ease-out forwards;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(5, 160, 232, 0.15);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, #05a0e8, #0077cc);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const StatNumber = styled.div`
  font-size: 46px;
  font-weight: 800;
  color: #05a0e8;
  margin-bottom: 15px;
  background: linear-gradient(135deg, #05a0e8, #0077cc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #555;
  font-weight: 500;
`;

const PopupHeader = styled.div`
  background: #0c2340;
  color: white;
  padding: 12px;
  
  h3 {
    margin: 0;
    font-size: 16px;
  }
  
  p {
    margin: 4px 0 0 0;
    font-size: 11px;
    opacity: 0.8;
  }
`;

const PopupContent = styled.div`
  padding: 12px;
  
  p {
    margin: 0 0 6px;
    font-size: 13px;
    color: #555;
    display: flex;
    align-items: center;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    strong {
      color: #0c2340;
      min-width: 50px;
      margin-right: 4px;
    }
  }
`;

const PopupFooter = styled.div`
  padding: 8px 12px;
  background: #f5f8fa;
  border-top: 1px solid #eee;
  text-align: right;
  
  a {
    display: inline-block;
    padding: 4px 10px;
    background: #05a0e8;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 500;
    transition: all 0.2s ease;
    
    &:hover {
      background: #0c2340;
    }
  }
`;

const KeyLocationsInfo = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  padding: 20px;
  margin-top: 40px;
  
  h3 {
    margin: 0 0 16px;
    color: #0c2340;
    font-size: 18px;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 0;
      width: 40px;
      height: 2px;
      background: #05a0e8;
      border-radius: 2px;
    }
  }
`;

const LocationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
`;

const LocationCard = styled.div`
  padding: 12px;
  border-radius: 6px;
  border-left: 2px solid ${props => props.color || '#05a0e8'};
  transition: all 0.2s ease;
  
  &:hover {
    background: #f5f8fa;
  }
  
  h4 {
    margin: 0 0 6px;
    color: #0c2340;
    font-size: 14px;
  }
  
  p {
    margin: 0;
    font-size: 12px;
    color: #666;
  }
`;

const ZoomNotification = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(12, 35, 64, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 14px;
  z-index: 1000;
  pointer-events: none;
  transition: opacity 0.3s ease;
  opacity: ${props => props.show ? 1 : 0};
`;

// Custom map bounds component to prevent infinite horizontal scrolling
const SetMapBounds = ({ map, bounds }) => {
  useEffect(() => {
    if (map) {
      map.setMaxBounds(bounds);
      map.on('drag', () => {
        map.panInsideBounds(bounds, { animate: false });
      });
    }
  }, [map, bounds]);
  
  return null;
};

const WorldMap = () => {
  const [activeRegion, setActiveRegion] = useState('all');
  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showRoutes, setShowRoutes] = useState(false);
  const [showZoomNotification, setShowZoomNotification] = useState(false);

  // Define map bounds to prevent infinite scrolling horizontally
  const mapBounds = L.latLngBounds(
    L.latLng(-90, -200), // Southwest corner
    L.latLng(90, 200)    // Northeast corner
  );

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
      region: 'americas',
      type: 'Regional HQ',
      isKeyLocation: true
    },
    {
      id: 2,
      name: 'Lagos',
      address: '7/9, Payne Crescent, Apapa, Lagos, Nigeria',
      phone: '+234 90 555 7890',
      email: 'lagos@oceancrown.com',
      position: [6.4579, 3.3606],
      region: 'africa',
      type: 'Global Headquarters',
      isHQ: true,
      isKeyLocation: true
    },
    {
      id: 3,
      name: 'Dubai',
      address: 'Jebel Ali Free Zone, Dubai, United Arab Emirates',
      phone: '+971 4 555 7890',
      email: 'dubai@oceancrown.com',
      position: [25.0153, 55.0717],
      region: 'africa',
      type: 'Regional HQ',
      isKeyLocation: true
    },
    {
      id: 4,
      name: 'Shanghai',
      address: '501 Middle Yincheng Road, Pudong, Shanghai, China',
      phone: '+86 21 5888 7890',
      email: 'shanghai@oceancrown.com',
      position: [31.2304, 121.4737],
      region: 'asia',
      type: 'Office'
    },
    {
      id: 5,
      name: 'Rotterdam',
      address: 'Wilhelminakade 909, 3072 AP Rotterdam, Netherlands',
      phone: '+31 10 555 7890',
      email: 'rotterdam@oceancrown.com',
      position: [51.9070, 4.4822],
      region: 'europe',
      type: 'Office'
    },
    {
      id: 6,
      name: 'Hamburg',
      address: 'Am Sandtorkai 41, 20457 Hamburg, Germany',
      phone: '+49 40 555 7890',
      email: 'hamburg@oceancrown.com',
      position: [53.5432, 9.9966],
      region: 'europe',
      type: 'Office'
    },
    {
      id: 7,
      name: 'Los Angeles',
      address: '2050 Harbor Ave, Long Beach, CA 90810, USA',
      phone: '+1 (310) 555-7890',
      email: 'losangeles@oceancrown.com',
      position: [33.7668, -118.2262],
      region: 'americas',
      type: 'Office'
    },
    {
      id: 8,
      name: 'Sydney',
      address: '201 Kent Street, Sydney, NSW 2000, Australia',
      phone: '+61 2 5555 7890',
      email: 'sydney@oceancrown.com',
      position: [-33.8688, 151.2093],
      region: 'asia',
      type: 'Office'
    },
    {
      id: 9,
      name: 'Singapore',
      address: '1 Maritime Square, Harbourfront Centre, Singapore 099253',
      phone: '+65 6123 4567',
      email: 'singapore@oceancrown.com',
      position: [1.2657, 103.8200],
      region: 'asia',
      type: 'Office'
    },
    {
      id: 10,
      name: 'Mumbai',
      address: 'Nariman Point, Mumbai 400021, India',
      phone: '+91 22 5555 7890',
      email: 'mumbai@oceancrown.com',
      position: [18.9257, 72.8254],
      region: 'asia',
      type: 'Office'
    },
    {
      id: 11,
      name: 'Rio de Janeiro',
      address: 'Av. Rio Branco 115, Centro, Rio de Janeiro, Brazil',
      phone: '+55 21 5555 7890',
      email: 'rio@oceancrown.com',
      position: [-22.9068, -43.1729],
      region: 'americas',
      type: 'Office'
    },
    {
      id: 12,
      name: 'Cape Town',
      address: 'Victoria & Alfred Waterfront, Cape Town, South Africa',
      phone: '+27 21 555 7890',
      email: 'capetown@oceancrown.com',
      position: [-33.9076, 18.4173],
      region: 'africa',
      type: 'Office'
    }
  ];

  // Major shipping routes
  const shippingRoutes = [
    // Transatlantic
    { 
      points: [[40.7028, -74.0111], [51.9070, 4.4822]], 
      name: 'New York - Rotterdam',
      color: '#0066cc',
      weight: 3,
      dashArray: '5, 10'
    },
    // Transpacific
    { 
      points: [[33.7668, -118.2262], [31.2304, 121.4737]], 
      name: 'Los Angeles - Shanghai',
      color: '#cc0000',
      weight: 3,
      dashArray: '5, 10'
    },
    // Europe - Asia
    { 
      points: [[51.9070, 4.4822], [1.2657, 103.8200]], 
      name: 'Rotterdam - Singapore',
      color: '#009900',
      weight: 3,
      dashArray: '5, 10'
    },
    // Middle East - Asia
    { 
      points: [[25.0153, 55.0717], [18.9257, 72.8254]], 
      name: 'Dubai - Mumbai',
      color: '#ff6600',
      weight: 3,
      dashArray: '5, 10'
    },
    // Africa - Europe
    { 
      points: [[6.4579, 3.3606], [53.5432, 9.9966]], 
      name: 'Lagos - Hamburg',
      color: '#9900cc',
      weight: 3,
      dashArray: '5, 10'
    }
  ];

  const stats = [
    { number: '70+', label: 'Countries Served', delay: '0.1s' },
    { number: '100+', label: 'Major Ports', delay: '0.2s' },
    { number: '30+', label: 'Years Experience', delay: '0.3s' }
  ];

  const handleSetRegion = useCallback((regionId) => {
    setActiveRegion(regionId);
    setSelectedLocation(null);
  }, []);

  const handleMarkerClick = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  useEffect(() => {
    if (map) {
      // Set region-specific view when region changes
      if (activeRegion === 'americas') {
        map.setView([25, -90], 3);
      } else if (activeRegion === 'europe') {
        map.setView([50, 10], 4);
      } else if (activeRegion === 'asia') {
        map.setView([20, 100], 3);
      } else if (activeRegion === 'africa') {
        map.setView([15, 20], 3);
      } else {
        // All regions
        map.setView([20, 0], 2);
      }
    }
  }, [activeRegion, map]);

  useEffect(() => {
    if (map) {
      const handleZoomEnd = () => {
        if (map.getZoom() === 6) {
          setShowZoomNotification(true);
          setTimeout(() => setShowZoomNotification(false), 3000);
        }
      };

      map.on('zoomend', handleZoomEnd);
      
      return () => {
        map.off('zoomend', handleZoomEnd);
      };
    }
  }, [map]);

  const filteredLocations = activeRegion === 'all' 
    ? locations 
    : locations.filter(location => location.region === activeRegion);

  const filteredRoutes = activeRegion === 'all' || !showRoutes
    ? shippingRoutes
    : shippingRoutes.filter(route => {
        const startPointLoc = locations.find(loc => 
          loc.position[0] === route.points[0][0] && loc.position[1] === route.points[0][1]);
        const endPointLoc = locations.find(loc => 
          loc.position[0] === route.points[1][0] && loc.position[1] === route.points[1][1]);
        
        return (startPointLoc && startPointLoc.region === activeRegion) || 
               (endPointLoc && endPointLoc.region === activeRegion);
      });

  return (
    <MapSection>
      <Container>
        <SectionHeader>
          <SectionTitle>Our Global Network</SectionTitle>
          <SectionDescription>
            Ocean Crown operates worldwide with strategic offices in key locations to provide seamless logistics services across the globe.
          </SectionDescription>
        </SectionHeader>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <RegionTabs>
          {regions.map(region => (
            <RegionTab 
              key={region.id} 
              active={activeRegion === region.id}
                onClick={() => handleSetRegion(region.id)}
            >
              {region.name}
            </RegionTab>
          ))}
        </RegionTabs>
          
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={showRoutes} 
                onChange={() => setShowRoutes(!showRoutes)}
                style={{ cursor: 'pointer' }}
              />
              <span style={{ fontSize: '14px', color: '#555' }}>Show shipping routes</span>
            </label>
          </div>
        </div>
        
        <LeafletMapContainer>
          <MapContainer 
            center={[20, 0]} 
            zoom={2} 
            scrollWheelZoom={true}
            whenCreated={setMap}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
            minZoom={2}
            maxZoom={6}
            worldCopyJump={true}
            maxBoundsViscosity={1.0}
          >
            {/* Set map bounds to prevent infinite horizontal scrolling */}
            <SetMapBounds map={map} bounds={mapBounds} />
            
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            
            <ZoomControl position="bottomright" />
            
            {/* Display shipping routes */}
            {showRoutes && filteredRoutes.map((route, index) => (
              <Polyline 
                key={index} 
                positions={route.points}
                pathOptions={{
                  color: route.color,
                  weight: route.weight,
                  dashArray: route.dashArray
                }}
              >
                <Popup>
                  <div style={{ padding: '5px 10px' }}>
                    <strong>Route:</strong> {route.name}
                  </div>
                </Popup>
              </Polyline>
            ))}
            
            {filteredLocations.map(location => (
              <Marker 
                key={location.id} 
                position={location.position}
                icon={location.isHQ ? icons.headquarters : icons[location.region]}
                eventHandlers={{
                  click: () => handleMarkerClick(location)
                }}
              >
                <Popup>
                  <PopupHeader>
                    <h3>{location.name}</h3>
                    <p>{location.type}</p>
                  </PopupHeader>
                  <PopupContent>
                    <p>{location.address}</p>
                    <p><strong>Phone:</strong> {location.phone}</p>
                    <p><strong>Email:</strong> {location.email}</p>
                  </PopupContent>
                  <PopupFooter>
                    <a href={`mailto:${location.email}`}>Contact Office</a>
                  </PopupFooter>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          {/* Optional selected location info overlay */}
          {selectedLocation && (
            <MapOverlay>
              <h3>{selectedLocation.name}</h3>
              <p>{selectedLocation.type}</p>
              <p style={{ marginTop: '5px', fontSize: '11px' }}>Click on the marker for more details</p>
            </MapOverlay>
          )}
          
          <ZoomNotification show={showZoomNotification}>
            Maximum zoom level reached
          </ZoomNotification>
        </LeafletMapContainer>
        
        <StatsContainer>
          {stats.map((stat, index) => (
            <StatItem key={index} delay={stat.delay}>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatItem>
          ))}
        </StatsContainer>
        
        <KeyLocationsInfo>
          <h3>Key Locations</h3>
          <LocationGrid>
            {locations
              .filter(loc => loc.isKeyLocation === true)
              .map(location => (
                <LocationCard 
                  key={location.id}
                  color={location.isHQ ? '#6200ea' : icons[location.region] ? '#05a0e8' : '#05a0e8'}
                >
                  <h4>{location.name}</h4>
                  <p>{location.type}</p>
                </LocationCard>
              ))
            }
          </LocationGrid>
        </KeyLocationsInfo>
      </Container>
    </MapSection>
  );
};

export default WorldMap; 