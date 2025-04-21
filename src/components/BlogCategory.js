import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { 
  FaCalendarAlt, FaUser, FaClock, FaSearch, 
  FaComment, FaArrowRight 
} from 'react-icons/fa';
import { blogPosts } from '../data/blogData';

const CategorySection = styled.section`
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

const CategoryTitle = styled.h1`
  font-size: 42px;
  color: #0c2340;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Subtitle = styled.p`
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

const BlogCategory = () => {
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState([]);
  
  const postsPerPage = 4;
  
  // Convert URL parameter to display format
  const categoryDisplay = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  // Get all categories
  const categories = [...new Set(blogPosts.map(post => post.category))];
  
  // Get category counts
  const categoryCounts = categories.reduce((acc, category) => {
    acc[category] = blogPosts.filter(post => post.category === category).length;
    return acc;
  }, {});
  
  // Filter and search posts
  useEffect(() => {
    // First filter by category from URL parameter
    let result = blogPosts.filter(
      post => post.category.toLowerCase().replace(/\s+/g, '-') === category
    );
    
    // Then filter by search term if not empty
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(term) || 
        post.excerpt.toLowerCase().includes(term) ||
        post.author.toLowerCase().includes(term)
      );
    }
    
    setFilteredPosts(result);
    setCurrentPage(1); // Reset to first page after filtering
  }, [searchTerm, category]);
  
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
  
  return (
    <CategorySection>
      <Container>
        <PageHeader>
          <CategoryTitle>{categoryDisplay}</CategoryTitle>
          <Subtitle>Articles and insights about {categoryDisplay.toLowerCase()} in maritime logistics and shipping.</Subtitle>
        </PageHeader>
        
        <TwoColumnLayout>
          <div>
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
                            <Link to={`/blog/author/${post.author.toLowerCase().replace(/\s+/g, '-')}`}>
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
                          {post.comments && (
                            <MetaItem>
                              <FaComment />
                              {post.comments} Comments
                            </MetaItem>
                          )}
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
                {categories.map((cat, index) => (
                  <CategoryLink 
                    key={index} 
                    to={`/blog/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    className={cat.toLowerCase().replace(/\s+/g, '-') === category ? 'active' : ''}
                  >
                    {cat}
                    <CategoryCount>{categoryCounts[cat]}</CategoryCount>
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
    </CategorySection>
  );
};

export default BlogCategory; 