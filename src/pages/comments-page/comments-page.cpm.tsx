import React, { useContext, useState } from 'react';
import './comments-page.scss';
import { Avatar,Button, Input, Row, Col } from 'antd';
import { observer } from 'mobx-react-lite';
import { UserContext } from '../../mobX/user/user.context';
import SingleComment from '../../components/comment/single-comment.cmp';
import { useLocation } from 'react-router-dom';

// if (process.env.NODE_ENV !== 'production') {
//   const { whyDidYouUpdate } = require('why-did-you-update')
//   whyDidYouUpdate(React)
// }
const { TextArea } = Input;

type User = {
  user: {
    photoURL?: string
  }
}
interface Comments {
  comments:string[]
}

const CommentPage: React.FC = observer(() => {
  const [comment, setComment] = useState({ commentText: '' });
  const userContext = useContext<User>(UserContext);
  const location = useLocation<Comments>();

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
          <div> {location?.state.comments?.map(comment => <SingleComment comment={comment} />)}</div>
          <div className='write-comment'>
            <div>
              <Avatar size={60} src={userContext?.user?.photoURL} />
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