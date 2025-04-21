import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

// Styled Components
const SearchPageContainer = styled.div`
  padding: 140px 20px 60px;
  max-width: 1200px;
  margin: 0 auto;
`;

const SearchHeader = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 32px;
  color: #004080;
  margin-bottom: 10px;
`;

const SearchDescription = styled.p`
  font-size: 16px;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchForm = styled.form`
  display: flex;
  max-width: 700px;
  margin: 40px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 16px 20px;
  font-size: 16px;
  border: none;
  outline: none;
  &::placeholder {
    color: #aaa;
  }
`;

const SearchButton = styled.button`
  background: #00508c;
  color: white;
  border: none;
  padding: 0 30px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
  
  &:hover {
    background: #003b69;
  }
`;

const ResultsContainer = styled.div`
  margin: 20px 0;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 10px;
`;

const ResultCount = styled.div`
  font-size: 16px;
  color: #666;
`;

const FilterToggle = styled.button`
  background: none;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #444;
  
  &:hover {
    background: #f9f9f9;
  }
`;

const FilterPanel = styled.div`
  background: white;
  padding: 20px;
  margin-bottom: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const FilterTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const FilterOptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const FilterGroup = styled.div`
  min-width: 200px;
`;

const FilterGroupTitle = styled.h4`
  font-size: 16px;
  color: #444;
  margin: 0 0 10px 0;
`;

const FilterOption = styled.div`
  margin: 8px 0;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? '#00508c' : 'none'};
  color: ${props => props.active ? 'white' : '#444'};
  border: none;
  padding: 8px 15px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: ${props => props.active ? '#003b69' : '#f9f9f9'};
  }
`;

const ResultsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ResultItem = styled.div`
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ResultTitle = styled.h3`
  font-size: 20px;
  color: #00508c;
  margin: 0 0 10px 0;
`;

const ResultLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const ResultDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 15px 0;
  line-height: 1.5;
`;

const ResultMeta = styled.div`
  display: flex;
  gap: 15px;
  font-size: 12px;
  color: #888;
`;

const ResultTypeTag = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background: ${props => {
    switch(props.type) {
      case 'Service': return '#4c9aff';
      case 'Tool': return '#36b37e';
      case 'Schedule': return '#6554c0';
      case 'Industry': return '#ff5630';
      default: return '#aaaaaa';
    }
  }};
  color: white;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  margin-right: 10px;
`;

const ResultUrl = styled.span`
  color: #666;
  font-size: 12px;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #666;
`;

const NoResultsIcon = styled.div`
  font-size: 40px;
  color: #ccc;
  margin-bottom: 20px;
`;

const NoResultsTitle = styled.h3`
  font-size: 24px;
  color: #444;
  margin: 0 0 10px 0;
`;

const NoResultsText = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0 0 20px 0;
`;

const RelatedSearches = styled.div`
  margin-top: 30px;
`;

const RelatedTitle = styled.h3`
  font-size: 18px;
  color: #444;
  margin: 0 0 15px 0;
`;

const RelatedList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const RelatedItem = styled.button`
  background: #f5f5f5;
  border: none;
  border-radius: 20px;
  padding: 8px 15px;
  font-size: 14px;
  color: #00508c;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #e8f1fb;
  }
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: #00508c;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  padding: 0;
  margin-left: 15px;
  
  &:hover {
    text-decoration: underline;
  }
