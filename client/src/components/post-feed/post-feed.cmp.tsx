import React from 'react';
import './post-feed.scss';
import { Card, Avatar, Typography, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { CommentOutlined, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import { PostsInstance } from '../../mobX/post-feed.context';

const { Meta } = Card;

const PostFeed: React.FC<PostsInstance> = ({ posts }) => {
 
  return (
    <div>
      {posts && posts.map((post, index) => {
        return (
          <Card
            key={index}
            className="post_card"
            bordered={false}
            style={{ marginTop: index === 0 ? '3rem' : '0' }}
            cover={post.postImg && <div className="postImg" style={{ backgroundImage: `url(${post.postImg})` }} />
            }
            extra={<p>{'3h'}</p>}
            actions={[
              <HeartOutlined className="icon-standart" key="like" />,
              <Link to={{
                pathname: `/comments`,
                state: {
                  postID: post.id,
                  comments: post?.comments?.map(item=>{return{...item}})
                }
              }}><CommentOutlined className="icon-standart" key="comment" /></Link>,
              <ShareAltOutlined className="icon-standart" key="share" />
            ]}
          >
            <Meta
              title={
                <div className="card-title">
                  <Typography.Title style={{ marginTop: 30 }} level={3}>{post.userName}</Typography.Title>
                  <div>{post.tags && post.tags.map((item, index) => (<Tag key={index} color='#e16162'>#{item}</Tag>))}</div>
                </div>
              }
              avatar={<Avatar style={{ marginTop: 30 }} size={50} src={post.userPhoto}></Avatar>}
              description={<p className="post-body">{post.postBody}</p>}

            />
          </Card>
        )
      })}
    </div>
  )
};

export default PostFeed;