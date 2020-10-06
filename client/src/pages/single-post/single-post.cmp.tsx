import React, { useEffect, useState,useRef  } from 'react';
import './single-post.scss';
import { Row, Col, Tag, Typography } from 'antd';
import { NumberOutlined } from '@ant-design/icons';
// import { useDispatch, useSelector } from 'react-redux';
import QuillComponent from '../../components/quill-component/quill.cmp';
import UserAvatar from '../../components/avatar/avatar.cmp'
import Comments from '../../components/comments/comments-container/comments.cmp';
import NewComment from '../../components/comments/new-comment/new-comment.cmp';
import { useParams,useLocation } from 'react-router-dom';
import { getPostFromDB } from '../../database/connect';
import Moment from 'react-moment';

interface SyntheticEvent<T> {
  currentTarget: EventTarget & T;
}

const scrollToRef = (ref: any) => {
  console.log(ref.current.offsetTop)
  window.scrollTo(0, ref.current.offsetTop)
  }

const SinglePost: React.FC = () => {
  const [post, setPost] = useState<any>();
  let { postId } = useParams<any>();
  let location = useLocation<any>();
  const scroll = useRef<any>(null);

  useEffect(() => {
    (async function posts() {
      if (postId) {
        // let post = await getSinglePost(postId);
        setPost(post)
        if (!post) {
          let post = await getPostFromDB(postId);
          setPost(post)
        }
      }

      if (location?.state?.scrollToComment) {
        scrollToRef(scroll)
      }
      
    })();
  }, [post, postId,scroll]);

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
            <QuillComponent postBody={post?.postBody} />
            <Typography.Title level={2}>
              Comments
            </Typography.Title>
            <NewComment postId={post?._id} />
            <div ref={scroll}></div>
            <Comments comments={post?.comments} postId={post?._id}/>
          </div>
          : ''}
      </Col>
      <Col span={6} sm={0} lg={3} xl={4}></Col>
    </Row>
  )
}

export default React.memo(SinglePost);