import React from 'react';
import './post-feed.scss';
import { Card, Avatar, Typography, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { CommentOutlined, HeartOutlined, TagOutlined, NumberOutlined } from '@ant-design/icons';
import Moment from 'react-moment';
import { IPosts } from '../../redux/posts/posts.types';


const { Meta } = Card;

const PostFeed: React.FC<IPosts> = ({ posts }) => {

  return (
    <div className="post-feed">
      {posts && posts.map((post, index) => {
        return (
          <Card
            key={index}
            className="post_card"
            bordered={false}
            cover={post.postImg &&
              <Link to={{
                pathname: `/post/${post._id}`
              }}>
                <div className="postImg" style={{ backgroundImage: `url(${post.postImg})` }} />
              </Link>
            }
            actions={[
              <HeartOutlined className="icon-standart" key="like" />,
              <CommentOutlined className="icon-standart" key="comment" />,
              <div><TagOutlined className="icon-standart" key="share" /> 0</div>
            ]}
          >
            <Meta
              description={
                <div className="tag-grid">
                  {post.tags && post.tags.map((item, index) => (
                    <Tag key={index} style={{ fontSize: '1.1rem' }}>
                      <NumberOutlined style={{ fontSize: '.8rem' }} />
                      {item}
                    </Tag>))}
                </div>}
              title={
                <div className="card-title">
                  <Typography.Title style={{ marginTop: 10, marginBottom: 2 }} level={4}>
                    {post?.postedBy?.displayName}
                  </Typography.Title>
                  <div style={{ color: 'rgba(255, 255, 255, 0.33)', fontSize: '.8rem' }}>
                    posted: <Moment format="DD/MM/YYYY" withTitle>{post.createdAt}</Moment>
                  </div>
                  <Link to={{
                    pathname: `/post/${post._id}`
                  }}>
                    <Typography.Title level={1} style={{ marginTop: 10, marginBottom: 0, fontWeight: 700 }} className="post-body">
                      {post.postTitle}
                    </Typography.Title>
                  </Link>
                </div>
              }
              avatar={<Avatar style={{ marginTop: 10 }} size={50} src={post.postedBy?.photoURL}></Avatar>}
            />
          </Card>
        )
      })}
    </div>
  )
};

export default PostFeed;