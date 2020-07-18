import React, { createElement, useState } from 'react';
import './comments.scss'
import { Comment, Tooltip, Avatar, Typography } from 'antd';
import Moment from 'react-moment';

import { FaRegHeart, FaHeartbeat, FaRegComment } from 'react-icons/fa';

const Comments = ({ comments }: any) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState('');

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <div className="post-icons">
      <div className="d-flex" >
        {/* <button className="d-flex icon-liked"><FaHeartbeat className="icon-standart" key="like" /> </button> */}
        <button className="d-flex" >
          <FaRegHeart className="icon-standart" key="like" style={{ color:'white' }}/>
        </button>

        <button className="d-flex" >
          <FaRegComment className="icon-standart" style={{ marginLeft: "1rem", color:'white' }} key="comment" />
        </button>
      </div>
      <button className="icon-standart" style={{ color:'white' }}>
        REPLY
      </button>
    </div>
  ];
  console.log(comments);
  return (
    <div>
      {comments && comments.map((comment: any) => {
        return (
          <Comment
            key={comment._id}
            style={{ padding: '1rem', margin: '1rem', border: '1px solid green' }}
            actions={actions}
            author={<Typography.Title level={4}>{comment.postedBy.displayName}</Typography.Title>}
            avatar={
              <Avatar
                src={comment.postedBy.photoURL}
                alt="Han Solo"
              />
            }
            content={
              <p style={{fontSize:'1.3rem', textAlign:'left'}}>
                {comment.text}
              </p>
            }
            datetime={
              <Moment format="DD MMMM YYYY" withTitle>27 Jul 2020</Moment>
            }
          />)
      })}
    </div>

  );
}

export default Comments;