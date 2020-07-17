import React from 'react';
import './post-feed.scss';
import { Avatar, Typography, Tag } from 'antd';
import { useDispatch } from 'react-redux';
import { addPostLikeStart } from '../../redux/posts/posts-actions';
import { Link } from 'react-router-dom';
import { CommentOutlined, HeartOutlined, BookOutlined, NumberOutlined } from '@ant-design/icons';
import Moment from 'react-moment';
import { IPosts } from '../../redux/posts/posts.types';


const PostFeed: React.FC<IPosts> = ({ posts }) => {
  const dispatch = useDispatch()
  const addLike = (id: string) => {
    console.log(id);
    dispatch(addPostLikeStart(id))
  }

  const scrollToComment = () => {

  }

  const saveInReadingList = () => {

  }

  return (
    <div className="post-feed">
      {posts && posts.map((post, index) => {
        return (
          <div className="post" key={post._id}>
            <Link to={{ pathname: `/post/${post._id}` }}>
              <div className="post-img" style={{ backgroundImage: `url(${post?.postImg})` }} />
            </Link>

            <div className="post-user-detail">
              <Avatar size={50} src={post.postedBy?.photoURL} />
              <div className="post-username-date">
                <Typography.Title level={4}>
                  {post?.postedBy?.displayName}
                </Typography.Title>
                <div style={{ color: 'rgba(255, 255, 255, 0.33)', fontSize: '.8rem' }}>
                  <Moment format="DD/MM/YYYY" withTitle>{post.createdAt}</Moment>
                </div>
              </div>
            </div>
            <div className="post-title">
              <Link to={{
                pathname: `/post/${post._id}`
              }}>
                <Typography.Title level={1} style={{ marginTop: 10, marginBottom: 0, fontWeight: 700 }} className="post-body">
                  {post.postTitle}
                </Typography.Title>
              </Link>
              <div className="post-tag-grid">
                {post.tags && post.tags.map((item, index) => (
                  <Tag key={index} style={{ fontSize: '1.1rem' }}>
                    <NumberOutlined style={{ fontSize: '.8rem' }} />
                    {item}
                  </Tag>))}
              </div>
            </div>
            <div className="post-icons">
              <div>
                <button onClick={()=>addLike(post._id)}>
                  <HeartOutlined className="icon-standart" key="like" /> {post.likes}
                </button>
                <button onClick={scrollToComment}>
                  <CommentOutlined className="icon-standart" style={{ marginLeft: "1rem" }} key="comment" /> {post.comments.length}
                </button>
              </div>
              <button onClick={saveInReadingList}>
                <BookOutlined className="icon-standart" key="share" />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
};

export default PostFeed;