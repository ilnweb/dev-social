import React, { useState } from 'react';
import hljs from "highlight.js";
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css'
import 'highlight.js/styles/monokai.css'
import './write-post.scss';
import { Row, Col, Input, Typography, Form, Tag, Space } from 'antd';
import Button from 'antd/es/button';
import { observer } from 'mobx-react-lite';
import UploadImage from '../../components/upload-img/upload-img.cmp';
import { createNewPost } from '../../database/connect';
import { IUser } from '../../interfaces/interfaces';
import ReactQuill from 'react-quill';

hljs.configure({
  languages: ["javascript", "ruby", "python", 'html']
});

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

const modules = {
  syntax: {
    highlight: (text: any) => hljs.highlightAuto(text).value,
  },
  toolbar: [
    [{ 'font': [] }],
    [{ 'header': [1, 2, 3, 4, false] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'blockquote'],
    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],

    [{ list: 'ordered' }, { list: 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'color': [] }, { 'background': [] }],


    ['code-block'],
    ['link','image'],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
}

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'code-block',
  'align',
  'color',
  'background',
  'image'
]

const WritePost: React.FC<IUser> = observer(({ user }) => {

  // state
  const [post, setPost] = useState<Post>({ postText: '', postTags: [], photoURL: '' });
  const [tag, setTag] = useState('');
  const [text, setText] = useState({ text: '' });

  // handlers
  const handleSubmit = async () => {
    console.log(post);
    console.log(tag);
    console.log(text);
    try {
      await createNewPost(post, user?.id, text.text);
    } catch (error) { 
      console.error(`wtf ${error}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.charCode === 32 || e.keyCode === 32) {
      e.preventDefault();
      if (tag !== '') {
      setPost({ ...post, postTags: [...post.postTags, tag] })
      setTag('')
      }
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

  const handleQuill = (value: string): void => {
    setText({ ...text, text: value });
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    setPost({ ...post, postText: value });
  };

  const handleChangeTag = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    console.log(value);
    if (value.length > 0) {
      setTag(value)
    }
    return;
  };

 

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
              <div className="tag-container">
                {
                  post.postTags && post.postTags.map((item, index) => (<Tag key={index} closable onClose={() => handleClose(item)}><span>{item}</span></Tag>))
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
          <Space direction="vertical" size="middle" style={{ width: '100%', marginBottom: '2rem' }}>
            <ReactQuill theme="snow" value={text.text} onChange={handleQuill} modules={modules}
              formats={formats} />
            <Button className="button button-dev block" size="large" type="primary" onClick={handleSubmit}>
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