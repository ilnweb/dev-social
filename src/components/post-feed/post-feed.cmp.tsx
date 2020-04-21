import React from 'react';
import './post-feed.scss';
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

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
      {posts && posts.map(post => {
        return (
          <Card
            bordered={false}
            style={{ width: '100%', marginBottom: '1rem' }}
            cover={
              <img
                alt="example"
                src={post.postImg}
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar style={{ backgroundColor: "red" }}>{post.userName.split('')[0]}</Avatar>}
              title={post.postTitle}
              description={post.userName}
            />
          </Card>
        )
      })}
    </div>
  )
};

export default PostFeed;