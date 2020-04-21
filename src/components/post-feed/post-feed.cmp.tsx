import React from 'react';
import './post-feed.scss';
import { Card, Avatar,Typography,Button } from 'antd';
import { CommentOutlined , LikeOutlined } from '@ant-design/icons';

const { Meta } = Card;

interface Object {
  postTitle: string;
  postImg: string;
  userName: string;
  createdAt: string;
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
              <LikeOutlined key="like" />,
              <CommentOutlined key="comment" />,
              <Button style={{backgroundColor:'#e16162', color:'#fffffe'}}>Save</Button>
            ]}
          >
            <Meta
              avatar={<Avatar style={{ backgroundColor: "#e16162" }}>{post.userName.split('')[0]}</Avatar>}
              title={<Typography.Title level={2}>{post.postTitle}</Typography.Title>}
              description={`Posted: ${post.createdAt}`}
            />
          </Card>
        )
      })}
    </div>
  )
};

export default PostFeed;