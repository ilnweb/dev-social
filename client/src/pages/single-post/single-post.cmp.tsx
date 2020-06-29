import React, { useEffect, useState } from 'react';
import hljs from "highlight.js";
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import 'highlight.js/styles/monokai.css';
import './single-post.scss';
import { Row, Col, Typography, Skeleton } from 'antd';
// import Button from 'antd/es/button';
import { observer } from 'mobx-react-lite';
import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom';
import { SinglePostInstance } from '../../mobX/post-feed.context';
import { useMst } from "../../mobX/root-store";
import { getsinglePost } from '../../database/connect';


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
          post = await getsinglePost(postId);
          setPost(post)
        }
      }
    })();

  }, [getSinglePost,postId]);

  console.log(post);

  return (
    <Row className="single_post">
      <Col span={6} sm={2} xs={1} lg={4}></Col>
      <Col span={12} xs={22} sm={20} md={20} lg={16} xl={16}>
        {post ?
          <div>
            <div className="single_post-image" style={{ backgroundImage: `url(${post?.postImg})` }} />
            <Typography.Title className="single_post-title" level={1}>{post?.postTitle}</Typography.Title>
            <ReactQuill readOnly={true} className="single_post-quill" theme="snow" value={post?.postBody} modules={modules} style={{ width: '100%', marginBottom: '2rem' }} />
          </div> : <div><Skeleton active /> <Skeleton active avatar paragraph={{ rows: 4 }} /> </div>}
      </Col>
      <Col span={6} sm={2} xs={1} lg={4}></Col>
    </Row>
  )
})

export default SinglePost;