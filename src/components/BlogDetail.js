import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  FaCalendarAlt, FaUser, FaArrowLeft, FaTags, FaFacebook, 
  FaTwitter, FaLinkedin, FaEnvelope, FaClock, FaComment
} from 'react-icons/fa';
import { blogPosts, comments } from '../data/blogData';

const BlogDetailSection = styled.section`
  padding: 120px 0 80px;
  background-color: #f9f9f9;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ArticleContainer = styled.article`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const BannerImage = styled.div`
  height: 400px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const ArticleContent = styled.div`
  padding: 40px;
  
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const CategoryTag = styled.div`
  background-color: #05a0e8;
  color: white;
  padding: 5px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 20px;
`;

const ArticleTitle = styled.h1`
  font-size: 36px;
  color: #0c2340;
  margin-bottom: 20px;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
  color: #777;
  font-size: 15px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ArticleParagraph = styled.p`
  font-size: 17px;
  line-height: 1.8;
  color: #444;
  margin-bottom: 25px;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #05a0e8;
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 40px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ShareSection = styled.div`
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #f0f0f0;
`;

const ShareTitle = styled.h3`
  font-size: 18px;
  color: #0c2340;
  margin-bottom: 15px;
`;

const ShareButtons = styled.div`
  display: flex;
  gap: 15px;
`;

const ShareButton = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  text-decoration: none;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.9;
  }
`;

const CommentsSection = styled.div`
  margin-top: 50px;
`;

const CommentTitle = styled.h3`
  font-size: 24px;
  color: #0c2340;
  margin-bottom: 25px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
`;

const Comment = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  gap: 20px;
  
  &:last-child {
    border-bottom: none;
  }
`;

const CommentAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f0f0f0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 24px;
`;

const CommentContent = styled.div`
  flex: 1;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const CommentAuthor = styled.h4`
  font-size: 16px;
  color: #0c2340;
  margin: 0;
`;

const CommentDate = styled.div`
  font-size: 14px;
  color: #888;
`;

const CommentText = styled.p`
  font-size: 15px;
  color: #555;
  line-height: 1.6;
  margin: 0;
`;

const CommentForm = styled.form`
  margin-top: 40px;
`;

const FormTitle = styled.h3`
  font-size: 24px;
  color: #0c2340;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 15px;
  
  &:focus {
    outline: none;
    border-color: #05a0e8;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 15px;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #05a0e8;
  }
`;

const SubmitButton = styled.button`
  background-color: #05a0e8;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #0c2340;
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

const RelatedPostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RelatedPost = styled(Link)`
  display: flex;
  gap: 15px;
  text-decoration: none;
  
  &:hover h4 {
    color: #05a0e8;
  }
`;

const RelatedPostImage = styled.div`
  width: 100px;
  height: 70px;
  border-radius: 4px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`;

const RelatedPostContent = styled.div`
  flex: 1;
`;

const RelatedPostTitle = styled.h4`
  font-size: 16px;
  color: #0c2340;
  margin: 0 0 8px 0;
  line-height: 1.4;
  transition: color 0.2s ease;
`;

const RelatedPostMeta = styled.div`
  display: flex;
  gap: 15px;
  color: #888;
  font-size: 13px;
`;

const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const CategoryBadge = styled(Link)`
  padding: 8px 15px;
  background-color: #f5f5f5;
  color: #555;
  border-radius: 20px;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #05a0e8;
    color: white;
  }
