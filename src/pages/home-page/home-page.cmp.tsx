import React, { useContext } from 'react';
import './home-page.scss';
import { Row, Col } from 'antd';
import PostFeed from '../../components/post-feed/post-feed.cmp';
import { observer } from 'mobx-react-lite';
// import { PostContext } from '../../mobX/post-feed/post-feed.context';

const HomePage = observer(() => {
  // const postContext = useContext(PostContext);
  return (
    <div className='home-page'>
      <Row>
        <Col span={6} sm={2} xs={1} lg={4}></Col>
        <Col span={12} xs={22} sm={20} md={20} lg={16} xl={16}>
          {/* <PostFeed posts={postContext.posts.slice().reverse()} /> */}
        </Col>
        <Col span={6} sm={2} xs={1} lg={4}></Col>
      </Row>
    </div>
  )
});

export default HomePage;