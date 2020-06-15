import React, { useState } from 'react';
import { useMst } from "../../mobX/root-store";
import { Row, Col, Input, Form } from 'antd';
import Button from 'antd/es/button';
import { MailOutlined } from '@ant-design/icons';
import { History } from 'history';

import { signInUser } from '../../database/connect';

interface SyntheticEvent<T> {
  currentTarget: EventTarget & T;
}

interface Props {
  history: History
}

const SignIn: React.FC<Props> = ({ history }) => {
  const [userCredentials, serCredentials] = useState({ email: '', password: '' });
  const { setCurrentUser } = useMst();

  const handleSubmit = async () => {
    const { email, password } = userCredentials;
    let result;
    try {
      result = await signInUser(email, password);
      console.log(result);
      result && localStorage.setItem('token', result.data.token);
      setCurrentUser(result?.data.user)
    } catch (error) {
      console.error(`Error signin in user ${error}`);
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
                style={{ marginTop: 30 }}
              />
              <Button style={{ marginTop: 30 }} className="button primary block" size="large" type="primary" onClick={handleSubmit}>
                Log In
						</Button>
            </Form>
          </Col>
          <Col span={6} sm={2} xs={1} lg={6}></Col>
        </Row>
      </div>
    </div>
  );

}

export default SignIn;
