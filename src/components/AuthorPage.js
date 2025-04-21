import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { blogPosts, authors } from '../data/blogData';

const AuthorPageContainer = styled.section`
  padding: 120px 0 80px;
  background-color: #f9f9f9;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const AuthorHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 40px;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const AuthorImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #05a0e8;
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.h1`
  font-size: 32px;
  color: #0c2340;
  margin-bottom: 10px;
`;

const AuthorBio = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #555;
  margin-bottom: 15px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  color: #05a0e8;
  font-size: 20px;
  transition: color 0.2s;
  
  &:hover {
    color: #0c2340;
  }
`;

const PageTitle = styled.h2`
  font-size: 24px;
  color: #0c2340;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e0e0e0;
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PostCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const PostImage = styled.div`
  height: 200px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
`;

const PostContent = styled.div`
  padding: 20px;
`;

const PostCategory = styled.div`
  background-color: #05a0e8;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 10px;
`;

const PostTitle = styled.h3`
  font-size: 20px;
  color: #0c2340;
  margin-bottom: 10px;
  
  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      color: #05a0e8;
    }
  }
`;

const PostMeta = styled.div`
  color: #888;
  font-size: 14px;
  margin-bottom: 10px;
`;

const PostExcerpt = styled.p`
  color: #555;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const ReadMore = styled(Link)`
  color: #05a0e8;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  display: inline-block;
  
  &:hover {
    text-decoration: underline;
  }
`;

const AuthorPage = () => {
  const { authorId } = useParams();
  const author = authors[authorId];
  
  if (!author) {
    return (
      <AuthorPageContainer>
        <Container>
          <h1>Author not found</h1>
        </Container>
      </AuthorPageContainer>
    );
  }
  
  const authorPosts = blogPosts.filter(post => post.author === author.name);
  
  return (
    <AuthorPageContainer>
      <Container>
        <AuthorHeader>
          <AuthorImage src={author.image} alt={author.name} />
          <AuthorInfo>
            <AuthorName>{author.name}</AuthorName>
            <AuthorBio>{author.bio}</AuthorBio>
            <SocialLinks>
              <SocialLink href={author.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </SocialLink>
              <SocialLink href={author.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </SocialLink>
              <SocialLink href={author.email}>
                <FaEnvelope />
              </SocialLink>
            </SocialLinks>
          </AuthorInfo>
        </AuthorHeader>
        
        <PageTitle>Articles by {author.name}</PageTitle>
        
        <PostsGrid>
          {authorPosts.map(post => (
            <PostCard key={post.id}>
              <PostImage image={post.image} />
              <PostContent>
                <PostCategory>{post.category}</PostCategory>
                <PostTitle>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </PostTitle>
                <PostMeta>{post.date} • {post.readTime}</PostMeta>
                <PostExcerpt>{post.excerpt}</PostExcerpt>
                <ReadMore to={`/blog/${post.slug}`}>Read More</ReadMore>
              </PostContent>
            </PostCard>
          ))}
        </PostsGrid>
      </Container>
    </AuthorPageContainer>
  );
};

export default AuthorPage; 