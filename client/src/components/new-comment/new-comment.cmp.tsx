import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPostCommentStart } from '../../redux/posts/posts-actions';
import { selectCurrentUser } from '../../redux/user/user-selectors';
import { Comment, Avatar, Form, Button, List, Input, Typography } from 'antd';

const { TextArea } = Input;

interface Props {
  postId: string
}

const NewComment: React.FC<Props> = ({ postId }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [comment, setComment] = useState({ commentText: '' });

  const addCommentText = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    
    setComment({ ...comment, commentText: value });
    
  };

  const submitComment = () => {
    console.log(comment);
    if (user && comment.commentText) {
      dispatch(addPostCommentStart(postId, user.id, comment.commentText));
    }
  }

  return (
    <div>
      <Comment
        style={{ padding: '1rem' }}
        avatar={
          <Avatar
            src={user?.photoURL}
            alt="User Image"
          />
        }
        content={
          <div>
            <Form.Item>
              <TextArea rows={4} name="commentText" onChange={addCommentText} value={comment.commentText} />
            </Form.Item>
            <Form.Item>
              <Button onClick={submitComment} className="button button-dev block" size="large" style={{ marginTop: 30 }} >
                Add Comment
                </Button>
            </Form.Item>
          </div>
        }
      />
    </div>
  )

}

export default NewComment;