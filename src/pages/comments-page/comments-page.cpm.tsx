import React, { useContext } from 'react';
import './comments-page.scss';
import { Comment, Avatar, Form, Button, List, Input,Row, Col } from 'antd';
import { observer } from 'mobx-react-lite';
import { PostContext } from '../../mobX/post-feed/post-feed.context';

const CommentPage = observer(() => {
  const postContext = useContext(PostContext);
  return (
    <div className='comments-page'>
      <Row>
        <Col span={6} sm={2} xs={1} lg={4}></Col>
        <Col span={12} xs={22} sm={20} md={20} lg={16} xl={16}>
          <h1>Comments</h1>
        <div>
            {
              // comments.length > 0 && <CommentList comments={comments} />
            }
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            'sadsadsa'
          }
        />
      </div>
        </Col>
        <Col span={6} sm={2} xs={1} lg={4}></Col>
      </Row>
    </div>
  )
});

export default CommentPage;