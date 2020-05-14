import React from 'react';
import './single-comment.scss';
import { Avatar, Button } from 'antd';
import moment from 'moment';
import { HeartOutlined, LikeFilled } from '@ant-design/icons';

interface Comment {
  comment: string
}

const SingleComment: React.FC<Comment> = ({ comment }) => {

  return (
    <div className='single-comment'>
      <div>
        <Avatar size={60} />
      </div>
      <div className="single-comment-right">
        <div className="single-comment-info">
          <h2>iliyan tsachev</h2>
          <span>27/23/24</span>
        </div>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        <div className="single-comment-bottom">
          <HeartOutlined className="icon-standart"/>
          <Button>Reply</Button>
        </div>
        
      </div>
    </div>
  );
}

export default SingleComment;