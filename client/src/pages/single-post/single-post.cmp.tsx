import React, { useState } from 'react';
import hljs from "highlight.js";
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css'
import 'highlight.js/styles/monokai.css'
import { Row, Col, Input, Typography, Form, Tag, Space } from 'antd';
import Button from 'antd/es/button';
import { observer } from 'mobx-react-lite';
import UploadImage from '../../components/upload-img/upload-img.cmp';
import { createNewPost } from '../../database/connect';
import { IUser } from '../../interfaces/interfaces';
import ReactQuill from 'react-quill';
import { useLocation } from 'react-router-dom';
import { SinglePostInstance } from '../../mobX/post-feed.context';

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
  const location = useLocation<Props>();
  const { post } = location.state;
  return (
    <Row>
      <Col span={6} sm={2} xs={1} lg={4}></Col>
      <Col span={12} xs={22} sm={20} md={20} lg={16} xl={16}>
        <div className="postImg" style={{ backgroundImage: `url(${post.postImg})`, height:'30rem', marginBottom:'1rem' }} />
        <Typography.Title level={1}>{post.postTitle}</Typography.Title>
        <ReactQuill readOnly={true} className="ebisavgaza" theme="snow" value={post.postBody} modules={modules} style={{width:'100%', marginBottom:'2rem'}}/>
      </Col>
      <Col span={6} sm={2} xs={1} lg={4}></Col>
    </Row>

  )
})

export default SinglePost;