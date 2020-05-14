import React from 'react';
import {Avatar, Button } from 'antd';
import moment from 'moment';
import { LikeOutlined, LikeFilled } from '@ant-design/icons';

interface Comment {
  comment:string
}

const SingleComment: React.FC<Comment> = ({ comment }) => {

  return (
    <div className='single-comment'>
      <div className='write-comment'>
        <div>
          {comment}
        </div>
        <div className="comment-right">

          <Button>Add Comment</Button>
        </div>
      </div>

    </div>
  );
}

export default SingleComment;