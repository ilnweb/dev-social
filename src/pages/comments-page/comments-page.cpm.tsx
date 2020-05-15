import React, { useContext, useState } from 'react';
import './comments-page.scss';
import { Button, Input, Row, Col } from 'antd';
import { observer } from 'mobx-react-lite';
import { UserContext } from '../../mobX/user.context';
import SingleComment from '../../components/comment/single-comment.cmp';
import { useLocation } from 'react-router-dom';
import { addComment } from '../../firebase/firebase.config';
import {IComment} from '../../interfaces/post-interface';

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
  comments:IComment[]
  postID: string
}

const CommentPage: React.FC = observer(() => {
  const [comment, setComment] = useState({ commentText: '' });
  const userContext = useContext<User>(UserContext);
  const location = useLocation<Comments>();
  console.log(location.state);
  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    const { value } = e.currentTarget;
    setComment({ commentText: value });
  };

  const handleAddComment = (): void => {
    addComment(comment.commentText, userContext.user, location.state.postID)
  }

  return (
    <div className='comments-page'>
      <Row>
        <Col span={6} sm={2} xs={1} lg={4}></Col>
        <Col span={12} xs={22} sm={20} md={20} lg={16} xl={16}>
          <h1>Comments</h1>
          <div> {location?.state.comments?.map((comment:IComment, index:number) => <SingleComment key={index} comment={comment} />)}</div>
          <div className='write-comment'>
            <div className="comment-right">
              <TextArea
                rows={6}
                name="postText"
                value={comment.commentText}
                className="comment-textarea"
                placeholder="White a comment"
                autoComplete="true"
                onChange={handleChange}
              />
              <Button onClick={handleAddComment}>Add Comment</Button>
            </div>
          </div>
        </Col>
        <Col span={6} sm={2} xs={1} lg={4}></Col>
      </Row>
    </div>
  )
});

export default CommentPage;