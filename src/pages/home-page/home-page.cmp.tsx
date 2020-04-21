import React,{useContext} from 'react';
import './home-page.scss';
import { Row, Col } from 'antd';
import PostFeed from '../../components/post-feed/post-feed.cmp';
import { observer } from 'mobx-react-lite';
import { PostContext } from '../../mobX/post-feed/post-feed.context';


const HomePage = observer(() => {
  const postContext = useContext(PostContext);
  console.log(postContext.posts);
  return (
    <div className='home-page'>
      <Row gutter={[16, 16]}>
        <Col span={6}></Col>
        <Col span={12}><PostFeed posts={postContext.posts}/></Col>
        <Col span={6}></Col>
      </Row>
    </div>
  )
});

export default HomePage;