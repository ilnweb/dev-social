import React, { useContext, useState } from 'react';
import './comments-page.scss';
import { Avatar, Form, Button, List, Input, Row, Col } from 'antd';
import { observer } from 'mobx-react-lite';
import { PostContext } from '../../mobX/post-feed/post-feed.context';
import { UserContext } from '../../mobX/user/user.context';

const { TextArea } = Input;

type User = {
  user:{
   photoURL?:string
  }
}



const CommentPage: React.FC = observer(() => {
  const [comment, setComment] = useState({ commentText: '' });
  const postContext = React.useContext(PostContext);
  const userContext = useContext<User>(UserContext);

  console.log(postContext.posts);

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
          <div></div>
          <div className='write-comment'>
            <div>
              <Avatar size={60} src={userContext.user.photoURL} /></div>
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