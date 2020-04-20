import React from 'react';
import './post-feed.scss';
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

interface Post {
  post: {
    postTitle: string
    postImg: string
    userName: string
    createdAt: string
  }
}

const PostFeed: React.FC<Post> = ({ post }) => {

  return (
    <div>
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
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={post.postTitle}
          description={post.userName}
        />
      </Card>
      <Card
        style={{ width: '100%' }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title="Card title"
          description="This is the description"
        />
      </Card>
    </div>
  )
};

export default PostFeed;