import React from 'react';
import './header.scss';
import { Typography, Row, Col, Avatar, Space } from 'antd';
import Button from 'antd/es/button';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.config';
import { IUser } from '../../interfaces/interfaces';

const { Title } = Typography;

const Header: React.FC<IUser> = ({ user }) => (
  <div className='header-main'>
    <Row align='middle'>
      <Col span={6} flex={1}>
        <Link to='/'>
          <h1 className='logo'>DEV</h1>
        </Link>
      </Col>
      <Col span={12}>
        <Title level={3}>Hey, {user && user.displayName}</Title>
      </Col>
      <Col span={6}>
        <Row justify='end' align='middle' >
          <Space>
            {user ?
              <Link to='/user-profile'>
                <Avatar size="large" style={{backgroundColor:'#e16162',fontSize:'1.4rem', fontWeight:500}} src={user ? user.photoURL : ''} >{user?.displayName?.split('')[0].toUpperCase()}</Avatar>
              </Link>
              : (
                <Space>
                  <Button>
                    <Link to='/sign-in'>Sign In</Link>
                  </Button>
                  <Button>
                    <Link to='/sign-up'>Sign Up</Link>
                  </Button>
                </Space>
              )}
            {user && <Button onClick={() => auth.signOut()}>
              Sign Out
          </Button>}
          </Space>
        </Row>
      </Col>
    </Row>
  </div>
);

export default Header;