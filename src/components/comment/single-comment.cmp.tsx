import React, { createElement, useState } from 'react';
import { Comment, Tooltip, Avatar, Button } from 'antd';
import moment from 'moment';
import { LikeOutlined, LikeFilled } from '@ant-design/icons';
import { Post } from '../../interfaces/post-interface';

const SingleComment: React.FC<Post> = ({ comments }) => {

  return (
    <div className='single-comment'>
      <div className='write-comment'>
        <div>
          
        </div>
        <div className="comment-right">

          <Button>Add Comment</Button>
        </div>
      </div>

    </div>
  );
}

export default SingleComment;