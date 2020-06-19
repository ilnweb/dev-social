import React from 'react';
import './header.scss';
import { Typography, Row, Col, Avatar, Space, Dropdown, Menu } from 'antd';
import Button from 'antd/es/button';
import { Link } from 'react-router-dom';
import { currentUserInstance } from '../../mobX/user.context';

const { Title } = Typography;

interface Props {
  user?: currentUserInstance | null;
  signOutHandler: () => void;
}

const Header: React.FC<Props> = ({ user, signOutHandler }) => {
  const menu = (
    <Menu className="header-main-menu">
      <Menu.Item>
        <Link to='/user-profile'>
          Profile
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/write-post'>
          Write Post
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/user-profile'>
          Saved Posts
        </Link>
      </Menu.Item>
      <hr></hr>
      <Menu.Item>
        <Link to='/' onClick={signOutHandler}>
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
          <Title level={3}>{user && `Hello, ${user.displayName}`}</Title>
        </Col>
        <Col span={6}>
          <Row justify='end' align='middle' >
            <Space>
              {user ?
                <Dropdown overlay={menu} trigger={['click']} overlayClassName="header-main-dropdown" placement="bottomCenter">
                  <Avatar size="large" style={{ backgroundColor: '#00eb66', fontSize: '1.4rem', fontWeight: 500, cursor: "pointer" }} src={user ? user.photoURL : ''} >{user?.displayName?.split('')[0].toUpperCase()}</Avatar>
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