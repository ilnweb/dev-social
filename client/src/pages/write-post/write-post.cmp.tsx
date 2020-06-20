import React, { useState } from 'react';
import './write-post.scss';
import { Row, Col, Input, Typography, Form, Tag, Space } from 'antd';
import Button from 'antd/es/button';
import { observer } from 'mobx-react-lite';
import UploadImage from '../../components/upload-img/upload-img.cmp';
import { createNewPost } from '../../database/connect';
import { IUser } from '../../interfaces/interfaces';

import ReactQuill from 'react-quill';

const { TextArea } = Input;

interface KeyboardEvent {
  enterKey: boolean;
}

interface SyntheticEvent<T> {
  currentTarget: EventTarget & T;
}

interface Post {
  postText: string
  postTags: string[]
  photoURL: string
}


const WritePost: React.FC<IUser> = observer(({ user }) => {
  // state
  const [post, setPost] = useState<Post>({ postText: '', postTags: [], photoURL: '' });
  const [tag, setTag] = useState('');
  // handlers
  const handleSubmit = async () => {
    try {
      await createNewPost(post, user);
    } catch (error) {
      console.error(`wtf ${error}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.charCode === 32 || e.keyCode === 32) {
      e.preventDefault();
      setPost({ ...post, postTags: [...post.postTags, tag] })
      setTag('')
    }
  }

  const handleClose = (tagToRemove: string): void => {
    const tags = post.postTags.filter(item => item !== tagToRemove);

    console.log(tagToRemove);
    setPost({ ...post, postTags: [...tags] })
  }

  const handleImage = (imageUrl: string): void => {
    setPost({
      ...post, photoURL: imageUrl
    });
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    setPost({ ...post, postText: value });
  };

  const handleChangeTag = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    setTag(value);
  };
  const [value, setValue] = useState('');
  const modules = {
    toolbar: [
      [{ 'header': [1, 2,3,4, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  console.log(value);

  return (
    <div className='user-profile'>
      <Typography.Title level={2}>Write Post</Typography.Title>
      <Row>
        <Col span={6} sm={2} xs={1} lg={6}></Col>
        <Col span={6} xs={22} sm={20} md={20} lg={12} xl={12}>
          <Form className="login-regester__Form sign-in-up flex-c">
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <UploadImage handleImage={handleImage} />
              <Input
                name="postText"
                value={post.postText}
                className="input-style"
                placeholder="Title"
                autoComplete="true"
                onChange={handleChange}
              />
              <div>
                {
                  post.postTags && post.postTags.map((item, index) => (<Tag key={index} color='#e16162' closable onClose={() => handleClose(item)}>#{item}</Tag>))
                }
              </div>
              <Input
                name="tag"
                value={tag}
                className="input-style"
                placeholder="Tags"
                autoComplete="true"
                onChange={handleChangeTag}
                onKeyPress={handleKeyPress}
              />
            </Space>
          </Form>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules}
              formats={formats} />
            <Button className="button primary block" size="large" type="primary" onClick={handleSubmit}>
              Submit Post
					</Button>
          </Space>
        </Col>
        <Col span={6} sm={2} xs={1} lg={6}></Col>
      </Row>
    </div>
  )
});

export default WritePost;