`;

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Find the post that matches the slug
  const post = blogPosts.find(post => post.slug === slug);
  
  // If no matching post is found, redirect to the blog list
  useEffect(() => {
    if (!post) {
      navigate('/blog');
    }
  }, [post, navigate]);
  
  // If no post is found (during initial render before redirect), show loading
  if (!post) {
    return <div>Loading...</div>;
  }
  
  // Find related posts (same category but excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);
  
  // Categories
  const categories = [...new Set(blogPosts.map(p => p.category))];
  
  // Current page URL for sharing
  const pageUrl = window.location.href;
  
  return (
    <BlogDetailSection>
      <Container>
        <BackButton to="/blog">
          <FaArrowLeft /> Back to all articles
        </BackButton>
        
        <TwoColumnLayout>
          <ArticleContainer>
            <BannerImage image={post.image} />
            <ArticleContent>
              <CategoryTag>{post.category}</CategoryTag>
              <ArticleTitle>{post.title}</ArticleTitle>
              
              <MetaInfo>
                <MetaItem>
                  <FaUser />
                  {post.author}
                </MetaItem>
                <MetaItem>
                  <FaCalendarAlt />
                  {post.date}
                </MetaItem>
                <MetaItem>
                  <FaClock />
                  {post.readTime}
                </MetaItem>
              </MetaInfo>
              
              {post.content.map((paragraph, index) => (
                <ArticleParagraph key={index}>{paragraph}</ArticleParagraph>
              ))}
              
              <ShareSection>
                <ShareTitle>Share this article</ShareTitle>
                <ShareButtons>
                  <ShareButton href={`https://facebook.com/sharer/sharer.php?u=${pageUrl}`} target="_blank" rel="noopener noreferrer" color="#3b5998">
                    <FaFacebook />
                  </ShareButton>
                  <ShareButton href={`https://twitter.com/intent/tweet?url=${pageUrl}&text=${post.title}`} target="_blank" rel="noopener noreferrer" color="#1da1f2">
                    <FaTwitter />
                  </ShareButton>
                  <ShareButton href={`https://linkedin.com/sharing/share-offsite/?url=${pageUrl}`} target="_blank" rel="noopener noreferrer" color="#0077b5">
                    <FaLinkedin />
                  </ShareButton>
                  <ShareButton href={`mailto:?subject=${post.title}&body=${pageUrl}`} color="#dd4b39">
                    <FaEnvelope />
                  </ShareButton>
                </ShareButtons>
              </ShareSection>
              
              <CommentsSection>
                <CommentTitle>{comments.length} Comments</CommentTitle>
                
                {comments.map(comment => (
                  <Comment key={comment.id}>
                    <CommentAvatar>
                      {comment.author.charAt(0)}
                    </CommentAvatar>
                    <CommentContent>
                      <CommentHeader>
                        <CommentAuthor>{comment.author}</CommentAuthor>
                        <CommentDate>{comment.date}</CommentDate>
                      </CommentHeader>
                      <CommentText>{comment.text}</CommentText>
                    </CommentContent>
                  </Comment>
                ))}
                
                <CommentForm>
                  <FormTitle>Leave a Comment</FormTitle>
                  <FormGroup>
                    <Input type="text" placeholder="Your Name *" required />
                  </FormGroup>
                  <FormGroup>
                    <Input type="email" placeholder="Your Email *" required />
                  </FormGroup>
                  <FormGroup>
                    <TextArea placeholder="Your Comment *" required />
                  </FormGroup>
                  <SubmitButton type="submit">Post Comment</SubmitButton>
                </CommentForm>
              </CommentsSection>
            </ArticleContent>
          </ArticleContainer>
          
          <Sidebar>
            <SidebarWidget>
              <WidgetTitle>Related Articles</WidgetTitle>
              <RelatedPostsList>
                {relatedPosts.map(relatedPost => (
                  <RelatedPost key={relatedPost.id} to={`/blog/${relatedPost.slug}`}>
                    <RelatedPostImage image={relatedPost.image} />
                    <RelatedPostContent>
                      <RelatedPostTitle>{relatedPost.title}</RelatedPostTitle>
                      <RelatedPostMeta>
                        <MetaItem>
                          <FaCalendarAlt />
                          {relatedPost.date}
                        </MetaItem>
                        <MetaItem>
                          <FaComment />
                          3 Comments
                        </MetaItem>
                      </RelatedPostMeta>
                    </RelatedPostContent>
                  </RelatedPost>
                ))}
              </RelatedPostsList>
            </SidebarWidget>
            
            <SidebarWidget>
              <WidgetTitle>Categories</WidgetTitle>
              <CategoryList>
                {categories.map((category, index) => (
                  <CategoryBadge key={index} to={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}>
                    {category}
                  </CategoryBadge>
                ))}
              </CategoryList>
            </SidebarWidget>
          </Sidebar>
        </TwoColumnLayout>
      </Container>
    </BlogDetailSection>
  );
};

export default BlogDetail; 