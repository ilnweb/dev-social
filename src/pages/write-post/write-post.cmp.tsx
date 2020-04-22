import React, { useState } from 'react';
import './write-post.scss';
import { Row, Col, Input, Typography, Form, Button, Tag } from 'antd';
import { observer } from 'mobx-react-lite';
import UploadImage from '../../components/upload-img/upload-img.cmp';
import { createNewPost } from '../../firebase/firebase.config';

const { TextArea } = Input;

interface SyntheticEvent<T> {
  currentTarget: EventTarget & T;
}

interface Props {
  user: {
    displayName?: string
    photoURL?: string
    email?: string
  }
}

const WritePost: React.FC<Props> = observer(({ user }) => {
  //state
  const [post, setPost] = useState({ postText: '', postTags: '', photoURL: '' });

  //handlers
  const handleSubmit = async () => {
    try {
      await createNewPost(post, user);
    } catch (error) {
      console.error(`wtf ${error}`);
    }
  };

  const handleImage = (imageUrl: string): void => {
    setPost({
      ...post, photoURL: imageUrl
    });
  };

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement> | React.FormEvent<HTMLInputElement>): void => {
    const { value, name } = e.currentTarget;
    setPost({ ...post, [name]: value });
  };
  console.log(post);
  return (
    <div className='user-profile'>
      <Typography.Title level={2}>Write Post</Typography.Title>
      <Row>
        <Col span={6}></Col>
        <Col span={12} >
          <Form className="login-regester__Form sign-in-up flex-c">
            <TextArea
              rows={6}
              name="postText"
              value={post.postText}
              className="input-style"
              placeholder="Text"
              autoComplete="true"
              onChange={handleChange}
            />
            <Input
              name="postTags"
              value={post.postTags}
              className="input-style"
              placeholder="Tags ( write with space no commas )"
              autoComplete="true"
              onChange={handleChange}
            />
            <UploadImage handleImage={handleImage} />
          </Form>
          <Button className="button primary block" size="large" type="primary" onClick={handleSubmit}>
            Submit Post
					</Button>
        </Col>
        <Col span={6}></Col>
      </Row>
    </div>
  )
});

export default WritePost;