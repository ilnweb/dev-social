import React, { createElement, useState } from 'react';
import { Input, Form, Button } from 'antd';

const { TextArea } = Input;

const CommentTextArea = ({ comments }: any) => {
  const [comment, setComment] = useState({ commentText: '' });

  const addCommentText = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;

    setComment({ ...comment, commentText: value });

  };

  const submitComment = () => {
    // console.log(comment);
    // if (user && comment.commentText) {
    //   dispatch(addPostCommentStart(postId, user.id, comment.commentText));
    // }
  }

  return (
    <div>
      <TextArea rows={4} name="commentText" onChange={addCommentText} value={comment.commentText} />
      <Button onClick={submitComment} className="button button-dev block" size="middle">
        Add Comment
      </Button>
    </div>
  );
}

export default CommentTextArea;