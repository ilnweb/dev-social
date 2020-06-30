import React from 'react';
import './post-feed.scss';
import { Card, Avatar, Typography, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { CommentOutlined, HeartOutlined, ShareAltOutlined,NumberOutlined} from '@ant-design/icons';
import { PostsInstance } from '../../mobX/post-feed.context';
import { observer } from 'mobx-react-lite';

const { Meta } = Card;

const PostFeed: React.FC<PostsInstance> = observer(({ posts }) => {

  return (
    <div className="post-feed">
      {posts && posts.map((post, index) => {
        return (
          <Card
            key={index}
            className="post_card"
            bordered={false}
            style={{ marginTop: '.5rem' }}
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
              <ShareAltOutlined className="icon-standart" key="share" />
            ]}
          >
            <Meta
              description={<Typography.Title level={1} className="post-body">{post.postTitle}</Typography.Title>}
              title={
                <div className="card-title">
                  <Typography.Title style={{ marginTop: 30 }} level={3}>{post?.postedBy?.displayName}</Typography.Title>
                  <div className="tag-grid">{post.tags && post.tags.map((item, index) => (<Tag key={index} style={{ fontSize: '1.1rem' }}><NumberOutlined style={{fontSize:'.8rem'}}/>{item}</Tag>))}</div>

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