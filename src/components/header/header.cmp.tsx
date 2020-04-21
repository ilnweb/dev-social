import React from 'react';
import './header.scss';
import { Typography, Button, Row, Col, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.config';


const { Title } = Typography;

interface Props {
  user: {
    displayName?: string
    photoURL?: string
  }
}

const Header: React.FC<Props> = ({ user }) => (
  <div className='header-main'>
    <Row>
      <Col span={6}>
        <Avatar size="large" src={user.photoURL} />
      </Col>
      <Col span={12}>
        <Title level={3}>Hello, {user && user.displayName}</Title>
      </Col>
      <Col span={6}>
        <Button>
          <Link to='/sign-in'>Sign In</Link>
        </Button>
        <Button onClick={() => auth.signOut()}>
          Sign Out
      </Button>
      </Col>
    </Row>
  </div>
);

export default Header;