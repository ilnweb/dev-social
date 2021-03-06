import React from 'react';
import './header.scss';
import { Row, Col, Avatar, Space, Dropdown, Menu } from 'antd';
import Button from 'antd/es/button';
import { Link } from 'react-router-dom';
import { IUserData } from '../../redux/user/user.types';

interface Props {
  user?: IUserData | null;
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
        <Link to='/my-posts'>
          My Posts
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/reading-list'>
          Reading List
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
         
        </Col>
        <Col span={6}>
          <Row justify='end' align='middle' >
            <Space>
              {user ?
                <Dropdown overlay={menu} trigger={['click']} overlayClassName="header-main-dropdown" placement="bottomCenter">
                  <Avatar size="large" style={{ backgroundColor: `${user?.photoURL ? '' : '#00eb66'}`, fontSize: '1.4rem', fontWeight: 500, cursor: "pointer" }} src={user ? user.photoURL : ''} >{user?.displayName?.split('')[0].toUpperCase()}</Avatar>
                </Dropdown>
                : (
                  <Space>
                    <Button className="button button-dev block" size="large">
                      <Link to='/sign-in'>Sign In</Link>
                    </Button>
                    <Button className="button button-dev block" size="large">
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