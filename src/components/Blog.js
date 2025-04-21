import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { 
  FaCalendarAlt, FaUser, FaClock, FaSearch, 
  FaComment, FaArrowRight 
} from 'react-icons/fa';
import { blogPosts } from '../data/blogData';

const BlogSection = styled.section`
  padding: 120px 0 80px;
  background-color: #f9f9f9;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const PageTitle = styled.h1`
  font-size: 42px;
  color: #0c2340;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const PageSubtitle = styled.p`
  font-size: 18px;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
`;

const BlogPost = styled.article`
  display: grid;
  grid-template-columns: 300px 1fr;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PostImage = styled.div`
  height: 100%;
  min-height: 220px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
  
  @media (max-width: 768px) {
    height: 200px;
  }
`;

const CategoryBadge = styled(Link)`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #05a0e8;
  color: white;
  padding: 6px 14px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  
  &:hover {
    background-color: #0c2340;
  }
`;

const PostContent = styled.div`
  padding: 25px;
`;

const PostTitle = styled.h2`
  font-size: 24px;
  color: #0c2340;
  margin-bottom: 15px;
  
  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: #05a0e8;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const PostMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
  color: #777;
  font-size: 14px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      color: #05a0e8;
    }
  }
`;

const Excerpt = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: #555;
  margin-bottom: 25px;
`;

const ReadMoreLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #05a0e8;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
  flex-wrap: wrap;
  gap: 20px;
`;

