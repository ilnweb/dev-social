import React from 'react';
import './single-comment.scss';
import { Avatar, Button } from 'antd';
import moment from 'moment';
import { HeartOutlined, LikeFilled } from '@ant-design/icons';
import {IComment} from '../../interfaces/post-interface';

interface Comment{
  comment:IComment
}

const SingleComment: React.FC<Comment> = ({ comment }) => {
console.log(comment.date);
  return (
    <div className='single-comment'>
      <div>
        <Avatar src={comment?.userImg}size={40} />
      </div>
      <div className="single-comment-right">
        <div className="single-comment-info">
          <h2>{comment?.userName}</h2>
          <span>{moment(comment?.date.seconds).fromNow()}</span>
        </div>
        <p className="single-comment-text">{comment?.commentText}</p>
        <div className="single-comment-bottom">
          <HeartOutlined className="icon-standart"/>
          <Button>Reply</Button>
        </div>
        
      </div>
    </div>
  );
}

export default SingleComment;