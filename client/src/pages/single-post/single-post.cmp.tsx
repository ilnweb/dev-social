import React, { useEffect, useState } from 'react';
import hljs from "highlight.js";
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import 'highlight.js/styles/monokai.css';
import './single-post.scss';
import { Row, Col, Tag } from 'antd';
import { NumberOutlined } from '@ant-design/icons';
import UserAvatar from '../../components/avatar/avatar.cmp'
// import Button from 'antd/es/button';
import { observer } from 'mobx-react-lite';
import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom';
import { SinglePostInstance } from '../../mobX/post-feed.context';
import { useMst } from "../../mobX/root-store";
import { getPostFromDB } from '../../database/connect';
import Moment from 'react-moment';



hljs.configure({
  languages: ["javascript", "ruby", "python", 'html']
});

const modules = {
  syntax: {
    highlight: (text: any) => hljs.highlightAuto(text).value,
  }
}

interface Props {
  post: SinglePostInstance

}

const SinglePost: React.FC<Props> = observer(() => {
  const [post, setPost] = useState<any>()
  const { getSinglePost } = useMst();
  let { postId } = useParams();
  // console.log(postId);
  // let post: any;

  useEffect(() => {
    (async function posts() {
      if (postId) {
        let post = await getSinglePost(postId);
        setPost(post)
        if (!post) {
          post = await getPostFromDB(postId);
          setPost(post)
        }
      }
    })();

  }, [getSinglePost, postId]);



  return (
    <Row className="single_post">
      <Col span={6} sm={0}  lg={3}  xl={4}></Col>
      <Col span={24} sm={24}  lg={18} xl={16}>
        {post ?
          <div>
            <div className="single_post-image" style={{ backgroundImage: `url(${post?.postImg})` }} />
            <div className="single_post-header">
              <h1 className="single_post-title">{post?.postTitle}</h1>
              <div className="tag-grid">
                {post.tags && post.tags.map((item: string, index: number) => (<Tag key={index} style={{ fontSize: '1.1rem' }}><NumberOutlined style={{ fontSize: '.8rem' }} />{item}</Tag>))}
              </div>
              <div className="single_post-user_info">
                <UserAvatar displayName={post?.postedBy?.displayName} photoURL={post.postedBy?.photoURL} size='large' />
                <div className="single_post-user_name">{post?.postedBy?.displayName}</div>
                <div className="single_post-date">posted: &nbsp; <Moment style={{ lineHeight: 1 }} format="DD/MM/YYYY" withTitle>{post.createdAt}</Moment></div>
              </div>
            </div>
            <ReactQuill readOnly={true} className="single_post-quill" theme="snow" value={post?.postBody} modules={modules} style={{ width: '100%', marginBottom: '2rem' }} />
          </div> : ''}
      </Col>
      <Col span={6} sm={0} lg={3}  xl={4}></Col>
    </Row>
  )
})

export default SinglePost;