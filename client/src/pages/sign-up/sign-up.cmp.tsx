import React, { useState } from 'react';
import { History } from 'history';
import { Row, Col, Input, Form } from 'antd';
import Button from 'antd/es/button';
import { MailOutlined } from '@ant-design/icons';
import { createUserProfile } from '../../database/connect';


interface SyntheticEvent<T> {
  currentTarget: EventTarget & T;
}

const SignUp: React.FC <{history: History}>= ({history}) => {
  const [userCredentials, serCredentials] = useState({ email: '', password: '', confirmPassword: '', name: '' })

  const handleSubmit = async () => {
    const { confirmPassword, password, email, name } = userCredentials;
    if (confirmPassword !== password) {
      return alert('Passwords dont match!')
    }
    try {
      await createUserProfile(email, password, name);
      history.push('/sign-in')
    } catch (error) {
      console.error(`wtf ${error}`);
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value, name } = e.currentTarget;

    serCredentials({ ...userCredentials, [name]: value });
  };
  
  return (
    <div style={{ marginTop: 100 }} className="sign-in-up flex-c-c login-regester">
      <div style={{ maxWidth: '1256px', margin: '0px auto' }}>

        <Row>
          <Col span={6} sm={2} xs={1} lg={6}></Col>
          <Col span={6} xs={22} sm={20} md={20} lg={12} xl={12}>
            <Form className="login-regester__Form sign-in-up flex-c">
              <h1 className="pageTitle">Sign Up</h1>
              <Input
                name="email"
                value={userCredentials.email}
                className="input-style"
                type="email"
                size="large"
                placeholder="Email"
                suffix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                autoComplete="true"
                onChange={handleChange}
              />
              <Input
                name="name"
                value={userCredentials.name}
                className="input-style"
                type="text"
                size="large"
                placeholder="Name"
                suffix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                autoComplete="true"
                onChange={handleChange}
                style={{ marginTop: 30 }}
              />
              <Input.Password
                name="password"
                value={userCredentials.password}
                className="input-style"
                type="password"
                size="large"
                placeholder="Password"
                autoComplete="true"
                onChange={handleChange}
                style={{ marginTop: 30 }}
              />
              <Input.Password
                name="confirmPassword"
                value={userCredentials.confirmPassword}
                className="input-style"
                type="password"
                size="large"
                placeholder="Confirm Password"
                autoComplete="true"
                onChange={handleChange}
                style={{ marginTop: 30 }}
              />
               <Button className="button button-dev block" size="large" style={{ marginTop: 30 }} onClick={handleSubmit}>
                Sign Up
						</Button>
            </Form>
          </Col>
          <Col span={6} sm={2} xs={1} lg={6}></Col>
        </Row>
      </div>
    </div>
  );

}

export default SignUp;
