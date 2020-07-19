import React, { useState } from 'react';
import './single-comment.scss';
import { Comment, Tooltip, Avatar, Typography, Input, Form, Button } from 'antd';
import Moment from 'react-moment';
import { FaRegHeart, FaHeartbeat } from 'react-icons/fa';

const { TextArea } = Input;

const SingleComment = ({ comment, commentUserName, submitComment, commentId }: any) => {
  const [open, setOpen] = useState(false);
  const [commentText, setComment] = useState({ commentText: `@${commentUserName}` });
  const parentCommentID = commentId;
  const addCommentText = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    setComment({ ...commentText, commentText: value });
  };

  let actions = [
    <div className="post-icons">
      <div className="d-flex" >
        {open ?
          <button className="d-flex icon-liked" ><FaHeartbeat className="icon-standart" key="like" /> 2</button>
          :
          <button className="d-flex" style={{ color: 'white' }}>
            <FaRegHeart className="icon-standart" key="like" /> 2
          </button>
        }
      </div>
      <button className="icon-standart" style={{ color: 'white' }} onClick={() => setOpen(true)}>
        REPLY
      </button>
    </div>
  ];

  if (open) {
    actions = [<div style={{ textAlign: 'right' }}>
      <TextArea rows={4} name="commentText" onChange={addCommentText} value={commentText.commentText} style={{ fontSize: '1.2rem' }} />
      <Button onClick={()=>submitComment(commentText, parentCommentID)} style={{ marginTop: '.5rem' }} className="button button-dev block" size="middle">
        Add Comment
    </Button>
    </div>];
  }

  return (
    <Comment
      key={comment._id}
      className="single-comment"
      actions={actions}
      author={<Typography.Title level={4}>{comment?.postedBy?.displayName}</Typography.Title>}
      avatar={
        <Avatar
          src={comment?.postedBy?.photoURL}
          alt="User Image"
        />
      }
      content={
        <p style={{ fontSize: '1.3rem', textAlign: 'left' }}>
          {comment.text}
        </p>
      }
      datetime={
        <Moment format="DD MMMM YYYY" withTitle>{comment.createdAt}</Moment>
      }
    />

  );
}

export default SingleComment;