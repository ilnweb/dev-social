import React from 'react';
import './post-feed.scss';
import { Card, Avatar,Typography,Button } from 'antd';
import { CommentOutlined , LikeOutlined } from '@ant-design/icons';

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
            bordered={false}
            style={{ width: '100%', marginBottom: '1rem' }}
            cover={
              <img
                alt="example"
                src={post.postImg}
              />
            }
            actions={[
              <LikeOutlined style={{fontSize:'1.5rem'}} key="like" />,
              <CommentOutlined style={{fontSize:'1.5rem'}} key="comment" />,
              <Button style={{backgroundColor:'#e16162', color:'#fffffe'}}>Save</Button>
            ]}
          >
            <Meta
              title={<Typography.Title level={2}>{post.postBody}</Typography.Title>}
              avatar={<Avatar src={post.userPhoto}></Avatar>}
              description={`Posted: ${post.createdAt}`}
            />
          </Card>
        )
      })}
    </div>
  )
};

export default PostFeed;