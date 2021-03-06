import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { emailSignInStart } from '../../redux/user/user-actions';
import { Row, Col, Input, Form } from 'antd';
import Button from 'antd/es/button';
import { MailOutlined } from '@ant-design/icons';
import { History } from 'history';

// import { signInUser } from '../../database/connect';

interface SyntheticEvent<T> {
  currentTarget: EventTarget & T;
}

interface Props {
  history: History
}

const SignIn: React.FC<Props> = ({ history }) => {
  const dispatch = useDispatch();
  const [userCredentials, serCredentials] = useState({ email: '', password: '' });

  const handleSubmit = () => {
    const { email, password } = userCredentials;
    dispatch(emailSignInStart(email, password, history))
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
                suffix={<MailOutlined style={{ color: 'rgba(0, 0, 0, 0.45)' }} />}
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
              <Button className="button button-dev block" size="large" style={{ marginTop: 30 }} onClick={handleSubmit}>
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
