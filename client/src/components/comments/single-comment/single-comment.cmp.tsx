import React, { useState } from 'react';
import './single-comment.scss';
import { Comment, Avatar, Typography, Input, Button } from 'antd';
import Moment from 'react-moment';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

const { TextArea } = Input;

const SingleComment = ({ comment, userId, submitComment, commentId }: any) => {

  const [open, setOpen] = useState(false);
  const [like, setLike] = useState(false);
  const [commentText, setComment] = useState({ commentText: '' });
  const parentCommentID = commentId;

  const addCommentLike = () => {
    setLike(true)
  }

  const addCommentText = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    setComment({ ...commentText, commentText: value });
  };

  let actions = [
    <div className="post-icons">
      <div className="d-flex" >
        {like ?
          <button className="d-flex icon-liked" ><FaHeart className="icon-standart" key="like" />{comment.likesCount}</button>
          :
          <button className="d-flex" style={{ color: '#566194' }}>
            <FaRegHeart className="icon-standart" key="like" onClick={addCommentLike} /> {comment.likesCount}
          </button>
        }
      </div>
      <button className="icon-standart" style={{ color: '#566194' }} onClick={() => setOpen(true)}>
        REPLY
      </button>
    </div>
  ];

  if (open) {
    actions = [
      <div style={{ textAlign: 'right' }}>
        <TextArea autoFocus rows={4} name="commentText" onChange={addCommentText} value={commentText.commentText} style={{ fontSize: '1.2rem' }} />
        <button className="icon-standart" style={{ color: '#566194', marginRight: '1rem' }} onClick={() => setOpen(false)}>
          CANCEL
      </button>
        <Button onClick={() => { submitComment(commentText, parentCommentID); setOpen(false); }} style={{ marginTop: '.5rem' }} className="button button-dev block" size="middle">
          Add Comment
      </Button>

      </div>
    ];
  }

  return (
    <Comment
      key={comment._id}
      className="single-comment"
      actions={actions}
      author={<Typography.Title level={4} style={{ color: 'grey' }}>{comment?.postedBy?.displayName}</Typography.Title>}
      avatar={
        <Avatar
          src={comment?.postedBy?.photoURL}
          alt="User Image"
        />
      }
      content={
        <p style={{ fontSize: '1.1rem', textAlign: 'left' }}>
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