`;

// Mock search results for demonstration
const mockSearchResults = [
  {
    id: 1,
    title: 'Ocean Freight Services',
    description: 'Our comprehensive ocean freight services connect Nigerian businesses to global markets with reliability and efficiency.',
    type: 'Service',
    url: '/services'
  },
  {
    id: 2,
    title: 'Shipping Schedules',
    description: 'View our shipping schedules to plan your logistics and supply chain operations effectively.',
    type: 'Schedule',
    url: '/schedules'
  },
  {
    id: 3,
    title: 'Sustainability Initiatives',
    description: 'Learn about our commitment to sustainable shipping practices and environmental responsibility.',
    type: 'Sustainability',
    url: '/sustainability'
  },
  {
    id: 4,
    title: 'Container Tracking',
    description: 'Track your shipments in real-time with our advanced container tracking system.',
    type: 'Tool',
    url: '/tracking'
  },
  {
    id: 5,
    title: 'Industry Solutions - Automotive',
    description: 'Specialized logistics solutions for the automotive industry, ensuring timely delivery of parts and vehicles.',
    type: 'Industry',
    url: '/industries'
  },
  {
    id: 6,
    title: 'E-Business Solutions',
    description: 'Digital tools and platforms to streamline your shipping and logistics operations.',
    type: 'Service',
    url: '/ebusiness'
  },
  {
    id: 7,
    title: 'Customs Clearance',
    description: 'Expert assistance with customs documentation and clearance procedures for smooth import/export.',
    type: 'Service',
    url: '/services'
  },
  {
    id: 8,
    title: 'Contact Ocean Crown',
    description: 'Get in touch with our team for personalized logistics solutions and support.',
    type: 'Contact',
    url: '/contact'
  }
];

// Related search suggestions
const relatedSearches = [
  'Container tracking',
  'Shipping rates',
  'Customs clearance',
  'Port schedules',
  'Ocean freight',
  'Sustainability',
  'E-Business solutions',
  'Industry logistics'
];

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredResults, setFilteredResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  // Perform initial search if query parameter exists
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  // Simulate search functionality
  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(searchTerm);
  };
  
  const performSearch = (term) => {
    if (!term.trim()) return;
    
    // Update URL with search term without page reload
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('q', term);
    window.history.pushState({}, '', newUrl);
    
    // Simple search filtering on the mock data
    const results = mockSearchResults.filter(
      item => item.title.toLowerCase().includes(term.toLowerCase()) ||
      item.description.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredResults(results);
    setHasSearched(true);
    
    // Apply any active filter
    if (activeFilter !== 'all') {
      handleFilterChange(activeFilter);
    }
  };

  // Handle related search click
  const handleRelatedSearch = (term) => {
    setSearchTerm(term);
    
    // Trigger search with the new term
    performSearch(term);
  };
  
  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    
    if (filter === 'all') {
      // If 'all' is selected, show all results from the current search
      performSearch(searchTerm);
    } else {
      // Filter the current results by type
      const filtered = mockSearchResults.filter(
        item => item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      ).filter(item => item.type === filter);
      
      setFilteredResults(filtered);
    }
  };

  return (
    <SearchPageContainer>
      <SearchHeader>
        <PageTitle>Search Ocean Crown</PageTitle>
        <SearchDescription>
          Find information about our services, schedules, sustainability initiatives, and more.
        </SearchDescription>
      </SearchHeader>
      
      <SearchForm onSubmit={handleSearch}>
        <SearchInput 
          type="text" 
          placeholder="What are you looking for?" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton type="submit">
          <FaSearch />
        </SearchButton>
        {searchTerm && (
          <ClearButton 
            type="button"
            onClick={() => {
              setSearchTerm('');
              setHasSearched(false);
              setFilteredResults([]);
              
              // Clear URL search param
              const newUrl = new URL(window.location);
              newUrl.searchParams.delete('q');
              window.history.pushState({}, '', newUrl);
            }}
          >
            <FaTimes /> Clear
          </ClearButton>
        )}
      </SearchForm>
      
      {hasSearched && (
        <ResultsContainer>
          <ResultsHeader>
            <ResultCount>{filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} found</ResultCount>
            <FilterToggle onClick={() => setIsFiltering(!isFiltering)}>
              <FaFilter /> Filter results
            </FilterToggle>
          </ResultsHeader>
          
          <FilterPanel isOpen={isFiltering}>
            <FilterHeader>
              <FilterTitle>Filter Results</FilterTitle>
              <CloseButton onClick={() => setIsFiltering(false)}>
                <FaTimes />
              </CloseButton>
            </FilterHeader>
            
            <FilterOptionsContainer>
              <FilterGroup>
                <FilterGroupTitle>Content Type</FilterGroupTitle>
                <FilterOption>
                  <FilterButton 
                    active={activeFilter === 'all'} 
                    onClick={() => handleFilterChange('all')}
                  >
                    All Results
                  </FilterButton>
                </FilterOption>
                <FilterOption>
                  <FilterButton 
                    active={activeFilter === 'Service'} 
                    onClick={() => handleFilterChange('Service')}
                  >
                    Services
                  </FilterButton>
                </FilterOption>
                <FilterOption>
                  <FilterButton 
                    active={activeFilter === 'Tool'} 
                    onClick={() => handleFilterChange('Tool')}
                  >
                    Tools
                  </FilterButton>
                </FilterOption>
                <FilterOption>
                  <FilterButton 
                    active={activeFilter === 'Schedule'} 
                    onClick={() => handleFilterChange('Schedule')}
                  >
                    Schedules
                  </FilterButton>
                </FilterOption>
                <FilterOption>
                  <FilterButton 
                    active={activeFilter === 'Industry'} 
                    onClick={() => handleFilterChange('Industry')}
                  >
                    Industries
                  </FilterButton>
                </FilterOption>
              </FilterGroup>
              
              <FilterGroup>
                <FilterGroupTitle>Sort By</FilterGroupTitle>
                <FilterOption>
                  <FilterButton
                    onClick={() => {
                      const sorted = [...filteredResults].sort((a, b) => 
                        a.title.localeCompare(b.title)
                      );
                      setFilteredResults(sorted);
                    }}
                  >
                    Name (A-Z)
                  </FilterButton>
                </FilterOption>
                <FilterOption>
                  <FilterButton
                    onClick={() => {
                      const sorted = [...filteredResults].sort((a, b) => 
                        b.title.localeCompare(a.title)
                      );
                      setFilteredResults(sorted);
                    }}
                  >
                    Name (Z-A)
                  </FilterButton>
                </FilterOption>
              </FilterGroup>
            </FilterOptionsContainer>
          </FilterPanel>
          
          {filteredResults.length > 0 ? (
            <ResultsList>
              {filteredResults.map(result => (
                <ResultItem key={result.id}>
                  <ResultLink to={result.url}>
                    <ResultTitle>{result.title}</ResultTitle>
                    <ResultDescription>{result.description}</ResultDescription>
                    <ResultMeta>
                      <ResultTypeTag type={result.type}>{result.type}</ResultTypeTag>
                      <ResultUrl>oceancrownlogistics.com{result.url}</ResultUrl>
                    </ResultMeta>
                  </ResultLink>
                </ResultItem>
              ))}
            </ResultsList>
          ) : (
            <NoResults>
              <NoResultsIcon>🔍</NoResultsIcon>
              <NoResultsTitle>No results found</NoResultsTitle>
              <NoResultsText>
                We couldn't find any results for "{searchTerm}". 
                Please try a different search term or browse our related searches below.
              </NoResultsText>
              
              <RelatedSearches>
                <RelatedTitle>You might be interested in</RelatedTitle>
                <RelatedList>
                  {relatedSearches.map((term, index) => (
                    <RelatedItem 
                      key={index}
                      onClick={() => handleRelatedSearch(term)}
                    >
                      {term}
                    </RelatedItem>
                  ))}
                </RelatedList>
              </RelatedSearches>
            </NoResults>
          )}
        </ResultsContainer>
      )}
      
      {!hasSearched && (
        <RelatedSearches>
          <RelatedTitle>Popular searches</RelatedTitle>
          <RelatedList>
            {relatedSearches.map((term, index) => (
              <RelatedItem 
                key={index}
                onClick={() => handleRelatedSearch(term)}
              >
                {term}
              </RelatedItem>
            ))}
          </RelatedList>
        </RelatedSearches>
      )}
    </SearchPageContainer>
  );
};

export default SearchPage; 