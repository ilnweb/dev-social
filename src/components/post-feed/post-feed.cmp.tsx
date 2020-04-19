import React from 'react';
import './post-feed.scss';

interface Props {
  post: {
    postTitle: string
    postImg: string
    userName: string
    createdAt: string
  }
}

const PostFeed = ({ post }: Props) => (
  <div className='post'>
    <img src={post.postImg} alt="" />
    <div className='post-body'>
      <h2>{post.postTitle}</h2>
      <p>Posted by {post.userName}</p>
      <p>Posted by {post.createdAt}</p>
    </div>
  </div>
);

export default PostFeed;