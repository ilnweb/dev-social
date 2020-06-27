import React from 'react';
import './post-feed.scss';
import { Card, Avatar, Typography, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { CommentOutlined, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import { PostsInstance } from '../../mobX/post-feed.context';
import { observer } from 'mobx-react-lite';

const { Meta } = Card;

const PostFeed: React.FC<PostsInstance> = observer(({ posts }) => {

  return (
    <div>
      {posts && posts.map((post, index) => {
        return (
          <Card
            key={index}
            className="post_card"
            bordered={false}
            style={{ marginTop: '.5rem' }}
            cover={post.postImg &&
              <Link to={{
              pathname: `/post/${post._id}`,
              state: {
                post: {
                 postTitle:post.postTitle,
                 postImg:post.postImg,
                 postBody:post.postBody
              }}
            }}>
              <div className="postImg" style={{ backgroundImage: `url(${post.postImg})` }} />
            </Link>
            }
            actions={[
              <HeartOutlined className="icon-standart" key="like" />,
              <CommentOutlined className="icon-standart" key="comment" />,
              <ShareAltOutlined className="icon-standart" key="share" />
            ]}
          >
            <Meta
              description={<Typography.Title level={1} className="post-body">{post.postTitle}</Typography.Title>}
              title={
                <div className="card-title">
                  <Typography.Title style={{ marginTop: 30 }} level={3}>{post?.postedBy?.displayName}</Typography.Title>
                  <div>{post.tags && post.tags.map((item, index) => (<Tag key={index} style={{ fontSize: '1.1rem' }}>{item}</Tag>))}</div>

                </div>
              }
              avatar={<Avatar style={{ marginTop: 30 }} size={50} src={post.postedBy?.photoURL}></Avatar>}


            />
          </Card>
        )
      })}
    </div>
  )
});

export default PostFeed;