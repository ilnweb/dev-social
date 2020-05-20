import React, { useState } from 'react';
import { auth, signInWithGoogle } from '../firebase/firebase.config';
import { Row, Col, Input, Form } from 'antd';
import Button from 'antd/es/button';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const { Title } = Typography;

interface SyntheticEvent<T> {
  currentTarget: EventTarget & T;
}

const SignIn: React.FC = () => {
  const [userCredentials, serCredentials] = useState({ email: '', password: '' })

  const handleSubmit = async () => {
    const { email, password } = userCredentials;

    try {
      await auth.signInWithEmailAndPassword(email, password);

    } catch (error) {
      console.error(`wtf ${error}`);
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value, name } = e.currentTarget;

    serCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div style={{marginTop: 100}} className="sign-in-up flex-c-c login-regester">
      <div style={{ maxWidth: '1256px', margin: '0px auto' }}>

        <Row>
        <Col span={6} sm={2} xs={1} lg={6}></Col>
        <Col span={6} xs={22} sm={20} md={20} lg={12} xl={12}>
            <Form className="login-regester__Form sign-in-up flex-c">
              <h1 className="pageTitle">Log In</h1>
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
              <Input.Password
                name="password"
                value={userCredentials.password}
                className="input-style"
                type="password"
                size="large"
                placeholder="Password"
                autoComplete="true"
                onChange={handleChange}
                style={{marginTop: 30}}
              />
              <Button style={{marginTop: 30}} className="button primary block" size="large" type="primary" onClick={handleSubmit}>
                Log In
						</Button>
              <Title style={{margin: '30px 0'}} level={2}>- or -</Title>
              <Button
                className="button block"
                size="large"
                type="danger"
                icon={<GoogleOutlined />}
                onClick={signInWithGoogle}
              >Login with Google</Button>
            </Form>
          </Col>
          <Col span={6} sm={2} xs={1} lg={6}></Col>
        </Row>
      </div>
    </div>
  );

}

export default SignIn;
