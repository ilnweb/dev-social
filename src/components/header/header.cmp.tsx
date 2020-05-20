import React from 'react';
import './header.scss';
import { Typography, Row, Col, Avatar, Space } from 'antd';
import Button from 'antd/es/button';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.config';

const { Title } = Typography;

interface Props {
  user: {
    displayName?: string
    photoURL?: string | undefined
  } | null
}

const Header: React.FC<Props> = ({ user }) => (
  <div className='header-main'>
    <Row justify='center'>
      <Col span={6}>
        
      </Col>
      <Col span={12}>
        <Title level={3}>Hello, {user && user.displayName}</Title>
      </Col>
      <Col span={6}>
        <Row justify='end' align='middle' >
          <Space>
            <Link to='/user-profile'>
              <Avatar size="large" src={user ? user.photoURL : 'N/a'} />
            </Link>
            {user ? '' : <Button>
              <Link to='/sign-in'>Sign In</Link>
            </Button>}
            <Button onClick={() => auth.signOut()}>
              Sign Out
          </Button>
          </Space>
        </Row>
      </Col>
    </Row>
  </div>
);

export default Header;