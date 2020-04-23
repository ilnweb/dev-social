import React from 'react';
import './post-feed.scss';
import { Card, Avatar,Typography } from 'antd';
import { CommentOutlined , HeartOutlined, ShareAltOutlined } from '@ant-design/icons';

const { Meta } = Card;

interface Object {
  postImg?: string;
  userName?: string;
  createdAt?: string;
  postBody?: string;
  userPhoto?: string;
}

interface Posts {
  posts?: Object[] 
}

const PostFeed: React.FC<Posts> = ({ posts }) => {
  return (
    <div>
      {posts && posts.map((post, index) => {
        return (
          <Card
            key={index}
            className="post_card"
            bordered={false}
            style={{ width: '100%', marginBottom: '3rem', marginTop: index === 0 ? '3rem' : '0' }}
            cover={post.postImg && <div className="postImg" style={{background: `url(${post.postImg})`}}></div>
            }
            extra={<Typography.Title level={4}>{'3h'}</Typography.Title>}
            actions={[
              <HeartOutlined style={{fontSize:'1.5rem'}} key="like" />,
              <CommentOutlined style={{fontSize:'1.5rem'}} key="comment" />,
              <ShareAltOutlined style={{fontSize:'1.5rem'}} key="share" />
            ]}
          >
            <Meta
              title={<Typography.Title style={{marginTop: 30}} level={3}>{post.userName}</Typography.Title>}
              avatar={<Avatar style={{marginTop: 30}} size={50} src={post.userPhoto}></Avatar>}
              description={<Typography.Title style={{lineHeight: '26px', whiteSpace: 'pre-wrap', margin: '0 30px 30px 0', textAlign: 'left'}} level={4}>{post.postBody}</Typography.Title>}
            />
          </Card>
        )
      })}
    </div>
  )
};

export default PostFeed;