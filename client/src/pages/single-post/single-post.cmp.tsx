import React, { useEffect, useState } from 'react';
import hljs from "highlight.js";
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import 'highlight.js/styles/monokai.css';
import './single-post.scss';
import { Row, Col, Tag, Typography } from 'antd';
import { NumberOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectSinglePost } from '../../redux/posts/post-selectors'
import UserAvatar from '../../components/avatar/avatar.cmp'
import Comments from '../../components/comments/comments-container/comments.cmp';
import NewComment from '../../components/comments/new-comment/new-comment.cmp';
import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom';
import { getPostFromDB } from '../../database/connect';
import Moment from 'react-moment';

interface SyntheticEvent<T> {
  currentTarget: EventTarget & T;
}

hljs.configure({
  languages: ["javascript", "ruby", "python", 'html']
});

const modules = {
  syntax: {
    highlight: (text: any) => hljs.highlightAuto(text).value,
  }
}

const SinglePost: React.FC = () => {
  const [post, setPost] = useState<any>();
  let { postId } = useParams();
  const post1 = useSelector(selectSinglePost(postId))
  useEffect(() => {
    (async function posts() {
      if (postId) {
        if (post1) {
          setPost(post1[0])
        } else {
          console.log('post from db')
          let post = await getPostFromDB(postId);
          setPost(post)
        }
      }
    })();
  }, [post, postId, post1]);

  return (
    <Row className="single_post">
      <Col span={6} sm={0} lg={3} xl={4}></Col>
      <Col span={24} sm={24} lg={18} xl={16}>
        {post ?
          <div>
            <div className="single_post-image" style={{ backgroundImage: `url(${post?.postImg})` }} />
            <div className="single_post-header">
              <h1 className="single_post-title">{post?.postTitle}</h1>
              <div className="post-tag-grid">
                {post.tags && post.tags.map((item: string, index: number) => (<Tag key={index} style={{ fontSize: '1.1rem' }}><NumberOutlined style={{ fontSize: '.8rem' }} />{item}</Tag>))}
              </div>
              <div className="single_post-user_info">
                <UserAvatar displayName={post?.postedBy?.displayName} photoURL={post.postedBy?.photoURL} size='large' />
                <div className="single_post-user_name">{post?.postedBy?.displayName}</div>
                <div className="single_post-date">posted: &nbsp; <Moment style={{ lineHeight: 1 }} format="DD MMMM YYYY" withTitle>{post.createdAt}</Moment></div>
              </div>
            </div>
            <ReactQuill readOnly={true} className="single_post-quill" theme="snow" value={post?.postBody} modules={modules} style={{ width: '100%', marginBottom: '2rem' }} />
            <Typography.Title level={2}>
              Comments
            </Typography.Title>
            <NewComment postId={post?._id} />
            <Comments comments={post?.comments} postId={post?._id} />
          </div>
          : ''}
      </Col>
      <Col span={6} sm={0} lg={3} xl={4}></Col>
    </Row>
  )
}

export default SinglePost;