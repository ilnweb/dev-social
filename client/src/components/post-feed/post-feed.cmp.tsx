import React from 'react';
import './post-feed.scss';
import { Avatar, Typography, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addPostLikeStart, removePostLikeStart } from '../../redux/posts/posts-actions';
import { selectUserId } from '../../redux/user/user-selectors';
import { Link } from 'react-router-dom';
import { BookOutlined, NumberOutlined } from '@ant-design/icons';
import { FaRegHeart, FaRegComment } from 'react-icons/fa';
import { GiCrownedHeart } from "react-icons/gi";
import Moment from 'react-moment';
import { IPosts } from '../../redux/posts/posts.types';


const PostFeed: React.FC<IPosts> = ({ posts }) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId)

  const addLike = (id: string) => {
    console.log(id);
    if (userId) {
      dispatch(addPostLikeStart(id, userId))
    }
  }

  const removeLike = (id: string) => {
    console.log(id);
    if (userId) {
      dispatch(removePostLikeStart(id, userId))
    }
  }

  const scrollToComment = () => {

  }

  const saveInReadingList = () => {

  }

  const checkLike = (post: any, userId: any) => {
    return post?.likes?.includes(userId)
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
                <div style={{ color: 'rgba(255, 255, 255, 0.50)', fontSize: '.8rem' }}>
                  <Moment format="DD MMMM YYYY" withTitle>{post.createdAt}</Moment>
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
              <div className="d-flex">
                {
                  userId && checkLike(post, userId) ?
                    <button className="d-flex icon-liked"><GiCrownedHeart onClick={() => removeLike(post._id)} className="icon-standart" key="like" /> {post.likesCount}</button> :
                    <button className="d-flex" onClick={() => addLike(post._id)}>
                      <FaRegHeart className="icon-standart" key="like" /> {post.likesCount}
                    </button>
                }
                <Link to={{
                  pathname: `/post/${post._id}`,
                  state: {
                    scrollToComment:true
                  }
                }}>
                  <button className="d-flex" onClick={scrollToComment}>
                    <FaRegComment className="icon-standart" style={{ marginLeft: "1rem" }} key="comment" /> {post.commentsCount}
                  </button>
                </Link>
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