import React from 'react';
import './post-feed.scss';
import { Card, Avatar, Typography, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { CommentOutlined, HeartOutlined, BookOutlined , NumberOutlined } from '@ant-design/icons';
import { PostsInstance } from '../../mobX/post-feed.context';
import { observer } from 'mobx-react-lite';
import Moment from 'react-moment';


const { Meta } = Card;

const PostFeed: React.FC<PostsInstance> = observer(({ posts }) => {

  return (
    <div className="post-feed">
      {posts && posts.reverse().map((post, index) => {
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
              <BookOutlined  className="icon-standart" key="share" />
            ]}
          >
            <Meta
              description={
                <div className="tag-grid">{post.tags && post.tags.map((item, index) => (<Tag key={index} style={{ fontSize: '1.1rem' }}><NumberOutlined style={{ fontSize: '.8rem' }} />{item}</Tag>))}</div>}
              title={
                <div className="card-title">
                  <Typography.Title style={{ marginTop: 10, marginBottom: 2 }} level={4}>{post?.postedBy?.displayName}</Typography.Title>
                  <div style={{ color:'rgba(255, 255, 255, 0.33)', fontSize:'.8rem' }}>posted: <Moment format="DD/MM/YYYY" withTitle>{post.createdAt}</Moment></div>
                  <Typography.Title level={1} style={{ marginTop: 10, marginBottom: 0 }} className="post-body">{post.postTitle}</Typography.Title>

                </div>
              }
              avatar={<Avatar style={{ marginTop: 10 }} size={50} src={post.postedBy?.photoURL}></Avatar>}
            />
          </Card>
        )
      })}
    </div>
  )
});

export default PostFeed;