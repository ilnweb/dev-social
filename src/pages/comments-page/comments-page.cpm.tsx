import React, { useContext, useState } from 'react';
import './comments-page.scss';
import { Avatar, Form, Button, List, Input, Row, Col } from 'antd';
import { observer } from 'mobx-react-lite';
import { PostContext } from '../../mobX/post-feed/post-feed.context';
import { UserContext } from '../../mobX/user/user.context';
import SingleComment from '../../components/comment/single-comment.cmp';
import { Post } from '../../interfaces/post-interface'; 
if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update')
  whyDidYouUpdate(React)
}
const { TextArea } = Input;

type User = {
  user: {
    photoURL?: string
  }
}

interface Posts {
  posts?: Post[]
}


const CommentPage: React.FC<Posts> = observer(({ posts }) => {
  const [comment, setComment] = useState({ commentText: '' });
  const userContext = useContext<User>(UserContext);

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    const { value } = e.currentTarget;
    setComment({ commentText: value });
  };
  return (
    <div className='comments-page'>
      <Row>
        <Col span={6} sm={2} xs={1} lg={4}></Col>
        <Col span={12} xs={22} sm={20} md={20} lg={16} xl={16}>
          <h1>Comments</h1>
          <div> {posts && posts.map(post => <SingleComment comments={post.comments} />)}</div>
          <div className='write-comment'>
            <div>
              <Avatar size={60} src={userContext.user.photoURL} />
            </div>
            <div className="comment-right">
              <TextArea
                rows={6}
                name="postText"
                value={comment.commentText}
                className="comment-textarea"
                placeholder="Text"
                autoComplete="true"
                onChange={handleChange}
              />
              <Button>Add Comment</Button>
            </div>
          </div>
        </Col>
        <Col span={6} sm={2} xs={1} lg={4}></Col>
      </Row>
    </div>
  )
});

export default CommentPage;