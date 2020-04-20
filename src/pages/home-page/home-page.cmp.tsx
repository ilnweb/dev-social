import React from 'react';
import './home-page.scss';
import { Row, Col } from 'antd';
import PostFeed from '../../components/post-feed/post-feed.cmp';

const HomePage = () => {
  const post = {
    postTitle: 'New post',
    postImg: 'https://res.cloudinary.com/ilnphotography/image/upload/v1584300108/HomePage/35450482_zftxnr.jpg',
    userName: 'iliyan tsachev',
    createdAt: '28/9/1966'
  }
  return (
    <div className='home-page'>
      <Row gutter={[16, 16]}>
        <Col span={6}></Col>
        <Col span={12}><PostFeed post={post} /></Col>
        <Col span={6}></Col>
      </Row>
    </div>
  )
};

export default HomePage;