import React from 'react';
import { useMst } from "../../mobX/root-store";
import { RootInstance } from '../../mobX/root-store';
import './home-page.scss';
import { Row, Col } from 'antd';
import PostFeed from '../../components/post-feed/post-feed.cmp';
import { observer } from 'mobx-react-lite';
// import { PostContext } from '../../mobX/post-feed/post-feed.context';

const HomePage: React.FC = observer(() => {
  // const postContext = useContext(PostContext);
  const { posts }:RootInstance = useMst();

  return (
    <div className='home-page'>
      <Row>
        <Col span={6} sm={2} xs={1} lg={4}></Col>
        <Col span={6} xs={22} sm={20} md={20} lg={16} xl={16}>
          <PostFeed posts={posts} />
        </Col>
        <Col span={6} sm={2} xs={1} lg={4}></Col>
      </Row>
    </div>
  )
});

export default HomePage;