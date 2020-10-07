import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllPosts } from '../../redux/posts/post-selectors';
import './home-page.scss';
import { Row, Col } from 'antd';
import PostFeed from '../../components/post-feed/post-feed.cmp';

const HomePage: React.FC = () => {
  const posts = useSelector(selectAllPosts);
  return (
    <div className='home-page'>
      <Row>
        <Col span={6} sm={0} md={2} lg={4} xl={6}></Col>
        <Col span={24} sm={24} md={20} lg={16} xl={12}>
          <PostFeed posts={posts} />
        </Col>
        <Col span={6} sm={0} md={2} lg={4} xl={6}></Col>
      </Row>
    </div>
  )
};

export default HomePage;