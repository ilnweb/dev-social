import React from 'react';
import './header.scss';
import { Typography, Row, Col, Avatar, Space, Dropdown, Menu } from 'antd';
import Button from 'antd/es/button';
import { Link } from 'react-router-dom';
import { IUser } from '../../interfaces/interfaces';

const { Title } = Typography;

interface Props{
  user: IUser,
  logoutHandler():void
}

const Header: React.FC<IUser> = ({ user }) => {
  const menu = (
    <Menu className="header-main-menu">
      <Menu.Item key="1">
        <Link to='/user-profile'>
          Your Profile
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to='/write-post'>
          Write a post
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <hr></hr>
        <Link to='/'>
         Sign Out
        </Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className='header-main'>
      <Row align='middle'>
        <Col span={6} flex={1}>
          <Link to='/'>
            <h1 className='logo'>DEV</h1>
          </Link>
        </Col>
        <Col span={12}>
          <Title level={3}>{user && `Hello ${user?.displayName}`}</Title>
        </Col>
        <Col span={6}>
          <Row justify='end' align='middle' >
            <Space>
              {user ?
                <Dropdown overlayClassName="header-main-dropdown" overlay={menu} placement="bottomCenter" trigger={['click']}>
                  <Avatar size="large" style={{ backgroundColor: '#e16162', fontSize: '1.4rem', fontWeight: 500 }} src={user ? user.photoURL : ''} >{user?.displayName?.split('')[0].toUpperCase()}</Avatar>
                </Dropdown>

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
            </Space>
          </Row>
        </Col>
      </Row>
    </div>
  )
};

export default Header;