const FilterLabel = styled.span`
  font-size: 15px;
  color: #666;
  margin-right: 10px;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: white;
  font-size: 15px;
  color: #333;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #05a0e8;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 50px;
`;

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;
  background-color: ${props => props.active ? '#05a0e8' : 'white'};
  color: ${props => props.active ? 'white' : '#555'};
  border: ${props => props.active ? 'none' : '1px solid #e0e0e0'};
  
  &:hover {
    background-color: ${props => props.active ? '#05a0e8' : '#f5f5f5'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Sidebar components
const Sidebar = styled.div`
  @media (max-width: 992px) {
    order: 1;
  }
`;

const SidebarWidget = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const WidgetTitle = styled.h3`
  font-size: 20px;
  color: #0c2340;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
  font-weight: 600;
`;

const SearchBox = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  padding-right: 50px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 15px;
  
  &:focus {
    outline: none;
    border-color: #05a0e8;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 50px;
  background-color: transparent;
  border: none;
  color: #05a0e8;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CategoryLink = styled(Link)`
  padding: 10px 15px;
  background-color: #f5f5f5;
  color: #555;
  border-radius: 4px;
  font-size: 15px;
  text-decoration: none;
  transition: all 0.2s ease;
  display: flex;
  justify-content: space-between;
  
  &:hover {
    background-color: #05a0e8;
    color: white;
  }
  
  &.active {
    background-color: #05a0e8;
    color: white;
  }
`;

const CategoryCount = styled.span`
  background-color: white;
  color: #555;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
`;

const RecentPostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const RecentPost = styled(Link)`
  display: flex;
  gap: 15px;
  text-decoration: none;
  
  &:hover h4 {
    color: #05a0e8;
  }
`;

const RecentPostImage = styled.div`
  width: 80px;
  height: 60px;
  border-radius: 4px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`;

const RecentPostContent = styled.div`
  flex: 1;
`;

const RecentPostTitle = styled.h4`
  font-size: 15px;
  color: #0c2340;
  margin: 0 0 6px 0;
  line-height: 1.4;
  transition: color 0.2s ease;
`;

const RecentPostDate = styled.div`
  font-size: 12px;
  color: #888;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const TagCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Tag = styled(Link)`
  padding: 6px 12px;
  background-color: #f5f5f5;
  color: #555;
  border-radius: 20px;
  font-size: 13px;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #05a0e8;
    color: white;
  }
`;

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([...blogPosts]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('newest');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const postsPerPage = 4;
  
  // Get all categories
  const categories = ['all', ...new Set(blogPosts.map(post => post.category))];
  
  // Get category counts
  const categoryCounts = blogPosts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {});
  
  // Filter posts based on search, category, and sorting
  useEffect(() => {
    let result = [...blogPosts];
    
    // Filter by category
    if (categoryFilter !== 'all') {
      result = result.filter(post => post.category === categoryFilter);
    }
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(term) || 
        post.excerpt.toLowerCase().includes(term) ||
        post.author.toLowerCase().includes(term) ||
        post.category.toLowerCase().includes(term)
      );
    }
    
    // Sort posts
    if (sortOption === 'newest') {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOption === 'oldest') {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOption === 'popular') {
      result.sort((a, b) => b.comments - a.comments);
    }
    
    setFilteredPosts(result);
    setCurrentPage(1); // Reset to first page after filtering
  }, [searchTerm, categoryFilter, sortOption]);
  
  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
  // Recent posts (latest 4)
  const recentPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);
  
  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    // Search already handled by the useEffect
  };
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Format author slug for links
  const formatAuthorSlug = (authorName) => {
    return authorName.toLowerCase().replace(/\s+/g, '-');
  };
  
  return (
    <BlogSection>
      <Container>
        <PageHeader>
          <PageTitle>Ocean Crown Blog</PageTitle>
          <PageSubtitle>
            Latest insights, industry trends, and expert perspectives on maritime logistics, 
            shipping innovations, and global trade.
          </PageSubtitle>
        </PageHeader>
        
        <TwoColumnLayout>
          <div>
            <FilterBar>
              <div>
                <FilterLabel>Sort by:</FilterLabel>
                <FilterSelect 
                  value={sortOption} 
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="popular">Most Popular</option>
                </FilterSelect>
              </div>
              
              <div>
                <FilterLabel>Category:</FilterLabel>
                <FilterSelect 
                  value={categoryFilter} 
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </FilterSelect>
              </div>
            </FilterBar>
            
            {filteredPosts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <h2>No posts found</h2>
                <p>Try adjusting your search or browse other categories.</p>
              </div>
            ) : (
              <>
                {/* Blog posts */}
                <BlogGrid>
                  {currentPosts.map((post) => (
                    <BlogPost key={post.id}>
                      <PostImage image={post.image}>
                        <CategoryBadge to={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`}>
                          {post.category}
                        </CategoryBadge>
                      </PostImage>
                      <PostContent>
                        <PostTitle>
                          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                        </PostTitle>
                        <PostMeta>
                          <MetaItem>
                            <FaUser />
                            <Link to={`/blog/author/${formatAuthorSlug(post.author)}`}>
                              {post.author}
                            </Link>
                          </MetaItem>
                          <MetaItem>
                            <FaCalendarAlt />
                            {post.date}
                          </MetaItem>
                          <MetaItem>
                            <FaClock />
                            {post.readTime}
                          </MetaItem>
                          <MetaItem>
                            <FaComment />
                            {post.comments} Comments
                          </MetaItem>
                        </PostMeta>
                        <Excerpt>{post.excerpt}</Excerpt>
                        <ReadMoreLink to={`/blog/${post.slug}`}>
                          Read Full Article <FaArrowRight />
                        </ReadMoreLink>
                      </PostContent>
                    </BlogPost>
                  ))}
                </BlogGrid>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination>
                    <PageButton 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      &lt;
                    </PageButton>
                    
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <PageButton
                        key={index}
                        active={currentPage === index + 1}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </PageButton>
                    ))}
                    
                    <PageButton 
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      &gt;
                    </PageButton>
                  </Pagination>
                )}
              </>
            )}
          </div>
          
          {/* Sidebar */}
          <Sidebar>
            <SidebarWidget>
              <WidgetTitle>Search</WidgetTitle>
              <SearchBox>
                <form onSubmit={handleSearch}>
                  <SearchInput 
                    type="text" 
                    placeholder="Search blog posts..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <SearchButton type="submit">
                    <FaSearch />
                  </SearchButton>
                </form>
              </SearchBox>
            </SidebarWidget>
            
            <SidebarWidget>
              <WidgetTitle>Categories</WidgetTitle>
              <CategoryList>
                <CategoryLink 
                  to="/blog"
                  className={categoryFilter === 'all' ? 'active' : ''}
                  onClick={() => setCategoryFilter('all')}
                >
                  All Categories
                  <CategoryCount>{blogPosts.length}</CategoryCount>
                </CategoryLink>
                {Object.entries(categoryCounts).map(([cat, count], index) => (
                  <CategoryLink 
                    key={index} 
                    to={`/blog/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    className={categoryFilter === cat ? 'active' : ''}
                    onClick={() => setCategoryFilter(cat)}
                  >
                    {cat}
                    <CategoryCount>{count}</CategoryCount>
                  </CategoryLink>
                ))}
              </CategoryList>
            </SidebarWidget>
            
            <SidebarWidget>
              <WidgetTitle>Recent Posts</WidgetTitle>
              <RecentPostsList>
                {recentPosts.map(post => (
                  <RecentPost key={post.id} to={`/blog/${post.slug}`}>
                    <RecentPostImage image={post.image} />
                    <RecentPostContent>
                      <RecentPostTitle>{post.title}</RecentPostTitle>
                      <RecentPostDate>
                        <FaCalendarAlt />
                        {post.date}
                      </RecentPostDate>
                    </RecentPostContent>
                  </RecentPost>
                ))}
              </RecentPostsList>
            </SidebarWidget>
            
            <SidebarWidget>
              <WidgetTitle>Popular Tags</WidgetTitle>
              <TagCloud>
                <Tag to="#">Shipping</Tag>
                <Tag to="#">Logistics</Tag>
                <Tag to="#">Maritime</Tag>
                <Tag to="#">Sustainable</Tag>
                <Tag to="#">Digital</Tag>
                <Tag to="#">Container</Tag>
                <Tag to="#">Global Trade</Tag>
                <Tag to="#">Supply Chain</Tag>
                <Tag to="#">Technology</Tag>
                <Tag to="#">Innovation</Tag>
              </TagCloud>
            </SidebarWidget>
          </Sidebar>
        </TwoColumnLayout>
      </Container>
    </BlogSection>
  );
};

export default Blog; 